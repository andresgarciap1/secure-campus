import { Link } from 'react-router-dom';
import Icon from './Icon';

// ============================================================================
// COMPONENTES UI REUTILIZABLES (Tailwind CSS v4)
// ============================================================================
// --- 1. Botones y Variantes: Primary, Secondary, Ghost, Danger ---
// --- 2. Badges Semánticos: Alto, Medio, Bajo, Neutral ---
// --- 3. Encabezados de Página (PageHeading) y Barras de Progreso ---
// ============================================================================

export function Button({
  children,
  to,
  icon,
  variant = 'primary',
  className = '',
  ...props
}) {
  // --- Variantes de estilo de botones con Tailwind CSS ---
  const variantClasses = {
    primary:
      'bg-secondary hover:bg-emerald-600 text-white shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-500',
    secondary:
      'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/70',
    ghost:
      'bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus-visible:ring-2 focus-visible:ring-rose-500',
  }[variant] || 'bg-secondary text-white';

  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  const content = (
    <>
      {icon && <Icon name={icon} size={15} />}
      <span>{children}</span>
    </>
  );

  return to ? (
    <Link to={to} className={combinedClasses} {...props}>
      {content}
    </Link>
  ) : (
    <button type="button" className={combinedClasses} {...props}>
      {content}
    </button>
  );
}

export function Badge({ level, children }) {
  // --- Paleta semántica para badges de severidad y estado ---
  const badgeTones = {
    Alto: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    danger: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    Medio: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Bajo: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    neutral: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20',
  };

  const toneClass = badgeTones[level] || badgeTones.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${toneClass}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      <span>{children || level}</span>
    </span>
  );
}

export function PageHeading({ eyebrow, title, description, children }) {
  return (
    // --- Encabezado estándar para vistas de la aplicación ---
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
      <div>
        {eyebrow && (
          <div className="text-[10px] font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
            {eyebrow}
          </div>
        )}
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-3xl">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  );
}

export function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
        <Icon name="search" size={20} />
      </div>
      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
        {title}
      </h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
        {description}
      </p>
    </div>
  );
}

export function ProgressBar({ value, label, tone = '' }) {
  return (
    <div
      className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-all duration-300 ${
          tone === 'progress-warning' ? 'bg-amber-500' : 'bg-emerald-500'
        }`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
