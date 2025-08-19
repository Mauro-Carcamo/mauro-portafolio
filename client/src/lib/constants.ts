export const PERSONAL_INFO = {
  name: "Mauricio Cárcamo",
  title: "Data Scientist & Full Stack Developer",
  shortBio: "Sociólogo especializado en Ciencia de Datos y Desarrollo. Combino formación académica sólida con habilidades técnicas en análisis de datos, machine learning y programación.",
  address: "Pasaje Juan Moya Morales 668C, Ñuñoa, Santiago.",
  birthDate: "5 de octubre de 1989.",
  nationality: "Chileno",
  phone: "+56990381919",
  email: "mauro.carcamo89@gmail.com",
  website: "mauro-carcamo.io",
};

export const ABOUT_ME = {
  paragraph1: "Soy un Sociólogo con experiencia profesional, especializado en Ciencia de Datos. Combino formación académica sólida con habilidades técnicas en análisis de datos, machine learning y programación (R, Python, SQL).",
  paragraph2: "Tengo experiencia demostrada en gestión de proyectos sociales, coordinación de equipos y análisis de datos para la toma de decisiones. He liderado iniciativas de formación y capacitación, implementado soluciones de automatización y desarrollado dashboards para optimización de procesos en diversos sectores.",
  paragraph3: "Destaco por mi capacidad para traducir datos en insights accionables y por implementar mejoras operativas que impactan positivamente en los resultados organizacionales.",
};

export const SKILLS = {
  programmingLanguages: [
    { name: "R", level: 90 },
    { name: "Python", level: 85 },
    { name: "SQL", level: 80 },
    { name: "HTML/CSS", level: 75 },
  ],
  softwareTools: [
    { name: "RStudio", level: 95 },
    { name: "Visual Studio Code", level: 85 },
    { name: "GitHub", level: 80 },
    { name: "Google Looker Studio", level: 85 },
  ],
  dataScience: [
    { name: "Análisis Estadístico", level: 90 },
    { name: "Machine Learning", level: 80 },
    { name: "Visualización de Datos", level: 90 },
    { name: "Web Scraping", level: 85 },
  ],
  professionalSkills: [
    { name: "Gestión de Equipos", level: 90 },
    { name: "Gestión de Proyectos", level: 85 },
    { name: "Capacitación", level: 95 },
    { name: "Automatización", level: 80 },
  ],
};

export const PROJECTS = [
  {
    title: "Kittypaw!",
    description: "Aplicación móvil para adopción de mascotas con sistema de matching inteligente y chat en tiempo real.",
    technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
    repoUrl: "https://github.com/Mauro-Carcamo/kittypaw",
    icon: "target",
    slug: "kittypaw"
  },
  {
    title: "Predicción de Mortalidad en Chile",
    description: "Análisis y predicción de patrones de mortalidad en Chile utilizando técnicas de machine learning.",
    technologies: ["Python", "Machine Learning", "Data Analysis"],
    repoUrl: "https://github.com/Mauro-Carcamo/Prediccion-Moratalidad-en-Chile",
    icon: "chart-line",
    slug: "prediccion-mortalidad"
  },
  {
    title: "Textos Religiosos y Machine Learning",
    description: "Análisis de textos religiosos utilizando técnicas de procesamiento de lenguaje natural y aprendizaje automático.",
    technologies: ["NLP", "Machine Learning", "Text Analysis"],
    repoUrl: "https://github.com/Mauro-Carcamo/Textos-Religiosos-y-Machine-Learning",
    icon: "book",
    slug: "textos-religiosos-ml"
  },
  {
    title: "Del 60 al 2020: Web Scraping Letras de Canciones",
    description: "Extracción y análisis de letras de canciones desde los años 60 hasta 2020 utilizando técnicas de web scraping.",
    technologies: ["Web Scraping", "Python", "Text Analysis"],
    repoUrl: "https://github.com/Mauro-Carcamo/Del-60-al-2020-Web-Scraping-Letras-Canciones",
    icon: "music",
    slug: "web-scraping-canciones"
  },
];

