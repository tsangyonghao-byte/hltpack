import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Shield, Mail, Lock, Eye, FileText, Database } from "lucide-react";
import prisma from "@/lib/prisma";
import {
  buildRobotsMetadata,
  buildSeoMetadata,
  composeSeoTitle,
  getSystemSeo,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const { siteName, titleSuffix, keywords, siteNoindex, noindexPaths } = await getSystemSeo(locale);

  const title = locale === "es" ? "Política de Privacidad" : locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy";
  const description = locale === "es" 
    ? "Política de Privacidad de HAILITONG Packaging. Conozca cómo recopilamos y protegemos sus datos personales."
    : locale === "ar"
      ? "سياسة الخصوصية لشركة HAILITONG Packaging. تعرف على كيفية جمع وحماية معلوماتك الشخصية."
      : "Privacy Policy for HAILITONG Packaging. Learn how we handle and protect your personal information.";

  return buildSeoMetadata({
    title,
    description,
    siteName,
    socialTitle: composeSeoTitle(title, titleSuffix, siteName),
    keywords,
    canonicalPath: "/privacy-policy",
    robots: buildRobotsMetadata("/privacy-policy", { siteNoindex, noindexPaths }),
  });
}

const TEXT = {
  en: {
    breadcrumb: "Compliance & Security",
    heroTitle: "Privacy Policy",
    heroDesc: "We value your trust. This Privacy Policy details how we protect, handle, and respect your personal information.",
    lastUpdated: "Last Updated: June 2026",
    sections: [
      {
        title: "1. Information We Collect",
        desc: "We collect information to provide better services to our global customers. This includes:",
        bullets: [
          "Information you provide: When you fill out our contact or inquiry form, we collect your name, email address, phone number, company name, and the details of your inquiry.",
          "Device & Browser Data: When you browse our site, we automatically collect basic browser information, IP address, language preference, and page visit analytics to improve our design.",
          "Cookies: We use cookies to store your language preference and optimize session loading speeds."
        ],
        icon: Database
      },
      {
        title: "2. How We Use Your Information",
        desc: "The collected information is solely used for B2B relationship management and business operations:",
        bullets: [
          "To respond to your packaging inquiries, quotes, and product questions.",
          "To coordinate shipping and customs clearance for your orders with authorized logistics partners.",
          "To optimize website layout, page load speeds, and user experience.",
          "To send you periodic newsletters or product updates (only if you subscribed to our newsletter)."
        ],
        icon: Eye
      },
      {
        title: "3. Information Sharing & Third-Party Disclosure",
        desc: "We value your privacy. We strictly adhere to the following principles:",
        bullets: [
          "We do not sell, rent, or lease our customer database or your personal contact information to any third parties.",
          "We only share limited details (such as shipping address, contact name, and phone number) with verified shipping agents or customs brokers exclusively to deliver your orders.",
          "We may disclose information only if required by law or legal procedures."
        ],
        icon: Lock
      },
      {
        title: "4. Cookie Management",
        desc: "You can control and manage cookies through your browser settings. Declining cookies may limit some language switching or custom styling features, but the primary site will remain functional.",
        bullets: [],
        icon: Shield
      },
      {
        title: "5. Data Security",
        desc: "We employ industry-standard physical, technical, and administrative measures to secure all customer information, preventing unauthorized access, data loss, or alteration.",
        bullets: [],
        icon: FileText
      },
      {
        title: "6. Contact Us",
        desc: "If you have any questions about this Privacy Policy, your data, or compliance, please contact our compliance officer at:",
        bullets: [],
        icon: Mail
      }
    ],
    backToHome: "Back to Home",
    contactUs: "Contact Us"
  },
  es: {
    breadcrumb: "Cumplimiento y Seguridad",
    heroTitle: "Política de Privacidad",
    heroDesc: "Valoramos su confianza. Esta política de privacidad detalla cómo protegemos, gestionamos y respetamos su información personal.",
    lastUpdated: "Última actualización: Junio de 2026",
    sections: [
      {
        title: "1. Información que recopilamos",
        desc: "Recopilamos información para proporcionar mejores servicios a nuestros clientes globales. Esto incluye:",
        bullets: [
          "Información que usted proporciona: Cuando completa nuestro formulario de contacto o consulta, recopilamos su nombre, dirección de correo electrónico, número de teléfono, nombre de la empresa y los detalles de su consulta.",
          "Datos del dispositivo y navegador: Cuando navega por nuestro sitio, recopilamos automáticamente información básica del navegador, dirección IP, preferencia de idioma y análisis de visitas a la página para mejorar nuestro diseño.",
          "Cookies: Utilizamos cookies para almacenar su preferencia de idioma y optimizar la velocidad de carga de la sesión."
        ],
        icon: Database
      },
      {
        title: "2. Cómo utilizamos su información",
        desc: "La información recopilada se utiliza exclusivamente para la gestión de relaciones B2B y operaciones comerciales:",
        bullets: [
          "Para responder a sus consultas de embalaje, cotizaciones y preguntas sobre productos.",
          "Para coordinar el envío y el despacho de aduanas de sus pedidos con socios logísticos autorizados.",
          "Para optimizar el diseño del sitio web, las velocidades de carga de la página y la experiencia del usuario.",
          "Para enviarle boletines periódicos o actualizaciones de productos (solo si se suscribió a nuestro boletín)."
        ],
        icon: Eye
      },
      {
        title: "3. Intercambio de información y divulgación a terceros",
        desc: "Valoramos su privacidad. Nos adherimos estrictamente a los siguientes principios:",
        bullets: [
          "No vendemos, alquilamos ni arrendamos nuestra base de datos de clientes ni su información de contacto personal a terceros.",
          "Solo compartimos detalles limitados (como dirección de envío, nombre de contacto y número de teléfono) con agentes de envío verificados o agentes de aduanas exclusivamente para entregar sus pedidos.",
          "Solo divulgaremos información si lo requiere la ley o los procedimientos legales."
        ],
        icon: Lock
      },
      {
        title: "4. Gestión de Cookies",
        desc: "Puede controlar y gestionar las cookies a través de la configuración de su navegador. Rechazar las cookies puede limitar algunas funciones de cambio de idioma o estilo personalizado, pero el sitio principal seguirá funcionando.",
        bullets: [],
        icon: Shield
      },
      {
        title: "5. Seguridad de los datos",
        desc: "Empleamos medidas físicas, técnicas y administrativas estándar de la industria para proteger toda la información de los clientes, evitando el acceso no autorizado, la pérdida o alteración de datos.",
        bullets: [],
        icon: FileText
      },
      {
        title: "6. Contáctenos",
        desc: "Si tiene alguna pregunta sobre esta Política de Privacidad, sus datos o el cumplimiento, comuníquese con nuestro oficial de cumplimiento en:",
        bullets: [],
        icon: Mail
      }
    ],
    backToHome: "Volver al inicio",
    contactUs: "Contáctenos"
  },
  ar: {
    breadcrumb: "الامتثال والأمان",
    heroTitle: "سياسة الخصوصية",
    heroDesc: "نحن نقدر ثقتك. توضح سياسة الخصوصية هذه بالتفصيل كيف نحمي معلوماتك الشخصية ونتعامل معها ونحترمها.",
    lastUpdated: "آخر تحديث: يونيو 2026",
    sections: [
      {
        title: "1. المعلومات التي نجمعها",
        desc: "نقوم بجمع المعلومات لتقديم خدمات أفضل لعملائنا العالميين. هذا يشمل:",
        bullets: [
          "المعلومات التي تقدمها: عند ملء نموذج الاتصال أو الاستفسار، نجمع اسمك وعنوان بريدك الإلكتروني ورقم هاتفك واسم شركتك وتفاصيل استفسارك.",
          "بيانات الجهاز والمتصفح: عند تصفح موقعنا، نجمع تلقائيًا معلومات المتصفح الأساسية وعنوان IP وتفضيل اللغة وتحليلات زيارة الصفحة لتحسين تصميمنا.",
          "ملفات تعريف الارتباط: نستخدم ملفات تعريف الارتباط لتخزين تفضيل اللغة الخاص بك وتحسين سرعات تحميل الجلسة."
        ],
        icon: Database
      },
      {
        title: "2. كيف نستخدم معلوماتك",
        desc: "تُستخدم المعلومات التي نجمعها فقط لإدارة العلاقات بين الشركات (B2B) والعمليات التجارية:",
        bullets: [
          "للرد على استفسارات التعبئة والتغليف وعروض الأسعار وأسئلة المنتج.",
          "لتنسيق الشحن والتخليص الجمركي لطلباتك مع شركاء الخدمات اللوجستية المعتمدين.",
          "لتحسين تخطيط الموقع، وسرعات تحميل الصفحة، وتجربة المستخدم.",
          "لإرسال نشرات إخبارية دورية أو تحديثات المنتج إليك (فقط إذا كنت مشتركًا في نشرتنا الإخبارية)."
        ],
        icon: Eye
      },
      {
        title: "3. مشاركة المعلومات والإفصاح للغير",
        desc: "نحن نقدر خصوصيتك. نحن نلتزم بصرامة بالمبادئ التالية:",
        bullets: [
          "نحن لا نبيع أو نؤجر أو نؤجر قاعدة بيانات عملائنا أو معلومات الاتصال الشخصية الخاصة بك لأي أطراف ثالثة.",
          "نحن نشارك فقط تفاصيل محدودة (مثل عنوان الشحن، واسم جهة الاتصال، ورقم الهاتف) مع وكلاء الشحن المعتمدين أو مخلصي الجمارك حصريًا لتسليم طلباتك.",
          "قد نفصح عن المعلومات فقط إذا كان ذلك مطلوبًا بموجب القانون أو الإجراءات القانونية."
        ],
        icon: Lock
      },
      {
        title: "4. إدارة ملفات تعريف الارتباط",
        desc: "يمكنك التحكم في ملفات تعريف الارتباط وإدارتها من خلال إعدادات المتصفح الخاص بك. قد يؤدي رفض ملفات تعريف الارتباط إلى تقييد بعض ميزات تبديل اللغة أو التخصيص، ولكن الموقع الرئيسي سيظل يعمل.",
        bullets: [],
        icon: Shield
      },
      {
        title: "5. أمن البيانات",
        desc: "نحن نستخدم تدابير مادية وفنية وإدارية قياسية في الصناعة لتأمين جميع معلومات العملاء، ومنع الوصول غير المصرح به أو فقدان البيانات أو تعديلها.",
        bullets: [],
        icon: FileText
      },
      {
        title: "6. اتصل بنا",
        desc: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، أو بياناتك، أو الامتثال، فيرجى الاتصال بمسؤول الامتثال لدينا على:",
        bullets: [],
        icon: Mail
      }
    ],
    backToHome: "العودة إلى الرئيسية",
    contactUs: "اتصل بنا"
  }
};

