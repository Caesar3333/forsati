export type BlogPost = {
  slug: string;
  date: string;
  readTime: string;
  tags: string[];
  cover: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  content: { en: string[]; ar: string[] };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "stand-out-application",
    date: "2025-11-14",
    readTime: "6 min",
    tags: ["Career", "Applications"],
    cover: "from-amber-100 via-white to-rose-100",
    title: {
      en: "Stand Out in Competitive Applications",
      ar: "تميّز في طلبات التقديم"
    },
    excerpt: {
      en: "A practical checklist to sharpen your CV and story.",
      ar: "قائمة عملية لصقل سيرتك وقصتك المهنية."
    },
    content: {
      en: [
        "Lead with impact: start every experience with measurable outcomes and clear ownership.",
        "Tailor each application with a short, relevant message aligned to the role.",
        "Track your applications and follow up thoughtfully to keep momentum."
      ],
      ar: [
        "ابدأ بالأثر: قدّم خبراتك بنتائج قابلة للقياس ومسؤوليات واضحة.",
        "خصّص كل تقديم برسالة قصيرة مرتبطة بالفرصة والمهارات المطلوبة.",
        "تابع طلباتك بانتظام واطلب تغذية راجعة عند الحاجة."
      ]
    }
  },
  {
    slug: "ai-interview-prep",
    date: "2025-11-12",
    readTime: "5 min",
    tags: ["AI", "Interview"],
    cover: "from-sky-100 via-white to-indigo-100",
    title: {
      en: "AI Interview Prep That Actually Helps",
      ar: "استعداد للمقابلة بمساعدة الذكاء الاصطناعي"
    },
    excerpt: {
      en: "Use mock questions and structured feedback to improve fast.",
      ar: "استخدم أسئلة تجريبية وتغذية راجعة منظمة للتقدّم بسرعة."
    },
    content: {
      en: [
        "Start with a short mock session to identify gaps in your story.",
        "Record answers and review them to improve clarity and confidence.",
        "Ask for specific feedback on structure, tone, and examples."
      ],
      ar: [
        "ابدأ بجلسة أسئلة قصيرة لتحديد نقاط الضعف في قصتك المهنية.",
        "سجّل الإجابات وراجعها لتحسين الوضوح والثقة.",
        "اطلب ملاحظات محددة حول التنظيم والنبرة والأمثلة."
      ]
    }
  },
  {
    slug: "marketplace-coach",
    date: "2025-11-10",
    readTime: "4 min",
    tags: ["Marketplace", "Coaching"],
    cover: "from-emerald-100 via-white to-amber-100",
    title: {
      en: "Choosing the Right Coach in the Marketplace",
      ar: "اختيار المدرب المناسب في سوق الخدمات"
    },
    excerpt: {
      en: "How to evaluate providers before you book.",
      ar: "كيف تقيّم مقدمي الخدمات قبل الحجز."
    },
    content: {
      en: [
        "Read the profile and verify experience in your domain.",
        "Ask for a short plan or sample before payment.",
        "Agree on outcomes, timelines, and the number of revisions."
      ],
      ar: [
        "اقرأ الملف التعريفي وتأكد من الخبرة في مجالك.",
        "اطلب عينة أو خطة جلسة قبل الدفع لضمان التوافق.",
        "اتفق على النتائج المتوقعة والمدة وعدد المراجعات."
      ]
    }
  }
];
