# Guía de Defensa y Modificación en Vivo (Examen INF-133 · UMSA)

Este documento es tu **hoja de ruta rápida** para defender el proyecto ante el docente (Lic. Jhonny Roberto Felipez Andrade) o el auxiliar de la materia. Todos los archivos tienen comentarios explícitos marcados con `/* === EXAMEN === */` o `// EXAMEN:` para que encuentres cualquier cambio en menos de 5 segundos.

---

## 1. Arquitectura y Estructura (Modelo del Auxiliar)

La estructura sigue exactamente el patrón de diseño y convenciones del auxiliar de la materia:

```text
secure-campus/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        # Barra lateral izquierda (w-64, institucional, navegación)
│   │   ├── Topbar.jsx         # Encabezado superior (h-16, breadcrumb, Acta PDF, tema)
│   │   ├── UI.jsx             # Botones, Badges semánticos, PageHeading, ProgressBar
│   │   └── Icon.jsx           # Mapeo unificado de iconos react-icons
│   ├── pages/
│   │   ├── Dashboard.jsx      # Panel de Control y Madurez ("The Pulse" score, KPIs, severidad)
│   │   ├── Diagnosis.jsx      # Auditoría paso a paso de 10 controles defensivos
│   │   ├── Risks.jsx          # Matriz de Exposición Cuantitativa 3x3 y tabla de hallazgos
│   │   ├── Recommendations.jsx# Plan de Remediación con ROI y checklist interactivo
│   │   ├── Guide.jsx          # Catálogo de medidas defensivas y estándares técnicos
│   │   ├── Customize.jsx      # Simulador de Escenarios de Examen (1-click test cases)
│   │   ├── About.jsx          # Ficha técnica de cátedra, membrete y arquitectura
│   │   └── Welcome.jsx        # Portal de inducción institucional UMSA
│   ├── context/
│   │   ├── AssessmentContext.jsx # Estado global de la auditoría y localStorage
│   │   └── ThemeContext.jsx      # Estado de modo claro / oscuro
│   ├── data/
│   │   └── security.js        # 10 controles, 5 categorías, códigos y escenarios de examen
│   ├── utils/
│   │   └── assessment.js      # Algoritmo de ponderación y cálculo matemático
│   ├── App.jsx                # Layout flexbox (Sidebar + Topbar + main Routes)
│   ├── App.css                # Tokens Tailwind CSS v4 (@theme, colores, impresión)
│   └── main.jsx               # Punto de montaje React 18 + BrowserRouter + Providers
└── tests/
    └── assessment.test.js     # Tests unitarios con Node.js Test Runner (100% verdes)
```

---

## 2. Dónde hacer los cambios típicos solicitados en el examen

| Lo que te pida el docente o auxiliar | Archivo a abrir | Línea / Qué buscar | Cómo modificarlo |
| :--- | :--- | :--- | :--- |
| **"Cambia el color primario institucional"** | `src/App.css` | Línea 14 (`--color-primary`) | Cambiar `#181824` por `#0f172a` o `#1e1b4b`. |
| **"Cambia el color secundario / activo"** | `src/App.css` | Línea 17 (`--color-secondary`) | Cambiar `#10b981` (esmeralda actual) por `#38ce3c` (auxiliar) o `#2563eb` (azul). |
| **"Cambia el ancho del Sidebar"** | `src/components/Sidebar.jsx` | Línea 28 (`<aside ...>`) | Cambiar `w-64` por `w-72` (más ancho) o `w-60` (más compacto). |
| **"Cambia la altura del Topbar"** | `src/components/Topbar.jsx` | Línea 38 (`<header ...>`) | Cambiar `h-16` por `h-20` (más alto) o `h-14` (más bajo). |
| **"Cambia el padding o fondo del contenido principal"** | `src/App.jsx` | Línea 27 (`<main ...>`) | Cambiar `p-6 sm:p-8` por `p-4` o `p-10`. |
| **"Agrega una nueva ruta o página"** | `src/App.jsx` | Línea 37 (`<Routes>`) | Añadir `<Route path="/auditor" element={<AuditorPage />} />`. |
| **"Agrega un enlace al menú lateral"** | `src/components/Sidebar.jsx` | Línea 72 (`<nav ...>`) | Copiar un bloque `<NavLink to="/auditor" className={navLinkClass}>...`. |
| **"Cambia el estilo o tamaño de todos los botones"** | `src/components/UI.jsx` | Línea 20 (`variantClasses`) | Modificar `px-3.5 py-2` o los colores de `primary` / `secondary`. |
| **"Cambia los colores de los Badges de riesgo"** | `src/components/UI.jsx` | Línea 50 (`badgeTones`) | Cambiar `Alto` (`bg-rose-500/10`), `Medio` (`bg-amber-500/10`), etc. |
| **"Modifica las columnas de métricas del Dashboard"** | `src/pages/Dashboard.jsx` | Línea 76 (`grid-cols-...`) | Cambiar `grid-cols-2 md:grid-cols-4` por `grid-cols-1 sm:grid-cols-2`. |
| **"Cambia una pregunta o control de seguridad"** | `src/data/security.js` | Línea 98 (`questions`) | Editar el texto, código (`CTL-ACC-01`) o pista técnica. |
| **"Añade un escenario de prueba adicional"** | `src/data/security.js` | Línea 183 (`defenseScenarios`)| Añadir una nueva clave con nombre, unidad y vector de 10 respuestas. |

