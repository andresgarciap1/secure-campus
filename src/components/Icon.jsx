import { FiShield, FiKey, FiDatabase, FiMonitor, FiUsers, FiMail, FiGrid, FiClipboard,
  FiAlertTriangle, FiCheckCircle, FiBookOpen, FiSettings, FiArrowRight, FiArrowLeft,
  FiPlus, FiDownload, FiSearch, FiX, FiMenu, FiSun, FiMoon, FiCheck, FiInfo,
  FiChevronRight, FiActivity, FiClock, FiRefreshCw, FiHome } from 'react-icons/fi';

// Catálogo de iconos React. Para añadir otro: importar arriba y registrarlo aquí.
const icons = { shield: FiShield, key: FiKey, database: FiDatabase, monitor: FiMonitor,
  users: FiUsers, mail: FiMail, grid: FiGrid, clipboard: FiClipboard, alert: FiAlertTriangle,
  checkCircle: FiCheckCircle, book: FiBookOpen, settings: FiSettings, arrow: FiArrowRight,
  back: FiArrowLeft, plus: FiPlus, download: FiDownload, search: FiSearch, close: FiX,
  menu: FiMenu, sun: FiSun, moon: FiMoon, check: FiCheck, info: FiInfo,
  chevron: FiChevronRight, activity: FiActivity, clock: FiClock, reset: FiRefreshCw, home: FiHome };
export default function Icon({ name, size = 20, ...props }) {
  const Component = icons[name] || FiShield;
  return <Component size={size} aria-hidden="true" {...props} />;
}
