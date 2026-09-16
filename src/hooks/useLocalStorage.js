import { useEffect, useState } from 'react';

// Hook reutilizable: la app funciona aunque el navegador bloquee el almacenamiento.
// La validación evita que datos antiguos o dañados rompan los componentes.
export function useLocalStorage(key, initialValue, validate = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      const parsed = saved ? JSON.parse(saved) : initialValue;
      return validate(parsed) ? parsed : initialValue;
    } catch { return initialValue; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Modo sin persistencia. */ }
  }, [key, value]);
  return [value, setValue];
}