---

## 3. Demostración en vivo durante la defensa (Estrategia 10/10)

Cuando el docente o auxiliar te pida: *"Muéstrame cómo reacciona el sistema ante diferentes estados de seguridad"*:

1. Abre el navegador en `http://localhost:5173`.
2. Dirígete a la sección **Simulador de Escenarios** (`/personalizar`).
3. Haz clic en los botones de simulación instantánea:
   - **Caso Crítico (20% Madurez)**:
     - El score baja automáticamente a **20 / 100** (badge rojo de *Riesgo Crítico*).
     - La barra de severidad se llena de rojo y naranja.
     - La Matriz de Exposición ubica los 5 dominios en el cuadrante de riesgo alto.
     - El Plan de Remediación genera 5 acciones prioritarias urgentes.
   - **Caso Base de Demostración (65% Madurez)**:
     - Estado representativo con 4 controles implementados, 5 parciales y 1 no implementado.
     - Coincide 100% con los tests unitarios automatizados.
   - **Caso Conforme (100% Blindado)**:
     - Madurez al 100% con badge verde de *Conformidad Completa*.
     - 0 hallazgos críticos pendientes y felicitación de cumplimiento.
4. **Generación de Acta**:
   - Haz clic en el botón **Acta PDF** del Topbar (o en el Simulador).
   - El sistema activa `window.print()` con estilos CSS `@media print` que ocultan automáticamente el Sidebar y el Topbar, generando un documento técnico listo para archivar o imprimir.

---

## 4. Cómo responder preguntas teóricas del examen

### ¿Por qué se utilizó Tailwind CSS v4 y cómo se configuran las variables?
> *"Utilizamos Tailwind CSS v4 con la nueva directiva `@theme` en `src/App.css`. A diferencia de v3, ya no se requiere un archivo `tailwind.config.js` pesado; todas las variables institucionales (`--color-primary`, `--color-secondary`, severidades) son CSS tokens nativos que el compilador de Vite procesa en tiempo real con zero-runtime."*

### ¿Cómo se comunican los componentes sin backend?
> *"Mediante la Context API de React con dos providers en `main.jsx`: `AssessmentContext` (que encapsula el borrador, el diagnóstico consolidado y el cálculo de matrices) y `ThemeContext` (para el soporte de modo claro/oscuro). Toda la persistencia se gestiona del lado cliente con `localStorage` a través del hook personalizado `useLocalStorage`."*

### ¿Cómo se calculan el índice de madurez y la matriz de riesgos?
> *"En `src/utils/assessment.js`, cada una de las 10 preguntas admite valores `0` (no implementado), `1` (parcial) o `2` (implementado). El índice de madurez es el porcentaje de puntos obtenidos sobre el total posible (20 puntos). La matriz de riesgos 3x3 cruza la probabilidad (derivada de la falta de implementación) con el impacto intrínseco de cada dominio (pesos 3 o 2), ubicando matemáticamente los hallazgos en severidad Crítica, Alta, Media o Baja."*

### ¿Cómo garantizas la calidad del código?
> *"El proyecto cuenta con una suite de pruebas automatizadas utilizando el test runner nativo de Node.js (`node --test tests/*.test.js`). No depende de librerías externas pesadas como Jest; corre en menos de 150 ms y valida la integridad de todas las fórmulas matemáticas y casos límite."*

---

## 5. Comandos de Terminal para el Examen

```bash
# Iniciar el servidor de desarrollo en la red local
npm run dev

# Ejecutar las pruebas unitarias automatizadas (5 tests pasan al 100%)
npm test

# Compilar la aplicación para producción (genera dist/ sin errores)
npm run build
```
