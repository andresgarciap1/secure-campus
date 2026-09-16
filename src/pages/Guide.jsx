import { useState } from 'react';
import { resources } from '../data/security';
import { EmptyState, PageHeading } from '../components/UI';
import { FiSearch, FiClock, FiCheckCircle, FiChevronDown, FiShield, FiTag } from 'react-icons/fi';

// ============================================================================
// CATÁLOGO DE MEDIDAS DEFENSIVAS Y ESTÁNDARES TÉCNICOS
// ============================================================================
// --- 1. Filtro por dominios y búsqueda por código/texto ---
// --- 2. Especificación técnica en acordeón interactivo ---
// --- 3. Cuadrícula responsiva de directrices defensivas ---
// ============================================================================

export default function Guide() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [openCard, setOpenCard] = useState(null);

  // --- Filtros por dominio técnico (5 dominios oficiales) ---
  const categoriesFilter = [
    'Todas',
    'Identidad y Accesos',
    'Ingeniería Social',
    'Continuidad',
    'Operaciones',
    'Endpoints y Dispositivos',
  ];

  const items = resources.filter((item) => {
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchesSearch = `${item.title} ${item.category} ${item.content} ${item.code || ''} ${item.takeaway}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleCard = (id) => {
    setOpenCard((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. ENCABEZADO FORMAL DE CÁTEDRA */}
      <PageHeading
        eyebrow="ESTÁNDARES DE ARQUITECTURA DEFENSIVA · INF-133"
        title="Guía Defensiva y Controles Técnicos"
        description="Referencias prácticas, guías de configuración y políticas de mitigación de vulnerabilidades para la infraestructura universitaria."
      />

      {/* --- Barra de herramientas: Búsqueda y filtrado --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
        
        {/* Campo de búsqueda reactiva */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            aria-label="Buscar en el catálogo"
            placeholder="Buscar por código (ej. REF-AUTH), palabra clave o protocolo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* --- Botones de filtro de categorías --- */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categoriesFilter.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-secondary text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- Cuadrícula de directrices técnicas --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item) => {
          const isOpen = openCard === item.id;
          return (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all p-5"
            >
              <div>
                {/* Cabecera de la ficha técnica */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 border border-zinc-200 dark:border-zinc-700">
                      {item.code || 'REF-STD'}
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <FiTag size={12} /> {item.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <FiClock size={12} /> {item.time}
                  </span>
                </div>

                {/* Título y Resumen Ejecutivo */}
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
                  {item.title}
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                  {item.summary}
                </p>

                {/* Bloque desplegable de detalles técnicos */}
                <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
                  <button
                    onClick={() => toggleCard(item.id)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 cursor-pointer"
                  >
                    <span>{isOpen ? 'Ocultar especificación técnica' : 'Ver procedimiento y directrices'}</span>
                    <FiChevronDown
                      size={16}
                      className={`transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-3 space-y-3 text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-950/40 p-3.5 rounded-lg border border-zinc-200/70 dark:border-zinc-800">
                      <p className="leading-relaxed">{item.content}</p>
                      
                      {/* Conclusión clave / Directriz obligatoria */}
                      <div className="flex items-start gap-2.5 pt-2.5 border-t border-zinc-200/60 dark:border-zinc-800/80 text-emerald-700 dark:text-emerald-300 font-medium">
                        <FiCheckCircle className="shrink-0 mt-0.5" size={14} />
                        <span className="text-[11px]">{item.takeaway}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pie de ficha con referencia institucional */}
              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>Normativa UMSA · CSIRT-LAB</span>
                <span className="flex items-center gap-1">
                  <FiShield size={10} /> Control Defensivo
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* 4. ESTADO VACÍO EN BÚSQUEDA SIN COINCIDENCIAS */}
      {!items.length && (
        <EmptyState
          title="No se encontraron especificaciones para ese criterio"
          description="Prueba con términos como 'contraseñas', 'phishing', '3-2-1', 'incidentes' o un código como 'REF-AUTH'."
        />
      )}
    </div>
  );
}
