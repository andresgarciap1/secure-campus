import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Button } from './components/UI';
import './App.css';

// ============================================================================
// COMPONENTE PRINCIPAL: App.jsx (Estructura de Layout y Rutas)
// ============================================================================
// --- Layout: Sidebar institucional fijo (w-64) + Topbar + Área de contenido ---
// --- Rutas: React Router para navegación de auditoría ---
// ============================================================================

// Páginas de la aplicación
import Dashboard from './pages/Dashboard';
import Diagnosis from './pages/Diagnosis';
import Risks from './pages/Risks';
import Recommendations from './pages/Recommendations';
import Guide from './pages/Guide';
import Customize from './pages/Customize';
import About from './pages/About';
import Welcome from './pages/Welcome';

function App() {
  return (
    // --- Layout general en Flexbox ---
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      
      {/* 1. Barra Lateral (Sidebar) */}
      <Sidebar />

      {/* 2. Área Central con Topbar y Contenido Principal */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />

        {/* --- Contenedor de páginas con scroll vertical independiente --- */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* --- Rutas principales de la aplicación --- */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inicio" element={<Welcome />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/diagnostico" element={<Diagnosis />} />
            <Route path="/riesgos" element={<Risks />} />
            <Route path="/recomendaciones" element={<Recommendations />} />
            <Route path="/guia" element={<Guide />} />
            <Route path="/personalizar" element={<Customize />} />
            <Route path="/acerca" element={<About />} />
            <Route
              path="*"
              element={
                <section className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    Esta página no existe
                  </h1>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                    Vuelve a la vista de auditoría para continuar.
                  </p>
                  <Button to="/">Ir al Tablero de Control</Button>
                </section>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
