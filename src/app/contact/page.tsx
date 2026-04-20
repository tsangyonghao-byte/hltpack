"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { sendContactEmail } from "@/actions/contactActions";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";
import { useSearchParams } from "next/navigation";

const rfqText = {
  en: {
    productName: "Product Name",
    inquiryType: "Inquiry Type *",
    phone: "Phone Number",
    bagType: "Bag Type",
    material: "Material Structure",
    quantity: "Estimated Quantity",
    application: "Application",
    targetMarket: "Target Market",
    sourcePage: "Source Page",
    types: {
      quote: "Request a Quote",
      samples: "Request Samples",
      custom: "Custom Solution",
      support: "Technical Support",
      other: "Other Inquiry",
    },
    placeholders: {
      phone: "+86 138 0000 0000",
      productName: "Selected product",
      bagType: "e.g. Stand-up pouch / Flat bottom pouch",
      material: "e.g. PET/PE, Mono PE",
      quantity: "e.g. 50,000 pcs",
      application: "e.g. Coffee, pet food, snacks",
      targetMarket: "e.g. Europe, Middle East, USA",
    },
    rfqTitle: "RFQ Information",
    rfqDescription: "Tell us your packaging requirements so our sales team can prepare a faster and more accurate quotation.",
  },
  zh: {
    productName: "产品名称",
    inquiryType: "咨询类型 *",
    phone: "联系电话",
    bagType: "袋型",
    material: "材质结构",
    quantity: "预估数量",
    application: "应用场景",
    targetMarket: "目标市场",
    sourcePage: "来源页面",
    types: {
      quote: "询价",
      samples: "索样",
      custom: "定制方案",
      support: "技术支持",
      other: "其他咨询",
    },
    placeholders: {
      phone: "例如：+86 138 0000 0000",
      productName: "自动带入的产品名称",
      bagType: "例如：自立袋 / 八边封袋",
      material: "例如：PET/PE、Mono PE",
      quantity: "例如：50000 个",
      application: "例如：咖啡、宠物食品、零食",
      targetMarket: "例如：欧洲、中东、美国",
    },
    rfqTitle: "询盘信息",
    rfqDescription: "补充越完整，我们越能更快给你准确报价。",
  },
  es: {
    productName: "Nombre del producto",
    inquiryType: "Tipo de consulta *",
    phone: "Teléfono",
    bagType: "Tipo de bolsa",
    material: "Estructura del material",
    quantity: "Cantidad estimada",
    application: "Aplicación",
    targetMarket: "Mercado objetivo",
    sourcePage: "Página de origen",
    types: {
      quote: "Solicitar cotización",
      samples: "Solicitar muestras",
      custom: "Solución personalizada",
      support: "Soporte técnico",
      other: "Otra consulta",
    },
    placeholders: {
      phone: "+86 138 0000 0000",
      productName: "Producto seleccionado",
      bagType: "p. ej. stand-up pouch",
      material: "p. ej. PET/PE, Mono PE",
      quantity: "p. ej. 50.000 unidades",
      application: "p. ej. café, pet food, snacks",
      targetMarket: "p. ej. Europa, Medio Oriente, EE.UU.",
    },
    rfqTitle: "Información RFQ",
    rfqDescription: "Cuantos más detalles nos dé, más rápido podremos preparar una cotización precisa.",
  },
  ar: {
    productName: "اسم المنتج",
    inquiryType: "نوع الاستفسار *",
    phone: "رقم الهاتف",
    bagType: "نوع الكيس",
    material: "تركيب المادة",
    quantity: "الكمية المتوقعة",
    application: "الاستخدام",
    targetMarket: "السوق المستهدف",
    sourcePage: "صفحة المصدر",
    types: {
      quote: "طلب عرض سعر",
      samples: "طلب عينات",
      custom: "حل مخصص",
      support: "دعم فني",
      other: "استفسار آخر",
    },
    placeholders: {
      phone: "+86 138 0000 0000",
      productName: "اسم المنتج المحدد",
      bagType: "مثال: كيس قائم",
      material: "مثال: PET/PE, Mono PE",
      quantity: "مثال: 50000 قطعة",
      application: "مثال: قهوة، أغذية الحيوانات",
      targetMarket: "مثال: أوروبا، الشرق الأوسط",
    },
    rfqTitle: "معلومات طلب العرض",
    rfqDescription: "كلما زادت التفاصيل، تمكنا من إعداد عرض سعر أدق وبشكل أسرع.",
  },
} as const;

