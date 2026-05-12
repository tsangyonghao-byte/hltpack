"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { sendContactEmail } from "@/actions/contactActions";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteContent } from "@/i18n/siteContent";
import { useSearchParams } from "next/navigation";
import { useSystemSetting } from "@/components/layout/SystemSettingContext";
import { getTranslatedFallback } from "@/lib/localizedContent";

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
  const setting = useSystemSetting();
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
          ? locale === "ar"
            ? `مرحبا، اود ${inquiryType === "samples" ? "طلب عينات من" : "الحصول على عرض سعر لـ"} ${productName}.`
            : locale === "es"
              ? `Hola, me gustaria ${inquiryType === "samples" ? "solicitar muestras de" : "recibir una cotizacion para"} ${productName}.`
            : `Hello, I would like to ${inquiryType === "samples" ? "request samples for" : "get a quotation for"} ${productName}.`
          : "",
    };
  }, [locale, searchParams]);

  const [selectedInquiryType, setSelectedInquiryType] = useState(defaults.inquiryType);
  const isDetailedRFQ = ['quote', 'custom', 'samples'].includes(selectedInquiryType);
  const contactAddress =
    (locale === "zh" ? setting?.contactAddressZh : getTranslatedFallback(setting?.contactAddressEn, locale)) ||
    content.contact.address;
  const contactPhone = setting?.contactPhone || content.footer.phone;
  const contactEmail = setting?.contactEmail || content.footer.email;

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
        (e.target as HTMLFormElement).reset();
        
        // Scroll to the top of the form so they see the success message
        window.scrollTo({
          top: document.getElementById("contact-form-section")?.offsetTop || 0 - 100,
          behavior: "smooth"
        });

        // Reset after 8 seconds
        setTimeout(() => setIsSubmitted(false), 8000);
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
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Page Hero Banner */}
      <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-20 bg-[#111111] flex flex-col items-center justify-center overflow-hidden min-h-[350px] md:min-h-[450px]">
        {/* Background Image / Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity grayscale"
          style={{ backgroundImage: `url('${setting?.contactHeroImage?.trim() || "/images/factory/制袋车间/10006.png"}')` }}
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              {content.contact.breadcrumb}
            </span>
            <div className="w-8 h-[1px] bg-[#F05A22]"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white mb-6 tracking-tight uppercase leading-tight"
          >
            {content.contact.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {content.contact.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24 relative z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Left: Contact Information Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/3 space-y-6"
            >
              {/* HQ Card */}
              <div className="bg-white p-8 rounded-none border border-gray-200 group hover:border-[#F05A22] transition-colors duration-300">
                <div className="w-14 h-14 bg-[#111111] text-white rounded-none flex items-center justify-center mb-8 group-hover:bg-[#F05A22] transition-colors duration-300">
                  <MapPin className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[19px] font-bold text-[#1A1A1A] mb-4 tracking-wide">{content.contact.headquarters}</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-6">
                  {contactAddress.split("\n").map((line: string) => (
                    <span key={line}>{line}<br /></span>
                  ))}
                </p>
                <div className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-widest group-hover:text-[#F05A22] transition-colors">{content.contact.headquarterLabel}</div>
              </div>

              {/* Direct Contact Card */}
              <div className="bg-white p-8 rounded-none border border-gray-200">
                <div className="flex flex-col space-y-8">
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-gray-50 rounded-none flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                      <Phone className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{content.contact.phoneLabel}</h4>
                      <p className="text-[16px] font-bold text-[#1A1A1A] tracking-wide">{contactPhone}</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-gray-100"></div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-gray-50 rounded-none flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                      <Mail className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{content.contact.emailLabel}</h4>
                      <p className="text-[16px] font-bold text-[#1A1A1A] tracking-wide">{contactEmail}</p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-100"></div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-gray-50 rounded-none flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                      <Clock className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{content.contact.hoursLabel}</h4>
                      <p className="text-[16px] font-bold text-[#1A1A1A] tracking-wide">{content.contact.hoursValue}</p>
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
              id="contact-form-section"
            >
              <div className="bg-white p-8 md:p-12 rounded-none border border-gray-200 h-full">
                <div className="mb-10">
                  <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-3 tracking-tight">{content.contact.formTitle}</h2>
                  <p className="text-gray-500 font-light leading-relaxed">{content.contact.formDescription}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {isSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-emerald-50 border border-emerald-200 rounded-none mb-8 flex items-start gap-4"
                    >
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="text-[16px] font-bold text-emerald-800 mb-1">{content.contact.sent}</h4>
                        <p className="text-[14px] text-emerald-600">{content.contact.successMessage}</p>
                      </div>
                    </motion.div>
                  )}

                  {errorMessage && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-none text-sm border border-red-100">
                      {errorMessage}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="firstName" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{content.contact.firstName}</label>
                      <input 
                        type="text" 
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                        placeholder={content.contact.placeholders.firstName}
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="lastName" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{content.contact.lastName}</label>
                      <input 
                        type="text" 
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                        placeholder={content.contact.placeholders.lastName}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="email" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{content.contact.emailAddress}</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                        placeholder={content.contact.placeholders.email}
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="company" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{content.contact.companyName}</label>
                      <input 
                        type="text" 
                        id="company"
                        name="company"
                        className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                        placeholder={content.contact.placeholders.company}
                      />
                    </div>
                  </div>

                  <div className="border border-gray-200 bg-gray-50/50 p-6 md:p-8 space-y-6 rounded-none">
                    <div className="mb-8">
                      <h3 className="text-[16px] font-bold text-[#1A1A1A] tracking-wide mb-2">{formText.rfqTitle}</h3>
                      <p className="text-[13px] text-gray-500 font-light">{formText.rfqDescription}</p>
                    </div>

                    <input type="hidden" name="productId" value={defaults.productId} />
                    <input type="hidden" name="sourcePage" value={defaults.sourcePage || "/contact"} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="inquiryType" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{formText.inquiryType}</label>
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          required
                          value={selectedInquiryType}
                          onChange={(e) => setSelectedInquiryType(e.target.value)}
                          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] text-gray-700 rounded-none cursor-pointer"
                        >
                          <option value="">{content.contact.topics.default}</option>
                          <option value="quote">{formText.types.quote}</option>
                          <option value="samples">{formText.types.samples}</option>
                          <option value="custom">{formText.types.custom}</option>
                          <option value="support">{formText.types.support}</option>
                          <option value="other">{formText.types.other}</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="phone" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{formText.phone}</label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                          placeholder={formText.placeholders.phone}
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {isDetailedRFQ && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-6 overflow-hidden"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                            <label htmlFor="productName" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{formText.productName}</label>
                            <input
                              type="text"
                              id="productName"
                              name="productName"
                              defaultValue={defaults.productName}
                              className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                              placeholder={formText.placeholders.productName}
                            />
                          </div>
                          <div className="space-y-3">
                            <label htmlFor="quantity" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{formText.quantity}</label>
                            <input
                              type="text"
                              id="quantity"
                              name="quantity"
                              className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                              placeholder={formText.placeholders.quantity}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label htmlFor="bagType" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{formText.bagType}</label>
                            <input
                              type="text"
                              id="bagType"
                              name="bagType"
                              className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                              placeholder={formText.placeholders.bagType}
                            />
                          </div>
                          <div className="space-y-3">
                            <label htmlFor="material" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{formText.material}</label>
                            <input
                              type="text"
                              id="material"
                              name="material"
                              className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                              placeholder={formText.placeholders.material}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label htmlFor="application" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{formText.application}</label>
                            <input
                              type="text"
                              id="application"
                              name="application"
                              className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                              placeholder={formText.placeholders.application}
                            />
                          </div>
                          <div className="space-y-3">
                            <label htmlFor="targetMarket" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{formText.targetMarket}</label>
                            <input
                              type="text"
                              id="targetMarket"
                              name="targetMarket"
                              className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                              placeholder={formText.placeholders.targetMarket}
                            />
                          </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-3">
                        <label htmlFor="subject" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{content.contact.subject}</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          value={selectedInquiryType ? formText.types[selectedInquiryType as keyof typeof formText.types] || selectedInquiryType : ""}
                          onChange={() => {}}
                          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none text-[15px] rounded-none"
                          placeholder={content.contact.topics.default}
                        />
                      </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="message" className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">{content.contact.message}</label>
                    <textarea 
                      id="message"
                      name="message"
                      required
                      rows={4}
                      defaultValue={defaults.message}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#F05A22] transition-colors outline-none resize-none text-[15px] rounded-none"
                      placeholder={content.contact.placeholders.message}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || isSubmitted}
                    className={clsx(
                      "w-full flex items-center justify-center py-4 rounded-none font-bold text-[14px] uppercase tracking-widest transition-all duration-300",
                      isSubmitted 
                        ? "bg-[#1A1A1A] text-white cursor-default" 
                        : "bg-[#F05A22] text-white hover:bg-[#D44A18]"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-3">
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                         {content.contact.sending}
                      </span>
                    ) : isSubmitted ? (
                      <span className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5" />
                        {content.contact.sent}
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
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

    </div>
  );
}
