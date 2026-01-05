import type { Application, Candidate, Company, Job } from "@/lib/api/types";

const demoJobsAr: Job[] = [
  {
    id: "job-1",
    title: "مصمم تجربة مستخدم",
    company: "ستوديو الإبداع",
    location: "الرياض، السعودية",
    type: "full-time",
    level: "متوسط",
    salary: "12,000 - 18,000 ر.س",
    tags: ["UX", "تصميم واجهات", "Figma"],
    category: "وظائف",
    description:
      "نبحث عن مصمم يركز على بناء تجارب سلسة وتدفق واضح للمنتج، مع فهم عميق لاحتياجات المستخدم.",
    requirements: [
      "خبرة 3 سنوات في تصميم المنتجات الرقمية",
      "إتقان أدوات التصميم الحديثة",
      "قدرة على التعاون مع فرق متعددة التخصصات"
    ],
    benefits: ["تأمين طبي", "ساعات مرنة", "ميزانية تدريب"],
    postedAt: "منذ يومين"
  },
  {
    id: "job-2",
    title: "مهندس برمجيات Frontend",
    company: "منصة نمو",
    location: "جدة، السعودية",
    type: "full-time",
    level: "متقدم",
    salary: "18,000 - 26,000 ر.س",
    tags: ["React", "Next.js", "TypeScript"],
    category: "وظائف",
    description:
      "ستعمل على بناء واجهات عالية الأداء مع فريق منتج سريع التطور.",
    requirements: [
      "خبرة قوية في React و Next.js",
      "معرفة جيدة بتحسين الأداء",
      "خبرة في بناء Design Systems"
    ],
    benefits: ["عمل هجين", "اشتراك تعلم", "مكافآت أداء"],
    postedAt: "منذ 5 أيام"
  },
  {
    id: "job-3",
    title: "منسق برامج تدريب",
    company: "أكاديمية الريادة",
    location: "عن بعد",
    type: "remote",
    level: "مبتدئ",
    salary: "7,000 - 9,000 ر.س",
    tags: ["تنسيق", "تدريب", "إدارة برامج"],
    category: "تدريب",
    description: "إدارة مسارات التدريب عن بعد وتنسيق الجلسات مع المدربين.",
    requirements: ["مهارات تنظيم عالية", "إجادة التواصل", "لغة إنجليزية جيدة"],
    benefits: ["عن بعد", "ساعات مرنة"],
    postedAt: "منذ أسبوع"
  },
  {
    id: "job-4",
    title: "متطوع دعم مجتمعي",
    company: "مبادرة أثر",
    location: "الخبر، السعودية",
    type: "part-time",
    level: "متطوع",
    salary: "بدون مقابل",
    tags: ["تطوع", "مبادرات مجتمعية"],
    category: "تطوع",
    description: "المشاركة في تنظيم فعاليات مجتمعية وتقديم الدعم اللوجستي.",
    requirements: ["روح المبادرة", "الالتزام بالمواعيد"],
    benefits: ["شهادة تطوع", "خبرة عملية"],
    postedAt: "منذ 3 أيام"
  },
  {
    id: "job-5",
    title: "كاتب محتوى مستقل",
    company: "وكالة سطوع",
    location: "عن بعد",
    type: "contract",
    level: "متوسط",
    salary: "200 - 400 ر.س للمقال",
    tags: ["محتوى", "SEO", "كتابة"],
    category: "أعمال حرة",
    description: "كتابة محتوى تسويقي عربي موجه للويب مع تحسين محركات البحث.",
    requirements: ["خبرة في كتابة المحتوى", "فهم SEO"],
    benefits: ["مرونة كاملة", "فرص تعاون طويل"],
    postedAt: "منذ يوم"
  }
];

const demoJobsEn: Job[] = [
  {
    id: "job-1",
    title: "UX Designer",
    company: "Creative Studio",
    location: "Riyadh, Saudi Arabia",
    type: "full-time",
    level: "Mid-level",
    salary: "SAR 12,000 - 18,000",
    tags: ["UX", "UI", "Figma"],
    category: "Jobs",
    description:
      "Design seamless product experiences and map clear user journeys with the product team.",
    requirements: [
      "3+ years in digital product design",
      "Strong tooling and prototyping skills",
      "Cross-functional collaboration"
    ],
    benefits: ["Health insurance", "Flexible hours", "Learning budget"],
    postedAt: "2 days ago"
  },
  {
    id: "job-2",
    title: "Frontend Engineer",
    company: "Growth Platform",
    location: "Jeddah, Saudi Arabia",
    type: "full-time",
    level: "Senior",
    salary: "SAR 18,000 - 26,000",
    tags: ["React", "Next.js", "TypeScript"],
    category: "Jobs",
    description:
      "Build high-performance interfaces with a fast-moving product team.",
    requirements: [
      "Strong React and Next.js experience",
      "Performance optimization mindset",
      "Design system craftsmanship"
    ],
    benefits: ["Hybrid work", "Learning subscription", "Performance bonus"],
    postedAt: "5 days ago"
  },
  {
    id: "job-3",
    title: "Training Coordinator",
    company: "Leadership Academy",
    location: "Remote",
    type: "remote",
    level: "Entry",
    salary: "SAR 7,000 - 9,000",
    tags: ["Training", "Operations"],
    category: "Training",
    description: "Coordinate remote training sessions and manage program logistics.",
    requirements: ["Organized and proactive", "Strong communication"],
    benefits: ["Remote", "Flexible hours"],
    postedAt: "1 week ago"
  },
  {
    id: "job-4",
    title: "Community Support Volunteer",
    company: "Impact Initiative",
    location: "Khobar, Saudi Arabia",
    type: "part-time",
    level: "Volunteer",
    salary: "Unpaid",
    tags: ["Volunteer", "Community"],
    category: "Volunteer",
    description: "Support community events and coordinate logistics on site.",
    requirements: ["Team spirit", "Commitment"],
    benefits: ["Volunteer certificate", "Hands-on experience"],
    postedAt: "3 days ago"
  },
  {
    id: "job-5",
    title: "Freelance Content Writer",
    company: "Glow Agency",
    location: "Remote",
    type: "contract",
    level: "Mid-level",
    salary: "SAR 200 - 400 per article",
    tags: ["Content", "SEO"],
    category: "Freelance",
    description: "Write Arabic and English marketing content optimized for SEO.",
    requirements: ["Content writing background", "SEO knowledge"],
    benefits: ["Full flexibility", "Long-term collaboration"],
    postedAt: "1 day ago"
  }
];

