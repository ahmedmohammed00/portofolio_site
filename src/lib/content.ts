export type Lang = 'en' | 'ar';
export type Localized = { en: string; ar: string };
export const profile = {
  name: 'Ahmed Mohamed',
  arabicName: 'أحمد محمد',
  email: 'ahmedmohammed227a@gmail.com',
  location: 'Cairo, Egypt',
  university: 'Modern Academy for Engineering and Technology',
  graduation: '2027',
  trainingYear: '2026',
  origin: process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedmohammed00.github.io/portofolio_site',
  github: '',
  linkedin: '',
  phone: '',
  avatar: '/images/ahmed-avatar.jpeg',
};
export type Project = {
  slug: string;
  number: string;
  title: string;
  category: '.NET' | 'Node.js';
  type: Localized;
  description: Localized;
  role: Localized;
  stack: string[];
  preview: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  challenge: Localized;
  approach: Localized;
  features: Localized[];
  diagram: string[];
  accent: string;
};
export const projects: Project[] = [
  {
    slug: 'cliniqai',
    number: '01',
    title: 'CliniqAI',
    category: '.NET',
    type: { en: 'MULTI-TENANT CLINIC PLATFORM', ar: 'منصة لإدارة العيادات' },
    description: {
      en: 'One platform. Independent clinics. A tenant-aware backend for patient records, appointments, and everyday clinic operations.',
      ar: 'منصة واحدة لعيادات مستقلة. نظام خلفي يعزل بيانات كل عيادة ويدير المرضى والمواعيد والعمليات اليومية.',
    },
    role: { en: 'Backend Engineer', ar: 'مهندس باك إند' },
    stack: ['ASP.NET Core', 'C#', 'EF Core', 'SQL Server'],
    preview: null,
    liveUrl: null,
    githubUrl: null,
    accent: 'teal',
    diagram: ['Identity', 'Tenant isolation', 'SQL Server'],
    challenge: {
      en: 'Keep clinic data strictly separated while giving administrators, doctors, and receptionists the access and workflows they need.',
      ar: 'فصل بيانات العيادات بشكل صارم، مع توفير الصلاحيات وسير العمل المناسب للإدارة والأطباء وموظفي الاستقبال.',
    },
    approach: {
      en: 'I structured the application across controller, service, repository, and data-access layers using constructor dependency injection. Tenant-aware Entity Framework Core queries enforce clinic isolation, and ASP.NET Core Identity handles authentication and role-based authorization.',
      ar: 'قسمت التطبيق إلى طبقات Controller وService وRepository وData Access مع حقن الاعتماديات. استعلامات EF Core تراعي العيادة لعزل البيانات، وASP.NET Core Identity يدير تسجيل الدخول والصلاحيات.',
    },
    features: [
      {
        en: 'Tenant-aware relational schema and isolated clinic data',
        ar: 'قاعدة بيانات علائقية تراعي عزل كل عيادة',
      },
      {
        en: 'Admin, Doctor, and Receptionist authorization',
        ar: 'صلاحيات الإدارة والأطباء والاستقبال',
      },
      { en: 'Patient records and appointment scheduling', ar: 'سجلات المرضى وجدولة المواعيد' },
      {
        en: 'Role-specific dashboards and an Arabic RTL interface',
        ar: 'لوحات تحكم حسب الدور وواجهة عربية من اليمين لليسار',
      },
    ],
  },
  {
    slug: 'delivery-management',
    number: '02',
    title: 'Delivery Management',
    category: '.NET',
    type: { en: 'LOGISTICS / DEPI GRADUATION PROJECT', ar: 'نظام لوجستي / مشروع تخرج DEPI' },
    description: {
      en: 'A structured backend for the journey from order creation to proof of delivery. Built around real logistics workflows.',
      ar: 'نظام خلفي يغطي رحلة الطلب من الإنشاء إلى إثبات التسليم، ومبني على سير عمل الخدمات اللوجستية.',
    },
    role: { en: 'Backend Engineer', ar: 'مهندس باك إند' },
    stack: ['ASP.NET Core', 'C#', 'EF Core', 'PostgreSQL'],
    preview: null,
    liveUrl: null,
    githubUrl: null,
    accent: 'coral',
    diagram: ['Order', 'Route & dispatch', 'Proof of delivery'],
    challenge: {
      en: 'Model the full delivery lifecycle and coordinate the responsibilities of administrators, dispatchers, drivers, and merchants.',
      ar: 'تمثيل دورة التوصيل كاملة وتنسيق مسؤوليات الإدارة وموظفي التوزيع والسائقين والتجار.',
    },
    approach: {
      en: 'I developed RESTful APIs backed by PostgreSQL and Entity Framework Core. The domain covers shipments, merchants, drivers, vehicles, routes, and delivery stops, with four roles and explicit order-state transitions.',
      ar: 'طورت RESTful APIs باستخدام PostgreSQL وEF Core. يشمل النظام الشحنات والتجار والسائقين والمركبات والمسارات ونقاط التسليم، مع أربعة أدوار وحالات واضحة للطلبات.',
    },
    features: [
      {
        en: 'Four-role access control for logistics operations',
        ar: 'إدارة الصلاحيات لأربعة أدوار في العمليات اللوجستية',
      },
      {
        en: 'Unassigned, assigned, in-transit, completed, and failed orders',
        ar: 'حالات الطلب من الانتظار إلى التعيين والنقل والتسليم أو الفشل',
      },
      {
        en: 'Route planning, delivery stops, and proof-of-delivery capture',
        ar: 'المسارات ونقاط التسليم وتسجيل إثبات التسليم',
      },
      {
        en: 'Documented APIs for orders, merchants, drivers, and routes',
        ar: 'توثيق واجهات الطلبات والتجار والسائقين والمسارات',
      },
    ],
  },
  {
    slug: 'realtime-chat',
    number: '03',
    title: 'Real-time Chat',
    category: 'Node.js',
    type: { en: 'REAL-TIME / FULL-STACK APPLICATION', ar: 'تطبيق محادثة لحظية / فول ستاك' },
    description: {
      en: 'Persistent connections. Instant conversations. A WebSocket-powered chat application with a Node.js backend and React frontend.',
      ar: 'اتصالات مستمرة ومحادثات لحظية. تطبيق دردشة باستخدام WebSockets مع Node.js للباك إند وReact للواجهة.',
    },
    role: { en: 'Full-Stack Developer', ar: 'مطور فول ستاك' },
    stack: ['Node.js', 'Express.js', 'React', 'WebSockets'],
    preview: null,
    liveUrl: null,
    githubUrl: null,
    accent: 'blue',
    diagram: ['React client', 'WebSocket events', 'Node.js server'],
    challenge: {
      en: 'Keep multiple clients connected and update conversations immediately without refreshing the page.',
      ar: 'الحفاظ على اتصال عدة مستخدمين وتحديث المحادثات فوراً دون إعادة تحميل الصفحة.',
    },
    approach: {
      en: 'I built an Express.js backend with persistent bidirectional WebSocket communication, server-side connection management, and event handling. The React interface responds to incoming and outgoing messages in real time.',
      ar: 'بنيت باك إند باستخدام Express.js واتصالات WebSocket ثنائية الاتجاه، مع إدارة الاتصالات والأحداث على الخادم. واجهة React تتحدث لحظياً مع الرسائل الواردة والصادرة.',
    },
    features: [
      {
        en: 'Persistent bidirectional WebSocket connections',
        ar: 'اتصالات WebSocket مستمرة ثنائية الاتجاه',
      },
      {
        en: 'Server-side connection and event management',
        ar: 'إدارة الاتصالات والأحداث على الخادم',
      },
      { en: 'Multiple concurrent connected users', ar: 'دعم اتصال عدة مستخدمين في نفس الوقت' },
      { en: 'Immediate message rendering in React', ar: 'عرض الرسائل فورياً في React' },
    ],
  },
];
export const skillGroups = [
  {
    number: '01',
    name: { en: 'Backend', ar: 'الباك إند' },
    icon: 'code',
    skills: ['C#', 'ASP.NET Core', 'ASP.NET MVC', 'Node.js', 'Express.js', 'TypeScript'],
  },
  {
    number: '02',
    name: { en: 'Data', ar: 'البيانات' },
    icon: 'database',
    skills: ['SQL Server', 'PostgreSQL', 'Entity Framework Core', 'LINQ', 'Relational design'],
  },
  {
    number: '03',
    name: { en: 'Architecture', ar: 'تصميم الأنظمة' },
    icon: 'layers',
    skills: [
      'Layered architecture',
      'Dependency injection',
      'SOLID',
      'Repository pattern',
      'RESTful APIs',
    ],
  },
  {
    number: '04',
    name: { en: 'Security & tools', ar: 'الأمان والأدوات' },
    icon: 'shield',
    skills: ['ASP.NET Identity', 'JWT', 'RBAC', 'Docker', 'Git', 'Swagger / OpenAPI', 'Postman'],
  },
];
export const services = [
  {
    icon: 'code',
    title: { en: 'APIs that connect the dots.', ar: 'واجهات تربط كل أجزاء منتجك.' },
    description: {
      en: 'RESTful backends with clear contracts, validation, authentication, and documentation. Built with .NET or Node.js.',
      ar: 'باك إند RESTful بعقود واضحة والتحقق من البيانات وتسجيل الدخول والتوثيق، باستخدام .NET أو Node.js.',
    },
    tags: ['REST APIs', '.NET / Node.js'],
  },
  {
    icon: 'database',
    title: { en: 'Data with a solid foundation.', ar: 'بيانات على أساس سليم.' },
    description: {
      en: 'Relational schemas, tenant-aware data access, and maintainable persistence layers for your application.',
      ar: 'قواعد بيانات علائقية، وعزل بيانات العملاء، وطبقات وصول للبيانات قابلة للتطوير والصيانة.',
    },
    tags: ['SQL', 'EF Core'],
  },
  {
    icon: 'shield',
    title: { en: 'The right access. By design.', ar: 'الصلاحيات المناسبة من البداية.' },
    description: {
      en: 'Identity, JWT authentication, and role-based authorization that fit the way your users actually work.',
      ar: 'إدارة الهوية وJWT والصلاحيات حسب الأدوار، بما يتناسب مع طريقة عمل مستخدميك.',
    },
    tags: ['Identity', 'RBAC'],
  },
  {
    icon: 'activity',
    title: { en: 'Systems that stay in sync.', ar: 'أنظمة متصلة لحظياً.' },
    description: {
      en: 'Real-time features and management workflows, from WebSocket events to dashboards and operational systems.',
      ar: 'ميزات لحظية وسير عمل للعمليات، من أحداث WebSocket إلى لوحات التحكم وأنظمة الإدارة.',
    },
    tags: ['WebSockets', 'Workflows'],
  },
];
export const pathFor = (lang: Lang, path = '/') =>
  `${lang === 'ar' ? '/ar' : ''}${path === '/' && lang === 'ar' ? '/' : path}`;