export const EXPERIENCE = [
  {
    company: "Consultora Epojé",
    position: "Coordinador de proyecto",
    period: "Sep 2024 - Dic 2024",
    description: "Adjudicación proyecto Escuela de formación Sindical, Departamento Diálogo Social, Ministerio del Trabajo. Responsable de la planificación, ejecución y evaluación del proyecto, incluyendo el diseño de módulos de formación para sindicatos, gestión de equipos y participantes, desarrollo de herramientas evaluativas, seguimiento de indicadores clave como asistencia y resultados de aprendizaje. Automatización de correos y mensajes de WhatsApp con el contenido y planificación para asegurar la participación activa de los asistentes.",
  },
  {
    company: "Agencia I-Brain Digital",
    position: "Community Manager",
    period: "Abr 2024 - Ago 2024",
    description: "Responsable de la creación de contenido y la gestión de diseño para publicaciones en redes sociales, trabajando con empresas de los sectores editorial, imprenta, médico y de venta de vehículos. Realicé análisis de datos mediante Meta Business Suite para optimizar el desempeño de campañas y estrategias digitales, mejorando la presencia y el alcance de las marcas en plataformas digitales.",
  },
  {
    company: "Nadar Ediciones",
    position: "Asesoría en Datos",
    period: "Sep 2023 - Dic 2023",
    description: "Recolección y organización de datos para el análisis de ventas y costos. Implementé la vinculación de datos provenientes de redes sociales con métricas de ventas, lo que permitió identificar tendencias y optimizar estrategias comerciales para publicaciones nuevas del año 2024. Creación de dashboard en Google Looker Studios.",
  },
  {
    company: "Universidad de Valparaíso",
    position: "Analista de Datos",
    period: "Dic 2022",
    description: "Desarrollo de investigación sobre factores que inciden en el desempeño académico de los estudiantes de la carrera de Auditoría (2017-2021). Responsable de la limpieza y estructura de datos socioeconómicos y evaluaciones académicas de estudiantes, análisis descriptivo y aplicación de modelos de machine learning no supervisados para creación de clustering, visualización y presentación de resultados para discusión.",
  },
  {
    company: "Conectados S.A.",
    position: "Diversos Roles",
    period: "Abr 2018 - Ago 2022",
    description: "Contact Center dedicado a la venta de servicios.",
    roles: [
      "Análisis de Datos y Coaching de Ventas (2022): Diseñé dashboards en Google Data Studio para monitorear métricas clave como ventas, dotación y rendimiento de campañas.",
      "Coordinación de Capacitación en Campaña WOM (2020-2022): Diseñé e implementé mallas teórico-prácticas para capacitar a equipos de ventas nacionales y en Latam.",
      "Analista de Capacitación en Campaña WOM (2020): Evalué el desempeño del personal y diseñé estrategias de capacitación personalizadas.",
      "Supervisor de la Campaña Virgin Mobile (2019): Supervisé operaciones diarias del equipo, asegurando metas de ventas y atención al cliente."
    ]
  }
];

export const EDUCATION = {
  formal: [
    {
      degree: "Diplomado en Inteligencia Artificial",
      institution: "Universidad Autónoma (en curso)",
      year: "2025",
      certificate: null
    },
    {
      degree: "Bootcamp de Especialización en Ciencia de Datos",
      institution: "Beca Corfo Talento Digital",
      year: "2024",
      certificate: "@assets/Legal Ciencia de Datos_1753415856033.pdf"
    },
    {
      degree: "Bootcamp de Desarrollo Full Stack Python",
      institution: "Beca Corfo Talento Digital", 
      year: "2023",
      certificate: "@assets/DescargarCertificado_1753415856032.pdf"
    },
    {
      degree: "Diplomado en Data Science",
      institution: "Universidad Católica de Chile",
      year: "2022",
      certificate: "@assets/Certificado Diplomado_1753415856029.pdf"
    },
    {
      degree: "Título de Sociólogo",
      institution: "Facultad de Ciencias Sociales, Universidad Central de Chile",
      year: "2015",
      certificate: "@assets/Certificado Profesion_1753415856031.pdf"
    }
  ],
  courses: [
    {
      name: "Introducción a la Minería de Datos",
      institution: "Pontificia Universidad Católica de Chile",
      year: "2024",
      certificate: "@assets/Coursera HNZW5WGNP9LR_1753415856032.pdf"
    },
    {
      name: "Green Digital Skills Certificate",
      institution: "INCO Academy",
      year: "2024",
      certificate: "@assets/Green digital Skills Mauricio Carcamo_1753415856033.pdf"
    },
    {
      name: "Curso Introductorio Data Science",
      institution: "Nuclio School",
      year: "2023",
      certificate: "@assets/Nuclio Data science certificado_1753415856033.pdf"
    },
    {
      name: "Metodologías Ágiles y Lean",
      institution: "Universidad Católica de Chile, Teleduc",
      year: "2022",
      certificate: "@assets/Certificado Metodologia Agil_1753415856030.pdf"
    },
    {
      name: "Gestión del Proceso de Capacitación",
      institution: "Universidad Católica de Chile, Teleduc",
      year: "2021",
      certificate: "@assets/Certificado Capacitacion_1753415856029.pdf"
    }
  ]
};

export const SERVICES = [
  {
    title: "Análisis de Datos",
    icon: "chart-line",
    description: "Experiencia en análisis estadístico, modelamiento y visualización de datos para obtener insights estratégicos."
  },
  {
    title: "Desarrollo",
    icon: "code",
    description: "Desarrollo de aplicaciones y soluciones tecnológicas utilizando Python, R y otras tecnologías web."
  },
  {
    title: "Gestión de Proyectos",
    icon: "users-cog",
    description: "Liderazgo en proyectos sociales y tecnológicos, coordinación de equipos y optimización de procesos."
  }
];

export const NAV_ITEMS = [
  { name: "Inicio", href: "#home", icon: "home" },
  { name: "Proyectos", href: "#projects", icon: "folder" },
  { name: "Tecnologías", href: "#technologies", icon: "cpu" },
  { name: "Educación", href: "#education", icon: "graduation-cap" },
  { name: "Experiencia", href: "#experience", icon: "briefcase" },
  { name: "Contacto", href: "#contact", icon: "mail" }
];
