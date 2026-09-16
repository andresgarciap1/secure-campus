// ============================================================================
// DATA: security.js — CATÁLOGO DE CONTROLES DEFENSIVOS Y DOMINIOS
// ============================================================================
// --- 1. Categorías y Dominios Técnicos (Accesos, Respaldos, Dispositivos...) ---
// --- 2. Controles de Seguridad Específicos (CTL-ACC-01...) ---
// --- 3. Perfiles de Postura de Referencia ---
// ============================================================================

export const categories = [
  {
    id: 'access',
    code: 'DOM-01',
    name: 'Gestión de Accesos e Identidad',
    short: 'Accesos',
    icon: 'key',
    impact: 3, // Ponderación de impacto didáctico (1 a 3)
    risk: 'Compromiso de Credenciales y Acceso no Autorizado',
    action: 'Imponer Políticas de Acceso Robusto y Segundo Factor (MFA)',
    effort: 'Bajo',
    description: 'Control de autenticación y autorización en plataformas académicas y servidores de la facultad.',
    steps: [
      'Inventariar cuentas de usuario y niveles de privilegio en el sistema.',
      'Habilitar Autenticación Multifactor (MFA/TOTP) en todas las cuentas de administración.',
      'Revocar sesiones inactivas e implementar políticas de contraseñas de alta entropía.',
    ],
  },
  {
    id: 'backups',
    code: 'DOM-02',
    name: 'Continuidad Operativa y Respaldos',
    short: 'Respaldos',
    icon: 'database',
    impact: 3,
    risk: 'Pérdida Irreversible de Registros Académicos',
    action: 'Auditar Esquema de Copias de Seguridad 3-2-1 y Pruebas de Restauración',
    effort: 'Medio',
    description: 'Preservación de bases de datos de calificaciones, código de proyectos y repositorios locales.',
    steps: [
      'Definir RPO y RTO para bases de datos críticas de la unidad académica.',
      'Almacenar al menos una copia de seguridad fuera del perímetro del servidor de producción.',
      'Ejecutar simulacros semestrales de restauración completa y documentar tiempos de recuperación.',
    ],
  },
  {
    id: 'devices',
    code: 'DOM-03',
    name: 'Gestión de Endpoints y Parcheo',
    short: 'Endpoints',
    icon: 'monitor',
    impact: 2,
    risk: 'Explotación de Vulnerabilidades en Software Desactualizado',
    action: 'Aplicar Gestión de Parches y Hardening en Equipos de Laboratorio',
    effort: 'Medio',
    description: 'Mantenimiento del ciclo de vida y políticas de seguridad en estaciones de trabajo y servidores.',
    steps: [
      'Mantener un inventario estricto de paquetes instalados y versiones de SO.',
      'Programar ventanas de actualización periódica desde repositorios seguros verificados.',
      'Deshabilitar servicios y puertos de red que no sean estrictamente requeridos para las prácticas.',
    ],
  },
  {
    id: 'awareness',
    code: 'DOM-04',
    name: 'Concientización y Factor Humano',
    short: 'Cultura',
    icon: 'users',
    impact: 3,
    risk: 'Compromiso por Ingeniería Social y Phishing Institucional',
    action: 'Impartir Talleres Técnicos y Protocolo de Reporte de Phishing',
    effort: 'Bajo',
    description: 'Capacitación en detección de vectores de engaño dirigidos a docentes, auxiliares y estudiantes.',
    steps: [
      'Difundir análisis de casos reales de spear-phishing en el ámbito universitario.',
      'Verificar solicitudes de credenciales o transferencias por canales fuera de banda.',
      'Establecer un buzón formal y público de reporte rápido de correos o mensajes sospechosos.',
    ],
  },
  {
    id: 'response',
    code: 'DOM-05',
    name: 'Respuesta y Gestión de Incidentes',
    short: 'Incidentes',
    icon: 'shield',
    impact: 2,
    risk: 'Retraso en Contención y Escalada de Brechas de Seguridad',
    action: 'Formalizar el Protocolo de Clasificación y Contención de Incidentes',
    effort: 'Medio',
    description: 'Ruta de notificación, asignación de responsabilidades y preservación de evidencia digital.',
    steps: [
      'Designar al equipo de respuesta a incidentes y publicar la matriz de escalamiento.',
      'Documentar los pasos de aislamiento de red ante detección de malware o tráfico anómalo.',
      'Realizar simulacros técnicos de brecha de seguridad con registro de bitácora post-mortem.',
    ],
  },
];

