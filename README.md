# SecureCampus

Frontend educativo de ciberseguridad para INF-133 · Programación Web III, en el contexto de la UMSA. React + Vite, JavaScript/JSX, React Router y React Icons. Todo el contenido y las interacciones de la aplicación se renderizan con React; CSS define su apariencia.

## Ejecutar

Requiere Node.js 22.12 o superior (verificado con Node 24).

```bash
cd secure-campus
npm install
npm run dev
```

Abre la dirección que muestra Vite, normalmente `http://localhost:5173`. Si ya estás en `secure-campus`, omite el primer comando. Guarda cambios en los archivos para verlos al instante mediante la recarga de Vite.

```bash
npm run build    # Generar la versión de producción en dist/
npm run preview  # Revisar la versión compilada
npm test         # Verificar cálculos y validación del diagnóstico
```

## Estructura

```text
secure-campus/
├── public/                 Favicon y recursos estáticos
├── src/
│   ├── assets/             Imágenes y recursos visuales
│   ├── components/         Sidebar, Topbar, UI (Botones, Badges, PageHeading), Icon
│   ├── context/            Estado global (AssessmentContext) y tema (ThemeContext)
│   ├── data/               10 Controles de seguridad, categorías y escenarios
│   ├── hooks/              Persistencia reutilizable en localStorage
│   ├── pages/              Dashboard, Diagnosis, Risks, Recommendations, Guide, Customize, About, Welcome
│   ├── utils/              Algoritmo de ponderación y cálculo matemático de riesgos
│   ├── App.jsx             Layout principal, navegación y rutas
│   ├── App.css             Tokens de Tailwind CSS v4 (@theme, paleta Zinc, print)
│   └── main.jsx            Punto de entrada de React con BrowserRouter
├── tests/                  Pruebas unitarias del algoritmo de postura de seguridad
├── GUIA_EVALUACION.md       Hoja de ruta rápida y comandos para la exposición
├── index.html              Contenedor raíz HTML5
├── vite.config.js          Configuración de Vite con plugin de Tailwind CSS v4
└── package.json            Dependencias (React 19, Tailwind CSS v4, React Router 7)
```

## Recorrido de Vistas

- `/`: Panel de Auditoría y Postura de Seguridad ("The Pulse" score 0-100, KPIs ejecutivos, barra de severidad y accesos directos).
- `/diagnostico`: Auditoría interactiva de 10 controles defensivos divididos en 5 fases, con guardado automático.
- `/riesgos`: Matriz de Exposición Cuantitativa 3x3 y tabla detallada de hallazgos priorizados.
- `/recomendaciones`: Plan de Remediación con estimación de ROI de seguridad y checklist interactivo.
- `/guia`: Catálogo de buenas prácticas y controles técnicos de ciberseguridad con buscador.
- `/personalizar`: Simulador de Escenarios de Examen (Caso Crítico, Caso Demo y Caso Conforme) y generación de Acta de Auditoría en PDF.
- `/acerca`: Ficha técnica de cátedra, arquitectura y alcance del proyecto.
- `/inicio`: Portal de inducción y bienvenida institucional.

## Datos y Métricas de Seguridad

El primer inicio muestra un escenario didáctico representativo con 65% de madurez. Al completar la autoevaluación o aplicar un escenario en el simulador, se recalculan todas las métricas:
- **Puntuación por control**: 0 (No implementado), 1 (Parcialmente implementado) o 2 (Totalmente implementado).
- **Índice de Madurez**: Porcentaje de puntos obtenidos sobre los 20 puntos máximos.
- **Severidad de Riesgo**: Cruce matemático entre la probabilidad estimada (derivada del grado de adopción del control) y el impacto intrínseco del dominio (ponderación 2 o 3).

Toda la información se persiste en el almacenamiento local del navegador (`localStorage`) a través de `AssessmentContext`.

## Estilos y Diseño Profesional

- **Tailwind CSS v4**: Configurado con `@theme` en `src/App.css`, usando tokens semánticos modernos (`--color-primary`, `--color-secondary`, severidades y escala neutral `zinc`).
- **Modo Oscuro / Claro**: Sincronizado dinámicamente mediante la clase `.dark` en el elemento raíz HTML.
- **Impresión / Reporte Formal**: Estilos `@media print` optimizados para exportar un acta técnica limpia en PDF con un solo clic en **Acta PDF**.

## Instrucciones para la Defensa

Consulta [`GUIA_EVALUACION.md`](GUIA_EVALUACION.md) para ver la tabla de cambios rápidos en vivo (cambiar colores, anchos, alturas, rutas y controles) y las respuestas a preguntas teóricas frecuentes.