export default async function PrivacyPolicyPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const content = TEXT[locale as "en" | "es" | "ar"] || TEXT.en;
  
  const setting = await prisma.systemSetting.findUnique({ where: { id: "global" } });
  const contactEmail = setting?.contactEmail || "info@hltpack.com";
  const contactPhone = setting?.contactPhone || "";

  const isRtl = locale === "ar";

  return (
    <div className="min-h-screen bg-white font-sans" dir={isRtl ? "rtl" : "ltr"}>
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#121A2F] flex flex-col items-center justify-center overflow-hidden min-h-[300px]">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121A2F] via-[#121A2F]/80 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              {content.breadcrumb}
            </span>
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight uppercase leading-tight">
            {content.heroTitle}
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            {content.heroDesc}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8">
          
          <div className="mb-10 flex justify-between items-center text-sm text-gray-500 border-b border-gray-100 pb-5">
            <span>{content.lastUpdated}</span>
            <Link href="/" className="text-[#F05A22] hover:underline flex items-center gap-1 font-semibold">
              &larr; {content.backToHome}
            </Link>
          </div>

          <div className="space-y-12">
            {content.sections.map((section, idx) => {
              const IconComponent = section.icon;
              return (
                <div key={idx} className="bg-gray-50/50 p-6 md:p-8 border border-gray-100 rounded-2xl transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F05A22]/10 border border-[#F05A22]/20 flex items-center justify-center shrink-0 mt-1">
                      <IconComponent className="w-5 h-5 text-[#F05A22]" strokeWidth={2} />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-[#121A2F]">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-light text-[15px] md:text-[16px]">
                        {section.desc}
                      </p>
                      
                      {section.bullets.length > 0 && (
                        <ul className="list-disc pl-5 pr-5 space-y-2.5 text-gray-600 font-light text-[14px] md:text-[15px]">
                          {section.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="leading-relaxed">{bullet}</li>
                          ))}
                        </ul>
                      )}

                      {/* Explicit Contact Info for Section 6 */}
                      {idx === 5 && (
                        <div className="pt-2 flex flex-col space-y-2 text-sm md:text-base font-semibold text-[#121A2F]">
                          <span className="flex items-center gap-2">
                            <span className="text-gray-400 font-light">Email:</span>
                            <a href={`mailto:${contactEmail}`} className="text-[#F05A22] hover:underline">{contactEmail}</a>
                          </span>
                          {contactPhone && (
                            <span className="flex items-center gap-2">
                              <span className="text-gray-400 font-light">Phone:</span>
                              <span className="text-gray-700">{contactPhone}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center border-t border-gray-100 pt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#121A2F] hover:bg-[#F05A22] px-8 py-4 text-[14px] font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-lg hover:shadow-[0_10px_20px_rgba(240,90,34,0.2)]"
            >
              {content.contactUs}
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