export const questions = [
  {
    id: 'access-1',
    category: 'access',
    code: 'CTL-ACC-01',
    text: '¿Se implementan contraseñas únicas y robustas en los servicios institucionales?',
    hint: 'Verifica longitud mínima, salting/hashing con bcrypt/argon2 y no reutilización en plataformas.',
  },
  {
    id: 'access-2',
    category: 'access',
    code: 'CTL-ACC-02',
    text: '¿Se encuentra activo el Segundo Factor de Autenticación (MFA)?',
    hint: 'Exigencia de clave temporal (TOTP / app autenticadora) además de la credencial tradicional.',
  },
  {
    id: 'backups-1',
    category: 'backups',
    code: 'CTL-BCK-01',
    text: '¿Se ejecutan respaldos automatizados y periódicos de las bases de datos y código?',
    hint: 'Frecuencia adecuada al volumen de cambios (ej. diario incremental, semanal completo).',
  },
  {
    id: 'backups-2',
    category: 'backups',
    code: 'CTL-BCK-02',
    text: '¿Se han validado formalmente los procedimientos de restauración de copias de seguridad?',
    hint: 'La existencia de un archivo de backup no garantiza su integridad hasta que se ensaya la recuperación.',
  },
  {
    id: 'devices-1',
    category: 'devices',
    code: 'CTL-DEV-01',
    text: '¿Se aplican parches de seguridad y actualizaciones de sistema en tiempo y forma?',
    hint: 'Mitigación de CVEs conocidos en servidores, dependencias npm/composer y sistemas operativos.',
  },
  {
    id: 'devices-2',
    category: 'devices',
    code: 'CTL-DEV-02',
    text: '¿Se audita la configuración de seguridad y servicios activos en los equipos?',
    hint: 'Revisión de puertos abiertos, bloqueo de pantalla, reglas de firewall y mínimos privilegios.',
  },
  {
    id: 'awareness-1',
    category: 'awareness',
    code: 'CTL-HUM-01',
    text: '¿La comunidad académica recibe inducción sobre amenazas de phishing e ingeniería social?',
    hint: 'Sesiones de laboratorio, guías técnicas o boletines de seguridad preventiva.',
  },
  {
    id: 'awareness-2',
    category: 'awareness',
    code: 'CTL-HUM-02',
    text: '¿Existe un canal unívoco y conocido para reportar incidentes o mensajes maliciosos?',
    hint: 'Buzón de seguridad o contacto formal de soporte técnico de la carrera.',
  },
  {
    id: 'response-1',
    category: 'response',
    code: 'CTL-INC-01',
    text: '¿Se cuenta con un responsable o comité designado para la coordinación de incidentes?',
    hint: 'Contacto definido para liderar la contención y mitigación de eventos de seguridad.',
  },
  {
    id: 'response-2',
    category: 'response',
    code: 'CTL-INC-02',
    text: '¿Están documentados y disponibles los procedimientos básicos de respuesta y contención?',
    hint: 'Guía rápida de aislamiento de red, preservación de logs y notificación de afectación.',
  },
];

export const answerOptions = [
  { value: 0, label: 'No Implementado (0 pts)', description: 'El control no existe o carece de aplicación práctica.' },
  { value: 1, label: 'Parcialmente (1 pt)', description: 'Existe procedimiento básico pero falta verificación formal.' },
  { value: 2, label: 'Implementado (2 pts)', description: 'El control está activo, documentado y verificado.' },
];

// --- Perfil de auditoría base (65% de madurez global) ---
export const demoAnswers = Object.fromEntries(
  questions.map((question, index) => [question.id, [2, 1, 2, 1, 2, 1, 0, 1, 2, 1][index]])
);