const demoCompaniesAr: Company[] = [
  {
    slug: "creative-studio",
    name: "ستوديو الإبداع",
    about:
      "بيت خبرة تصميمي يركز على بناء العلامات الرقمية وتجارب الاستخدام المعاصرة.",
    location: "الرياض، السعودية",
    industry: "التصميم الرقمي",
    size: "50-100",
    website: "https://forsati.example"
  },
  {
    slug: "growth-platform",
    name: "منصة نمو",
    about: "شركة تقنية تساعد المنظمات على التحول الرقمي وتطوير منتجات ذكية.",
    location: "جدة، السعودية",
    industry: "تقنية المعلومات",
    size: "200+",
    website: "https://forsati.example"
  }
];

const demoCompaniesEn: Company[] = [
  {
    slug: "creative-studio",
    name: "Creative Studio",
    about:
      "A design-led agency building modern brands and human-centered digital experiences.",
    location: "Riyadh, Saudi Arabia",
    industry: "Digital Design",
    size: "50-100",
    website: "https://forsati.example"
  },
  {
    slug: "growth-platform",
    name: "Growth Platform",
    about: "A tech company enabling digital transformation with smart products.",
    location: "Jeddah, Saudi Arabia",
    industry: "Technology",
    size: "200+",
    website: "https://forsati.example"
  }
];

const demoApplicationsAr: Application[] = [
  {
    id: "app-1",
    jobTitle: "مهندس برمجيات Frontend",
    company: "منصة نمو",
    status: "review",
    date: "منذ 3 أيام"
  },
  {
    id: "app-2",
    jobTitle: "مصمم تجربة مستخدم",
    company: "ستوديو الإبداع",
    status: "interview",
    date: "منذ أسبوع"
  }
];

const demoApplicationsEn: Application[] = [
  {
    id: "app-1",
    jobTitle: "Frontend Engineer",
    company: "Growth Platform",
    status: "review",
    date: "3 days ago"
  },
  {
    id: "app-2",
    jobTitle: "UX Designer",
    company: "Creative Studio",
    status: "interview",
    date: "1 week ago"
  }
];

const demoCandidatesAr: Candidate[] = [
  {
    id: "cand-1",
    name: "ليان الزهراني",
    role: "مصممة UI/UX",
    location: "الرياض",
    skills: ["Figma", "Prototyping", "Research"],
    availability: "متاحة خلال أسبوعين",
    score: 86
  },
  {
    id: "cand-2",
    name: "عمر القحطاني",
    role: "مهندس Frontend",
    location: "جدة",
    skills: ["React", "Next.js", "Tailwind"],
    availability: "متاح فورًا",
    score: 91
  }
];

const demoCandidatesEn: Candidate[] = [
  {
    id: "cand-1",
    name: "Layan Alzahrani",
    role: "UI/UX Designer",
    location: "Riyadh",
    skills: ["Figma", "Prototyping", "Research"],
    availability: "Available in 2 weeks",
    score: 86
  },
  {
    id: "cand-2",
    name: "Omar Alqahtani",
    role: "Frontend Engineer",
    location: "Jeddah",
    skills: ["React", "Next.js", "Tailwind"],
    availability: "Available now",
    score: 91
  }
];

export function getDemoJobs(lang: "ar" | "en") {
  return lang === "ar" ? demoJobsAr : demoJobsEn;
}

export function getDemoCompanies(lang: "ar" | "en") {
  return lang === "ar" ? demoCompaniesAr : demoCompaniesEn;
}

export function getDemoApplications(lang: "ar" | "en") {
  return lang === "ar" ? demoApplicationsAr : demoApplicationsEn;
}

export function getDemoCandidates(lang: "ar" | "en") {
  return lang === "ar" ? demoCandidatesAr : demoCandidatesEn;
}
