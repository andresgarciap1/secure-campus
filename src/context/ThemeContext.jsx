import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext(null);
const defaults = { primary: '', radius: '', dark: false };
const validTheme = (value) => value && typeof value.dark === 'boolean'
  && (value.primary === '' || /^#[0-9a-f]{6}$/i.test(value.primary))
  && (value.radius === '' || (Number.isInteger(value.radius) && value.radius >= 0 && value.radius <= 24));

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('securecampus-theme-v1', defaults, validTheme);

  // Sincroniza la clase .dark en el elemento raíz <html> para que Tailwind CSS v4 responda
  useEffect(() => {
    document.documentElement.classList.toggle('dark', Boolean(theme.dark));
  }, [theme.dark]);

  const style = {};
  if (theme.primary) style['--color-primary'] = theme.primary;
  if (theme.radius !== '') style['--button-radius'] = `${theme.radius}px`;
  const updateTheme = (patch) => setTheme((previous) => ({ ...previous, ...patch }));

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme: () => setTheme(defaults) }}>
      <div className={`theme-root ${theme.dark ? 'dark' : ''}`} data-theme={theme.dark ? 'dark' : 'light'} style={style}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