export default function ContactPage() {
  const { locale } = useLanguage();
  const content = siteContent[locale as keyof typeof siteContent] || siteContent.en;
  const searchParams = useSearchParams();
  const formText = rfqText[locale as keyof typeof rfqText] || rfqText.en;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const defaults = useMemo(() => {
    const inquiryType = searchParams.get("type") || "";
    const productName = searchParams.get("product") || "";
    const productId = searchParams.get("productId") || "";
    const sourcePage = searchParams.get("source") || "";

    return {
      inquiryType,
      productName,
      productId,
      sourcePage,
      message:
        productName && inquiryType
          ? `Hello, I would like to ${inquiryType === "samples" ? "request samples for" : "get a quotation for"} ${productName}.`
          : "",
    };
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    // Combine first and last name
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const company = formData.get("company") as string;
    const originalMessage = formData.get("message") as string;
    
    // Prepare the final payload for the server action
    const emailData = new FormData();
    emailData.append("name", `${firstName} ${lastName}`);
    emailData.append("email", formData.get("email") as string);
    emailData.append("phone", (formData.get("phone") as string) || "");
    emailData.append("company", company || "");
    emailData.append("subject", (formData.get("subject") as string) || "");
    emailData.append("inquiryType", (formData.get("inquiryType") as string) || "");
    emailData.append("productId", (formData.get("productId") as string) || "");
    emailData.append("productName", (formData.get("productName") as string) || "");
    emailData.append("bagType", (formData.get("bagType") as string) || "");
    emailData.append("material", (formData.get("material") as string) || "");
    emailData.append("quantity", (formData.get("quantity") as string) || "");
    emailData.append("application", (formData.get("application") as string) || "");
    emailData.append("targetMarket", (formData.get("targetMarket") as string) || "");
    emailData.append("sourcePage", (formData.get("sourcePage") as string) || window.location.href);
    emailData.append("message", originalMessage);

    try {
      const result = await sendContactEmail(emailData);
      
      if (result.success) {
        setIsSubmitted(true);
        // Reset after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
        (e.target as HTMLFormElement).reset();
      } else {
        setErrorMessage(result.error || content.contact.errors.failed);
      }
    } catch (error) {
      setErrorMessage(content.contact.errors.unexpected);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#1E293B] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://www.logospack.com.hk/cache/img/cf1f784f1e2d0010ea43d775a6884a3a190f292bbf73.jpg')" }} // Factory/Map placeholder
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#1E293B]/80"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {content.contact.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light"
          >
            {content.contact.heroDescription}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider"
          >
            <Link href="/" className="hover:text-white transition-colors">{content.footer.home}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#F05A22]">{content.contact.breadcrumb}</span>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24 relative z-20 -mt-10 md:-mt-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left: Contact Information Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/3 space-y-6"
            >
              {/* HQ Card */}
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="w-14 h-14 bg-[#F05A22]/10 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-[#F05A22]" />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-4">{content.contact.headquarters}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.contact.address.split("\n").map((line: string) => (
                    <span key={line}>{line}<br /></span>
                  ))}
                </p>
                <div className="text-sm font-bold text-[#F05A22] uppercase tracking-wider">{content.contact.headquarterLabel}</div>
              </div>

              {/* Direct Contact Card */}
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{content.contact.phoneLabel}</h4>
                      <p className="text-lg font-bold text-[#1E293B]">+86 752 1234 5678</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-gray-100"></div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{content.contact.emailLabel}</h4>
                      <p className="text-lg font-bold text-[#1E293B]">info@hailitong.com</p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-100"></div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{content.contact.hoursLabel}</h4>
                      <p className="text-lg font-bold text-[#1E293B]">{content.contact.hoursValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-2/3"
            >
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 h-full">
                <div className="mb-8">
                  <h2 className="text-3xl font-extrabold text-[#1E293B] mb-2">{content.contact.formTitle}</h2>
                  <p className="text-gray-500">{content.contact.formDescription}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                      {errorMessage}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-bold text-[#1E293B]">{content.contact.firstName}</label>
                      <input 
                        type="text" 
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                        placeholder={content.contact.placeholders.firstName}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-bold text-[#1E293B]">{content.contact.lastName}</label>
                      <input 
                        type="text" 
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                        placeholder={content.contact.placeholders.lastName}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-[#1E293B]">{content.contact.emailAddress}</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                        placeholder={content.contact.placeholders.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-bold text-[#1E293B]">{content.contact.companyName}</label>
                      <input 
                        type="text" 
                        id="company"
                        name="company"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                        placeholder={content.contact.placeholders.company}
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5 md:p-6 space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-[#1E293B]">{formText.rfqTitle}</h3>
                      <p className="text-sm text-gray-500 mt-1">{formText.rfqDescription}</p>
                    </div>

                    <input type="hidden" name="productId" value={defaults.productId} />
                    <input type="hidden" name="sourcePage" value={defaults.sourcePage || "/contact"} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="inquiryType" className="text-sm font-bold text-[#1E293B]">{formText.inquiryType}</label>
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          required
                          defaultValue={defaults.inquiryType}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none text-gray-700"
                        >
                          <option value="">{content.contact.topics.default}</option>
                          <option value="quote">{formText.types.quote}</option>
                          <option value="samples">{formText.types.samples}</option>
                          <option value="custom">{formText.types.custom}</option>
                          <option value="support">{formText.types.support}</option>
                          <option value="other">{formText.types.other}</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold text-[#1E293B]">{formText.phone}</label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                          placeholder={formText.placeholders.phone}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="productName" className="text-sm font-bold text-[#1E293B]">{formText.productName}</label>
                        <input
                          type="text"
                          id="productName"
                          name="productName"
                          defaultValue={defaults.productName}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                          placeholder={formText.placeholders.productName}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="quantity" className="text-sm font-bold text-[#1E293B]">{formText.quantity}</label>
                        <input
                          type="text"
                          id="quantity"
                          name="quantity"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                          placeholder={formText.placeholders.quantity}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="bagType" className="text-sm font-bold text-[#1E293B]">{formText.bagType}</label>
                        <input
                          type="text"
                          id="bagType"
                          name="bagType"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                          placeholder={formText.placeholders.bagType}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="material" className="text-sm font-bold text-[#1E293B]">{formText.material}</label>
                        <input
                          type="text"
                          id="material"
                          name="material"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                          placeholder={formText.placeholders.material}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="application" className="text-sm font-bold text-[#1E293B]">{formText.application}</label>
                        <input
                          type="text"
                          id="application"
                          name="application"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                          placeholder={formText.placeholders.application}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="targetMarket" className="text-sm font-bold text-[#1E293B]">{formText.targetMarket}</label>
                        <input
                          type="text"
                          id="targetMarket"
                          name="targetMarket"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                          placeholder={formText.placeholders.targetMarket}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-bold text-[#1E293B]">{content.contact.subject}</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        defaultValue={
                          defaults.inquiryType
                            ? formText.types[defaults.inquiryType as keyof typeof formText.types] || defaults.inquiryType
                            : ""
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none"
                        placeholder={content.contact.topics.default}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-[#1E293B]">{content.contact.message}</label>
                    <textarea 
                      id="message"
                      name="message"
                      required
                      rows={5}
                      defaultValue={defaults.message}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F05A22]/20 focus:border-[#F05A22] transition-colors outline-none resize-none"
                      placeholder={content.contact.placeholders.message}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || isSubmitted}
                    className={clsx(
                      "w-full flex items-center justify-center py-4 rounded-xl font-bold text-[16px] uppercase tracking-wider transition-all duration-300",
                      isSubmitted 
                        ? "bg-emerald-500 text-white cursor-default" 
                        : "bg-[#1E293B] text-white hover:bg-[#F05A22] hover:shadow-lg"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                         {content.contact.sending}
                      </span>
                    ) : isSubmitted ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        {content.contact.sent}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        {content.contact.send}
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[500px] bg-gray-200 relative">
        {/* Placeholder for actual Google Maps / Baidu Maps iframe */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#1E293B]">
          <div className="text-center text-white/50">
            <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl font-bold tracking-widest uppercase">{content.contact.mapTitle}</p>
            <p className="text-sm mt-2">{content.contact.mapDescription}</p>
          </div>
        </div>
      </section>

    </div>
  );
}
