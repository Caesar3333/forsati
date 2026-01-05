type LegalSection = {
  title: string;
  body: string;
};

type LegalPage = {
  intro: string;
  sections: LegalSection[];
};

export const legalContent: Record<
  "about" | "privacy" | "cookies" | "terms" | "security" | "aiDisclaimer",
  { ar: LegalPage; en: LegalPage }
> = {
  about: {
    ar: {
      intro:
        "فرصتي منصة عربية تربط الباحثين عن الفرص بأصحاب العمل مع أدوات ذكية تسهّل بناء السيرة والتحضير للمقابلات.",
      sections: [
        {
          title: "رؤيتنا",
          body: "نطمح إلى سوق عمل عربي أكثر وضوحًا وعدالة عبر تجربة رقمية حديثة."
        },
        {
          title: "ما نقدمه",
          body:
            "لوحات تحكم للباحثين وأصحاب العمل، وذكاء اصطناعي يساعد على تطوير المسار المهني."
        }
      ]
    },
    en: {
      intro:
        "Forsati is an Arabic-first platform connecting talent with employers and smart tools for CVs and interviews.",
      sections: [
        {
          title: "Our vision",
          body: "A clearer, fairer job market built on modern digital experiences."
        },
        {
          title: "What we offer",
          body:
            "Dashboards for job seekers and recruiters, plus AI services to improve career outcomes."
        }
      ]
    }
  },
  privacy: {
    ar: {
      intro:
        "نلتزم بحماية بياناتك ونوضح هنا كيف نجمعها ونستخدمها داخل منصة فرصتي.",
      sections: [
        {
          title: "البيانات التي نجمعها",
          body:
            "نجمع البيانات التي تقدمها أثناء التسجيل أو التقديم، بالإضافة إلى بيانات الاستخدام لتحسين التجربة."
        },
        {
          title: "كيفية استخدام البيانات",
          body:
            "نستخدم بياناتك لتخصيص الفرص وتقديم توصيات وتحسين جودة الخدمة."
        }
      ]
    },
    en: {
      intro:
        "We protect your data and explain how information is collected and used on Forsati.",
      sections: [
        {
          title: "Data we collect",
          body:
            "We collect data you provide during registration or applications, plus usage data for improvements."
        },
        {
          title: "How data is used",
          body: "We personalize opportunities and improve service quality."
        }
      ]
    }
  },
  cookies: {
    ar: {
      intro:
        "نستخدم ملفات الارتباط لتحسين الأداء وتذكر تفضيلاتك داخل المنصة.",
      sections: [
        {
          title: "أنواع الملفات",
          body: "ملفات ضرورية للتشغيل، وأخرى لتحليل الأداء وتحسين التجربة."
        },
        {
          title: "إدارة الملفات",
          body: "يمكنك التحكم في ملفات الارتباط من إعدادات المتصفح."
        }
      ]
    },
    en: {
      intro:
        "Cookies help us improve performance and remember your preferences.",
      sections: [
        {
          title: "Types of cookies",
          body: "Essential cookies, plus analytics cookies to improve experience."
        },
        {
          title: "Managing cookies",
          body: "You can manage cookies via your browser settings."
        }
      ]
    }
  },
  terms: {
    ar: {
      intro:
        "باستخدامك للمنصة أنت توافق على الشروط التالية الخاصة بالخدمة.",
      sections: [
        {
          title: "الاستخدام المقبول",
          body: "الالتزام بالقوانين وعدم نشر أي محتوى مسيء أو مضلل."
        },
        {
          title: "المحتوى والملكية",
          body: "تحتفظ بملكيتك للمحتوى الذي تقدمه، مع منحنا حق عرضه لأغراض التوظيف."
        }
      ]
    },
    en: {
      intro:
        "By using Forsati you agree to the following terms and conditions.",
      sections: [
        {
          title: "Acceptable use",
          body: "Follow local laws and avoid misleading or harmful content."
        },
        {
          title: "Content ownership",
          body:
            "You keep ownership of your content while granting us the right to display it for hiring."
        }
      ]
    }
  },
  security: {
    ar: {
      intro: "نعمل على حماية المنصة عبر ممارسات أمنية مستمرة.",
      sections: [
        {
          title: "حماية الحسابات",
          body: "نستخدم التشفير وإجراءات مراقبة لتقليل المخاطر."
        },
        {
          title: "التواصل الأمني",
          body: "لبلاغات الأمان تواصل معنا عبر security@forsati.example."
        }
      ]
    },
    en: {
      intro: "We protect the platform through ongoing security practices.",
      sections: [
        {
          title: "Account protection",
          body: "Encryption and monitoring reduce security risks."
        },
        {
          title: "Security contact",
          body: "Report issues via security@forsati.example."
        }
      ]
    }
  },
  aiDisclaimer: {
    ar: {
      intro:
        "تستخدم منصة فرصتي أدوات ذكاء اصطناعي للمساعدة، والنتائج تقديرية وليست ضمانًا.",
      sections: [
        {
          title: "حدود الذكاء الاصطناعي",
          body: "المخرجات تعتمد على المدخلات وقد تتطلب مراجعة بشرية."
        },
        {
          title: "المسؤولية",
          body:
            "المستخدم مسؤول عن دقة البيانات التي يشاركها عند استخدام الأدوات."
        }
      ]
    },
    en: {
      intro:
        "Forsati provides AI assistance, but results are indicative and not guaranteed.",
      sections: [
        {
          title: "AI limitations",
          body: "Outputs depend on inputs and require human review."
        },
        {
          title: "Responsibility",
          body: "Users are responsible for the accuracy of shared data."
        }
      ]
    }
  }
};
