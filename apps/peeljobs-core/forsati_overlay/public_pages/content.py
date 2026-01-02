from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List


@dataclass(frozen=True)
class PageCopy:
    title: str
    body: List[str]
    meta_description: str


PAGE_CONTENT: Dict[str, Dict[str, PageCopy]] = {
    "about": {
        "ar": PageCopy(
            title="من نحن | فرصتي",
            meta_description="فرصتي منصة عربية متقدمة تعيد تعريف الوصول إلى فرص العمل، التدريب، التطوع، المنح، والأعمال الحرة بالاعتماد على الكفاءة والموثوقية.",
            body=[
                "**فرصتي** هي منصة رقمية عربية متقدمة تهدف إلى إعادة تعريف مفهوم الوصول إلى الفرص المهنية والتعليمية والإنسانية في المنطقة العربية، من خلال الربط الذكي بين الأفراد والجهات بناءً على الكفاءة، المهارات، والموثوقية.",
                "توفر فرصتي بيئة رقمية متكاملة تشمل فرص العمل، برامج تدريب الخريجين، فرص التطوع، المنح الدراسية، والمشاريع الحرة، مع أدوات ذكية تساعد المستخدمين على بناء ملفاتهم المهنية، تحسين سيرهم الذاتية، والاستعداد للمقابلات الوظيفية.",
                "تعتمد المنصة على تقنيات الذكاء الاصطناعي وتحليل البيانات لدعم قرارات التوظيف، مع الالتزام الصارم بمبادئ الخصوصية، حماية البيانات، والشفافية.",
                "نؤمن في فرصتي أن بناء الثقة هو الأساس، وأن التكنولوجيا يجب أن تكون وسيلة للتمكين لا للإقصاء.",
            ],
        ),
        "en": PageCopy(
            title="About Forsati",
            meta_description="Forsati is an advanced Arabic-first platform for jobs, internships, volunteering, scholarships, and freelance projects grounded in trust.",
            body=[
                "**Forsati** is an advanced Arabic digital platform designed to redefine access to professional, educational, and humanitarian opportunities across the Arab region.",
                "Forsati intelligently connects individuals with organizations based on skills, qualifications, and trust. The platform supports job opportunities, graduate training programs, volunteering, scholarships, and freelance projects, while offering smart tools to build professional profiles, optimize resumes, and prepare for interviews.",
                "Forsati leverages artificial intelligence and data analytics to support hiring decisions, while maintaining strict commitments to privacy, data protection, and transparency.",
                "We believe trust is the foundation of opportunity, and technology should empower people—not exclude them.",
            ],
        ),
    },
    "privacy": {
        "ar": PageCopy(
            title="سياسة الخصوصية | فرصتي",
            meta_description="سياسة خصوصية موسعة لحماية بيانات المستخدمين بالتشفير، التحكم في الوصول، وسجلات التدقيق مع حقوق كاملة للمستخدم.",
            body=[
                "تلتزم منصة فرصتي بحماية خصوصية مستخدميها وبياناتهم الشخصية وفقًا لأفضل الممارسات التقنية والقانونية المعمول بها.",
                "البيانات التي نقوم بجمعها تشمل: بيانات الحساب الأساسية (مثل البريد الإلكتروني ورقم الهاتف)، البيانات المهنية (الخبرات، المهارات، التعليم، الشهادات)، بيانات الاستخدام (التفاعلات، السجلات التقنية، عناوين IP)، ووثائق اختيارية حساسة بناءً على موافقة صريحة من المستخدم.",
                "نستخدم البيانات لتشغيل وتحسين خدمات المنصة، تقديم توصيات وفرص مناسبة، تحليل الأداء وجودة الخدمات، والامتثال للمتطلبات القانونية والتنظيمية.",
                "حماية البيانات تشمل تشفير البيانات أثناء النقل والتخزين، فصل البيانات الحساسة عن البيانات العامة، تطبيق صلاحيات وصول صارمة وسجلات تدقيق، وعدم مشاركة أي وثائق حساسة إلا بموافقة المستخدم ولمدة زمنية محددة.",
                "حقوق المستخدم: الوصول إلى بياناته وتحديثها، طلب حذف الحساب والبيانات، وسحب الموافقة على مشاركة الوثائق في أي وقت.",
            ],
        ),
        "en": PageCopy(
            title="Privacy Policy",
            meta_description="Extended privacy policy detailing encryption, audit logging, consent, and user rights for Forsati users.",
            body=[
                "Forsati is committed to protecting users’ privacy and personal data in accordance with applicable laws and best technical practices.",
                "We collect account information, professional profile data, usage analytics, and optional sensitive documents only with explicit user consent.",
                "All sensitive data is encrypted, access-controlled, and shared strictly on a consent-based and time-limited basis.",
                "Users retain full rights to access, update, or request deletion of their data, subject to legal and regulatory retention requirements.",
            ],
        ),
    },
    "cookies": {
        "ar": PageCopy(
            title="سياسة الكوكيز | فرصتي",
            meta_description="سياسة كوكيز موسعة تشرح استخدام ملفات الارتباط لتحسين التجربة وتحليل الأداء مع احترام موافقات المستخدم.",
            body=[
                "تستخدم فرصتي ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم، تحليل الأداء، وتخصيص المحتوى.",
                "لا تُستخدم الكوكيز لأغراض إعلانية دون موافقة المستخدم، ويمكن إدارة الكوكيز من إعدادات المتصفح في أي وقت.",
            ],
        ),
        "en": PageCopy(
            title="Cookie Policy",
            meta_description="Extended cookie policy covering performance and personalization cookies with consent requirements.",
            body=[
                "Forsati uses cookies to improve user experience, analyze performance, and personalize content.",
                "Advertising cookies are not used without explicit user consent, and preferences can be managed via browser settings at any time.",
            ],
        ),
    },
    "security": {
        "ar": PageCopy(
            title="الأمان والحماية | فرصتي",
            meta_description="إطار أمني متعدد الطبقات يشمل HTTPS وRBAC وسجلات تدقيق وكشف الاحتيال والحماية من الهجمات الآلية.",
            body=[
                "تعتمد فرصتي إطارًا أمنيًا متقدمًا يشمل: تشفير الاتصالات باستخدام HTTPS، نظام صلاحيات مبني على الأدوار (RBAC)، سجلات تدقيق شاملة لكل العمليات الحساسة، أنظمة كشف ومنع الاحتيال، وحماية من إساءة الاستخدام والهجمات الآلية.",
            ],
        ),
        "en": PageCopy(
            title="Security",
            meta_description="Multi-layer security with HTTPS, RBAC, audit logging, fraud detection, and abuse prevention for Forsati users.",
            body=[
                "Forsati implements a multi-layered security framework including encryption, role-based access control, audit logging, fraud detection, and abuse prevention systems.",
            ],
        ),
    },
    "terms": {
        "ar": PageCopy(
            title="الشروط والأحكام | فرصتي",
            meta_description="شروط استخدام موسعة توضح مسؤولية صحة البيانات ومنع المحتوى المضلل وحق المنصة في التعليق.",
            body=[
                "باستخدامك لمنصة فرصتي، فإنك توافق على تقديم معلومات صحيحة ودقيقة، والامتناع عن نشر محتوى أو فرص مضللة أو غير قانونية، والالتزام بسياسات الاستخدام والتوظيف العادل.",
                "تحتفظ المنصة بأحقية تعليق أو إنهاء الحسابات المخالفة.",
            ],
        ),
        "en": PageCopy(
            title="Terms & Conditions",
            meta_description="Extended terms detailing accurate data responsibilities, prohibited content, and enforcement rights.",
            body=[
                "By using Forsati, you agree to provide accurate and truthful information, avoid fraudulent or illegal postings, and comply with fair-use hiring policies.",
                "The platform reserves the right to suspend or terminate accounts that violate these terms.",
            ],
        ),
    },
    "contact": {
        "ar": PageCopy(
            title="اتصل بنا | فرصتي",
            meta_description="تواصل مع فريق فرصتي لدعم المنصة أو الشراكات عبر البريد أو نموذج التواصل.",
            body=[
                "البريد الإلكتروني: support@forsati.org (افتراضي).",
                "نموذج تواصل داخل الموقع سيتوفر بعد تسجيل الدخول.",
                "نرحب بالشراكات والملاحظات لتحسين المنصة.",
            ],
        ),
        "en": PageCopy(
            title="Contact",
            meta_description="Reach the Forsati team for support or partnerships via email or the in-app contact form.",
            body=[
                "Email: support@forsati.org (placeholder).",
                "An in-app contact form will be available after authentication.",
                "We welcome partnerships and feedback to improve Forsati.",
            ],
        ),
    },
}