// --- Perfiles preconfigurados de postura de seguridad ---
export const defenseScenarios = {
  critical: {
    name: 'Perfil Crítico (20% Madurez - Brechas Activas)',
    unit: 'Unidad Vulnerable · Simulación',
    answers: Object.fromEntries(
      questions.map((q, i) => [q.id, [1, 0, 1, 0, 0, 1, 0, 0, 1, 0][i]])
    ),
  },
  intermediate: {
    name: 'Perfil Línea Base (65% Madurez - Escenario Estándar)',
    unit: 'Laboratorio de Informática · Simulación',
    answers: demoAnswers,
  },
  compliant: {
    name: 'Perfil Conforme (100% Madurez - Controles Blindados)',
    unit: 'Infraestructura Blindada · Simulación',
    answers: Object.fromEntries(questions.map((q) => [q.id, 2])),
  },
};

export const resources = [
  {
    id: 'passwords',
    code: 'REF-AUTH',
    category: 'Identidad y Accesos',
    title: 'Políticas de Contraseñas y Autenticación Fuerte',
    icon: 'key',
    time: '3 min',
    summary: 'Directrices técnicas de entropía, hashing y protección multifactor.',
    content:
      'Imponer longitud mínima de 12 caracteres con mezcla alfanumérica. Emplear funciones de derivación de claves seguras (bcrypt/argon2). El correo institucional debe contar obligatoriamente con MFA (TOTP) al ser el vector primario de recuperación.',
    takeaway: 'La protección de cuentas de privilegios elevados es el control perimetral más crítico.',
  },
  {
    id: 'phishing',
    code: 'REF-SOCIAL',
    category: 'Ingeniería Social',
    title: 'Mitigación de Vectores de Phishing y Spoofing',
    icon: 'mail',
    time: '3 min',
    summary: 'Identificación de indicadores de compromiso en correos institucionales.',
    content:
      'Validar siempre el encabezado From/Reply-To y registros SPF/DKIM/DMARC. Toda solicitud que invoque urgencia o pida credenciales debe someterse a verificación por canal secundario antes de cualquier acción.',
    takeaway: 'Ningún software reemplaza el criterio crítico del usuario ante solicitudes no solicitadas.',
  },
  {
    id: 'backup',
    code: 'REF-BCK',
    category: 'Continuidad',
    title: 'Estrategia de Respaldos y Restauración 3-2-1',
    icon: 'database',
    time: '4 min',
    summary: 'Aseguramiento de la persistencia y recuperación ante ransomware o desastres.',
    content:
      'Conservar al menos 3 copias de los datos, en 2 soportes distintos, con 1 copia fuera de sitio (offsite o nube aislada). Probar la restauración trimestralmente para garantizar la integridad de los dump de base de datos.',
    takeaway: 'Un respaldo no comprobado equivale a no tener respaldo.',
  },
  {
    id: 'incident',
    code: 'REF-INC',
    category: 'Operaciones',
    title: 'Protocolo de Primeros Auxilios ante Incidentes',
    icon: 'shield',
    time: '3 min',
    summary: 'Pasos iniciales de contención, aislamiento y documentación forense.',
    content:
      'Ante sospecha de intrusión, desconectar el equipo de la red pero no apagarlo (para no perder memoria RAM). Registrar fecha, hora y comportamiento anómalo. Notificar al responsable técnico inmediatamente.',
    takeaway: 'La contención inmediata evita el movimiento lateral del atacante.',
  },
  {
    id: 'devices',
    code: 'REF-DEV',
    category: 'Endpoints y Dispositivos',
    title: 'Hardening de Equipos de Laboratorio y Parches',
    icon: 'monitor',
    time: '3 min',
    summary: 'Aseguramiento de estaciones de trabajo, bloqueo por inactividad y actualizaciones.',
    content:
      'Configurar bloqueo automático tras 5 minutos de inactividad. Mantener SO y software con parches de seguridad al día. Desactivar puertos USB desatendidos y exigir cifrado en discos locales de equipos portátiles.',
    takeaway: 'Un equipo de laboratorio desactualizado es la puerta de entrada más accesible a la red interna.',
  },
];
