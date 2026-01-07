import type { Metadata } from "next";

type Locale = "ar" | "en";

type MetaEntry = {
  title: string;
  description: string;
};

const meta: Record<string, Record<Locale, MetaEntry>> = {
  home: {
    ar: {
      title: "اعثر على فرصتك الآن",
      description: "منصة فرصتي للوظائف والتدريب والتطوع مع أدوات ذكاء اصطناعي."
    },
    en: {
      title: "Find your next opportunity",
      description: "Forsati is a job, training, and volunteering platform with AI tools."
    }
  },
  jobs: {
    ar: {
      title: "نتائج البحث عن الوظائف",
      description: "تصفّح فرص العمل مع فلاتر قوية وتجربة عربية كاملة."
    },
    en: {
      title: "Job search results",
      description: "Browse opportunities with powerful filters and clean UX."
    }
  },
  jobDetails: {
    ar: {
      title: "تفاصيل الفرصة",
      description: "كل ما تحتاج معرفته عن الوظيفة وخطوات التقديم."
    },
    en: {
      title: "Job details",
      description: "Full job description, requirements, and apply flow."
    }
  },
  company: {
    ar: {
      title: "بروفايل الجهة",
      description: "تعرف على الجهة وفرصها المفتوحة."
    },
    en: {
      title: "Company profile",
      description: "Discover the company and its open roles."
    }
  },
  login: {
    ar: {
      title: "تسجيل الدخول",
      description: "ادخل إلى حسابك للوصول إلى فرصك وبياناتك."
    },
    en: {
      title: "Sign in",
      description: "Access your Forsati account and applications."
    }
  },
  register: {
    ar: {
      title: "إنشاء حساب",
      description: "أنشئ حسابك لاستكشاف الوظائف وخدمات الذكاء الاصطناعي."
    },
    en: {
      title: "Create account",
      description: "Join Forsati to explore jobs and AI tools."
    }
  },
  forgotPassword: {
    ar: {
      title: "استعادة كلمة المرور",
      description: "استرجع حسابك بخطوات بسيطة."
    },
    en: {
      title: "Reset password",
      description: "Recover your account in a few steps."
    }
  },
  checkEmail: {
    ar: {
      title: "تحقق من البريد",
      description: "أرسلنا رابط التحقق إلى بريدك الإلكتروني."
    },
    en: {
      title: "Check your email",
      description: "We sent a verification link to your email."
    }
  },
  profile: {
    ar: {
      title: "ملفي الشخصي",
      description: "إدارة بياناتك وسيرتك ومسارك الوظيفي."
    },
    en: {
      title: "My profile",
      description: "Manage your profile, CV, and career journey."
    }
  },
  applications: {
    ar: {
      title: "طلباتي",
      description: "تابع حالة طلباتك بكل وضوح."
    },
    en: {
      title: "My applications",
      description: "Track the status of your applications."
    }
  },
  saved: {
    ar: {
      title: "الوظائف المحفوظة",
      description: "قائمة الفرص التي حفظتها للعودة لاحقًا."
    },
    en: {
      title: "Saved jobs",
      description: "Keep track of roles you want to revisit."
    }
  },
  cv: {
    ar: {
      title: "بناء السيرة الذاتية",
      description: "أنشئ سيرتك أو ارفع ملفك بسهولة."
    },
    en: {
      title: "Resume builder",
      description: "Create or upload your CV with ease."
    }
  },
  cvAnalyzer: {
    ar: {
      title: "تحليل السيرة بالذكاء الاصطناعي",
      description: "احصل على تقييم ونصائح لتحسين سيرتك."
    },
    en: {
      title: "AI CV Analyzer",
      description: "Get insights and improvements for your CV."
    }
  },
  mockInterview: {
    ar: {
      title: "مقابلة تجريبية بالذكاء الاصطناعي",
      description: "تدرّب على الأسئلة واحصل على تغذية راجعة."
    },
    en: {
      title: "AI Mock Interview",
      description: "Practice with questions and receive feedback."
    }
  },
  verification: {
    ar: {
      title: "رفع وثائق التحقق",
      description: "ارفع مستنداتك لإكمال التحقق."
    },
    en: {
      title: "Verification upload",
      description: "Upload your documents for verification."
    }
  },
  recruiterDashboard: {
    ar: {
      title: "لوحة التوظيف",
      description: "نظرة عامة على أداء وظائفك."
    },
    en: {
      title: "Recruiter dashboard",
      description: "Overview of your hiring performance."
    }
  },
  recruiterJobs: {
    ar: {
      title: "فرص الجهة",
      description: "إدارة فرصك المنشورة بكل سهولة."
    },
    en: {
      title: "Company jobs",
      description: "Manage your posted roles."
    }
  },
  recruiterNewJob: {
    ar: {
      title: "إنشاء فرصة جديدة",
      description: "أنشئ إعلان توظيف احترافي."
    },
    en: {
      title: "Post a new job",
      description: "Create a professional job post."
    }
  },
  recruiterApplications: {
    ar: {
      title: "طلبات المتقدمين",
      description: "إدارة مراحل التقييم والتوظيف."
    },
    en: {
      title: "Applicants pipeline",
      description: "Manage hiring stages and applicants."
    }
  },
  recruiterCandidates: {
    ar: {
      title: "بحث المرشحين",
      description: "اكتشف المرشحين المناسبين بسرعة."
    },
    en: {
      title: "Candidate search",
      description: "Discover the right candidates fast."
    }
  },
  recruiterReports: {
    ar: {
      title: "البلاغات والتقارير",
      description: "تابع البلاغات والإجراءات المطلوبة."
    },
    en: {
      title: "Reports",
      description: "Review reports and follow up actions."
    }
  },
  about: {
    ar: {
      title: "عن فرصتي",
      description: "تعرف على رؤيتنا وكيف نخدم سوق العمل العربي."
    },
    en: {
      title: "About Forsati",
      description: "Learn about our mission for the Arabic job market."
    }
  },
  privacy: {
    ar: {
      title: "سياسة الخصوصية",
      description: "كيف نحافظ على بياناتك وخصوصيتك."
    },
    en: {
      title: "Privacy policy",
      description: "How we protect your data and privacy."
    }
  },
  cookies: {
    ar: {
      title: "ملفات الارتباط",
      description: "معلومات عن استخدام ملفات الارتباط."
    },
    en: {
      title: "Cookie policy",
      description: "Details about cookie usage."
    }
  },
  terms: {
    ar: {
      title: "الشروط والأحكام",
      description: "الشروط المنظمة لاستخدام منصة فرصتي."
    },
    en: {
      title: "Terms of service",
      description: "Terms that govern using Forsati."
    }
  },
  security: {
    ar: {
      title: "الأمن",
      description: "التزامنا بأمن معلوماتك."
    },
    en: {
      title: "Security",
      description: "Our commitment to securing your data."
    }
  },
  aiDisclaimer: {
    ar: {
      title: "تنبيه الذكاء الاصطناعي",
      description: "تفاصيل استخدام خدمات الذكاء الاصطناعي."
    },
    en: {
      title: "AI disclaimer",
      description: "Details on how AI services are used."
    }
  },
  adminDashboard: {
    ar: {
      title: "لوحة تحكم الإدارة",
      description: "نظرة شاملة على مؤشرات النظام والقرارات العاجلة."
    },
    en: {
      title: "Admin dashboard",
      description: "System KPIs, approvals, and operational insights."
    }
  },
  adminSettings: {
    ar: {
      title: "إعدادات النظام",
      description: "إدارة إعدادات النظام والهوية والتنبيهات."
    },
    en: {
      title: "System settings",
      description: "Manage system configuration, branding, and notifications."
    }
  },
  adminUsers: {
    ar: {
      title: "إدارة المستخدمين",
      description: "عرض المستخدمين وتحديث صلاحياتهم."
    },
    en: {
      title: "Manage users",
      description: "Review users and update roles."
    }
  },
  adminPayments: {
    ar: {
      title: "إدارة المدفوعات",
      description: "متابعة المدفوعات والبوابات."
    },
    en: {
      title: "Payments management",
      description: "Track payments and gateway status."
    }
  },
  adminSupport: {
    ar: {
      title: "تذاكر الدعم",
      description: "متابعة تذاكر الدعم والطلبات."
    },
    en: {
      title: "Support tickets",
      description: "Manage support tickets and requests."
    }
  },
  adminReports: {
    ar: {
      title: "التقارير",
      description: "لوحة تقارير وتحليلات النظام."
    },
    en: {
      title: "Reports",
      description: "System reports and analytics."
    }
  }
  ,pricing: {
    ar: {
      title: "خطط الأسعار",
      description: "اختر الخطة المناسبة لرحلتك المهنية."
    },
    en: {
      title: "Pricing plans",
      description: "Choose the plan that fits your journey."
    }
  },
  faq: {
    ar: {
      title: "الأسئلة الشائعة",
      description: "إجابات على الأسئلة المتكررة حول فرصتي."
    },
    en: {
      title: "FAQ",
      description: "Answers to common questions about Forsati."
    }
  },
  blog: {
    ar: {
      title: "مدونة فرصتي",
      description: "مقالات عملية للنمو المهني."
    },
    en: {
      title: "Forsati blog",
      description: "Practical insights for job seekers and organizations."
    }
  },
  contact: {
    ar: {
      title: "تواصل معنا",
      description: "أرسل استفسارك وسنعود إليك قريباً."
    },
    en: {
      title: "Contact us",
      description: "Send a message and our team will reply."
    }
  },
  legalTerms: {
    ar: {
      title: "الشروط والأحكام",
      description: "تفاصيل الشروط التي تحكم استخدام فرصتي."
    },
    en: {
      title: "Terms & Conditions",
      description: "Terms that govern using Forsati."
    }
  },
  legalPrivacy: {
    ar: {
      title: "سياسة الخصوصية",
      description: "كيف نحمي بياناتك وخصوصيتك."
    },
    en: {
      title: "Privacy Policy",
      description: "How we handle and protect your data."
    }
  },
  legalAiDisclaimer: {
    ar: {
      title: "إخلاء مسؤولية الذكاء الاصطناعي",
      description: "توضيح حدود استخدام خدمات الذكاء الاصطناعي."
    },
    en: {
      title: "AI Disclaimer",
      description: "How AI is used on the platform."
    }
  },
  resetPassword: {
    ar: {
      title: "تعيين كلمة مرور جديدة",
      description: "أكمل إعادة تعيين كلمة المرور."
    },
    en: {
      title: "Set a new password",
      description: "Complete your password reset."
    }
  },
  verifyEmail: {
    ar: {
      title: "تأكيد البريد الإلكتروني",
      description: "أدخل رمز التحقق المرسل لبريدك."
    },
    en: {
      title: "Verify email",
      description: "Enter the code sent to your email."
    }
  },
  verifyMobile: {
    ar: {
      title: "تأكيد رقم الجوال",
      description: "أدخل رمز التحقق المرسل لهاتفك."
    },
    en: {
      title: "Verify mobile",
      description: "Enter the code sent to your phone."
    }
  }

};

type BuildMetadataArgs = {
  lang: Locale;
  key: keyof typeof meta;
  path: string;
  titleOverride?: string;
  descriptionOverride?: string;
};

export function buildMetadata({
  lang,
  key,
  path,
  titleOverride,
  descriptionOverride
}: BuildMetadataArgs): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost";
  const entry = meta[key][lang];
  const title = titleOverride || entry.title;
  const description = descriptionOverride || entry.description;
  const canonical = `${baseUrl}/${lang}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ar: `${baseUrl}/ar${path}`,
        en: `${baseUrl}/en${path}`
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: lang,
      type: "website"
    }
  };
}
