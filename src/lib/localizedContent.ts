type Locale = string | null | undefined;

const KNOWN_FALLBACK_TRANSLATIONS = {
  es: {
    "Innovative Packaging": "Empaque innovador",
    "SMART DESIGN": "DISENO INTELIGENTE",
    "Discover our eco-friendly pouch designs that reduce carbon footprint without compromising quality or shelf life.":
      "Descubra nuestros diseños de bolsas ecologicas que reducen la huella de carbono sin comprometer la calidad ni la vida util.",
    "Circular Economy Solutions": "Soluciones de economia circular",
    "100% RECYCLABLE": "100% RECICLABLE",
    "High-barrier packaging engineered for a sustainable future, ensuring maximum freshness.":
      "Empaques de alta barrera diseñados para un futuro sostenible, garantizando la maxima frescura.",
    "Leak-proof Engineering": "Ingenieria a prueba de fugas",
    "ADVANCED SAFETY": "SEGURIDAD AVANZADA",
    "Secure sealing and superior puncture resistance for liquids and heavy products.":
      "Sellado seguro y resistencia superior a perforaciones para liquidos y productos pesados.",
    "Ready-to-eat Retort Pouches": "Bolsas retort listas para consumir",
    "CONVENIENCE FIRST": "COMODIDAD PRIMERO",
    "High-temperature resistant pouches perfect for microwavable and ready meals.":
      "Bolsas resistentes a altas temperaturas, perfectas para comidas listas y aptas para microondas.",
    "Less Material, More Value": "Menos material, mas valor",
    "OPTIMIZED PACKAGING": "EMPAQUE OPTIMIZADO",
    "Reduce plastic usage with our lightweight yet durable packaging structures.":
      "Reduzca el uso de plastico con nuestras estructuras de empaque ligeras pero duraderas.",
    "How to Choose the Right Food Packaging Bag?": "Como elegir la bolsa adecuada para empaque de alimentos?",
    "Choosing the right food packaging bag is crucial for preserving product quality, extending shelf life, and attracting consumers. This guide covers material selection, barrier properties, and printing considerations to help you make the best choice.":
      "Elegir la bolsa adecuada para alimentos es clave para preservar la calidad del producto, extender la vida util y atraer consumidores. Esta guia cubre seleccion de materiales, propiedades de barrera e impresion para ayudarle a tomar la mejor decision.",
    "What are the Advantages of Transparent Plastic Bags?": "Cuales son las ventajas de las bolsas plasticas transparentes?",
    "Transparent plastic bags offer high visibility, allowing consumers to see the product inside. This builds trust and enhances the visual appeal of fresh produce and retail goods.":
      "Las bolsas plasticas transparentes ofrecen alta visibilidad y permiten ver el producto en su interior. Esto genera confianza y mejora el atractivo visual de productos frescos y minoristas.",
    "The Benefits of Eco-Friendly Packaging Bags": "Los beneficios de las bolsas de empaque ecologicas",
    "Eco-friendly packaging is becoming the new standard. Discover how biodegradable and recyclable materials can reduce your carbon footprint and appeal to modern consumers.":
      "El empaque ecologico se esta convirtiendo en el nuevo estandar. Descubra como los materiales biodegradables y reciclables pueden reducir su huella de carbono y atraer a los consumidores modernos.",
    "Understanding Aluminum Foil Bags": "Comprender las bolsas de papel de aluminio",
    "Aluminum foil bags provide the ultimate barrier against light, oxygen, and moisture. Learn why they are the top choice for coffee, tea, and sensitive electronics.":
      "Las bolsas de papel de aluminio ofrecen la maxima barrera contra la luz, el oxigeno y la humedad. Descubra por que son la mejor opcion para cafe, te y productos electronicos sensibles.",
    "What is a Retort Pouch?": "Que es un pouch retort?",
    "Retort pouches are designed to withstand high temperatures during sterilization. They are lightweight alternatives to cans and glass jars for ready-to-eat meals.":
      "Los pouches retort estan disenados para soportar altas temperaturas durante la esterilizacion. Son una alternativa ligera a las latas y frascos de vidrio para comidas listas para consumir.",
    "Custom Printed Pouch Design Guidelines": "Guia de diseno para pouches impresos personalizados",
    "A great design makes your product pop. Learn the basics of preparing your artwork for rotogravure printing to ensure vibrant colors and sharp details.":
      "Un gran diseno hace que su producto destaque. Aprenda los conceptos basicos para preparar su arte para impresion rotograbada y lograr colores vivos y detalles nítidos.",
    "Vacuum Bags: Extending Shelf Life": "Bolsas al vacio: ampliar la vida util",
    "By removing air from the package, vacuum bags significantly slow down the growth of bacteria and fungi, keeping meat, cheese, and nuts fresh for longer.":
      "Al eliminar el aire del envase, las bolsas al vacio ralentizan de forma notable el crecimiento de bacterias y hongos, manteniendo la carne, el queso y los frutos secos frescos durante mas tiempo.",
    "The Rise of Stand-Up Pouches with Zippers": "El auge de los pouches stand-up con zipper",
    "Stand-up pouches dominate the retail space due to their convenience and shelf presence. The addition of a resealable zipper adds immense value for consumers.":
      "Los pouches stand-up dominan el espacio minorista por su practicidad y su fuerte presencia en estanteria. La incorporacion de un zipper resellable aporta un gran valor para los consumidores.",
    "How to Measure a Packaging Bag Correctly?": "Como medir correctamente una bolsa de empaque?",
    "Accurate measurements are the first step to creating the perfect custom bag. Learn how to measure width, length, and gussets properly.":
      "Las medidas precisas son el primer paso para crear la bolsa personalizada perfecta. Aprenda a medir correctamente el ancho, el largo y los fuelles.",
    "No.51, Lan'er Road, Longxin Community, Baolong Street, Longgang District, Shenzhen, China":
      "No. 51, Lan'er Road, comunidad Longxin, calle Baolong, distrito Longgang, Shenzhen, China",
    "No.51, Lan'er Road, Longxin Community,\nBaolong Street, Longgang District,\nShenzhen, Guangdong, China":
      "No. 51, Lan'er Road, comunidad Longxin,\ncalle Baolong, distrito Longgang,\nShenzhen, Guangdong, China",
    "FAQ": "Preguntas frecuentes",
    "Header Card Mask Bag": "Bolsa para mascarillas con tarjeta colgante",
    "Self Adhesive Header Card Mask Bag": "Bolsa para mascarillas con tarjeta colgante autoadhesiva",
    "Mask Packaging Bag": "Bolsa de empaque para mascarillas",
    "Resealable Mask Bag": "Bolsa resellable para mascarillas",
    "Product Spout Bag": "Bolsa con boquilla para productos",
    "Spout Storage Bag": "Bolsa de almacenamiento con boquilla",
    "Beverage Spout Bag": "Bolsa para bebidas con boquilla",
    "Clear Spout Bag": "Bolsa transparente con boquilla",
    "Flat Bottom Resealable Bag": "Bolsa resellable de fondo plano",
    "Medical Mask Bags": "Bolsas para mascarillas medicas",
    "Medical Mask Packaging Bag": "Bolsa de empaque para mascarillas medicas",
    "Side Gusset Tea Packaging Bag": "Bolsa para te con fuelle lateral",
    "Side Gusset Tea Bag": "Bolsa de te con fuelle lateral",
    "Side Gusset Tea Packaging Pouch": "Bolsa para te con fuelle lateral",
    "High Barrier Tea Packaging Bag": "Bolsa de alta barrera para empaque de te",
    "High Barrier Tea Packaging Pouch": "Bolsa de alta barrera para empaque de te",
    "Metallized PLA Film - VMPLA": "Pelicula PLA metalizada - VMPLA",
    "High-Barrier ALOx-BOPP Film (Recyclable) - ALOx-BOPP": "Pelicula ALOx-BOPP de alta barrera (reciclable) - ALOx-BOPP",
    "Biodegradable PLA-AlOx Film - PLA-AlOx": "Pelicula PLA-AlOx biodegradable - PLA-AlOx",
    "Header Card": "tarjeta colgante",
    "Self Adhesive": "autoadhesivo",
    "Mask Packaging": "empaque para mascarillas",
    "Bubble Bag": "bolsa burbuja",
    "Side Gusset": "fuelle lateral",
    "High Barrier": "alta barrera",
    "Tea Packaging Bag": "bolsa para empaque de te",
    "Tea Packaging Pouch": "bolsa para empaque de te",
    "Transparent": "transparente",
    "Metallized": "metalizado",
    "High-Barrier": "alta barrera",
    "Biodegradable": "biodegradable",
    "Recyclable": "reciclable",
    "Flexible Packaging": "envases flexibles",
    "Packaging": "empaque",
    "Pouches": "bolsas",
    "Pouch": "bolsa",
    "Bags": "bolsas",
    "Bag": "bolsa",
    "Film": "pelicula",
    "Storage": "almacenamiento",
    "Beverage": "bebidas",
    "Spout": "boquilla",
    "Medical": "medico",
    "Mask": "mascarilla",
    "Tea": "te",
    "Quality": "calidad",
  },
  ar: {
    "Innovative Packaging": "تغليف مبتكر",
    "SMART DESIGN": "تصميم ذكي",
    "Discover our eco-friendly pouch designs that reduce carbon footprint without compromising quality or shelf life.":
      "اكتشف تصاميم الاكياس الصديقة للبيئة التي تقلل البصمة الكربونية دون المساس بالجودة او مدة الصلاحية.",
    "Circular Economy Solutions": "حلول الاقتصاد الدائري",
    "100% RECYCLABLE": "قابل لاعادة التدوير 100%",
    "High-barrier packaging engineered for a sustainable future, ensuring maximum freshness.":
      "حلول تغليف عالية الحاجز مصممة لمستقبل مستدام وتضمن اقصى درجات الانتعاش.",
    "Leak-proof Engineering": "هندسة مانعة للتسرب",
    "ADVANCED SAFETY": "سلامة متقدمة",
    "Secure sealing and superior puncture resistance for liquids and heavy products.":
      "اغلاق محكم ومقاومة عالية للثقب للسوائل والمنتجات الثقيلة.",
    "Ready-to-eat Retort Pouches": "اكياس ريتورت جاهزة للاكل",
    "CONVENIENCE FIRST": "الراحة اولا",
    "High-temperature resistant pouches perfect for microwavable and ready meals.":
      "اكياس مقاومة لدرجات الحرارة العالية ومثالية للوجبات الجاهزة والقابلة للتسخين بالميكروويف.",
    "Less Material, More Value": "مواد اقل وقيمة اكبر",
    "OPTIMIZED PACKAGING": "تغليف محسن",
    "Reduce plastic usage with our lightweight yet durable packaging structures.":
      "قلل استخدام البلاستيك عبر هياكل تغليف خفيفة الوزن ومتينة في الوقت نفسه.",
    "How to Choose the Right Food Packaging Bag?": "كيف تختار كيس تغليف الطعام المناسب؟",
    "Choosing the right food packaging bag is crucial for preserving product quality, extending shelf life, and attracting consumers. This guide covers material selection, barrier properties, and printing considerations to help you make the best choice.":
      "اختيار كيس تغليف الطعام المناسب مهم للحفاظ على جودة المنتج واطالة مدة الصلاحية وجذب المستهلكين. يغطي هذا الدليل اختيار المواد وخصائص العزل واعتبارات الطباعة لمساعدتك على اتخاذ القرار الافضل.",
    "Choosing the right food packaging bag is crucial for preserving product quality, extending shelf life, and attracting consumers. This guide covers material selection, barrier properties, and printing options.":
      "اختيار كيس تغليف الطعام المناسب مهم للحفاظ على جودة المنتج واطالة مدة الصلاحية وجذب المستهلكين. يغطي هذا الدليل اختيار المواد وخصائص العزل وخيارات الطباعة.",
    "What are the Advantages of Transparent Plastic Bags?": "ما مزايا الاكياس البلاستيكية الشفافة؟",
    "Transparent plastic bags offer high visibility, allowing consumers to see the product inside. This builds trust and enhances the visual appeal of fresh produce and retail goods.":
      "توفر الاكياس البلاستيكية الشفافة رؤية عالية تسمح للمستهلكين برؤية المنتج في الداخل. وهذا يعزز الثقة ويحسن الجاذبية البصرية للمنتجات الطازجة والسلع المعروضة للبيع.",
    "The Benefits of Eco-Friendly Packaging Bags": "فوائد اكياس التغليف الصديقة للبيئة",
    "Eco-friendly packaging is becoming the new standard. Discover how biodegradable and recyclable materials can reduce your carbon footprint and appeal to modern consumers.":
      "اصبح التغليف الصديق للبيئة هو المعيار الجديد. اكتشف كيف يمكن للمواد القابلة للتحلل واعادة التدوير ان تقلل بصمتك الكربونية وتجذب المستهلكين المعاصرين.",
    "Understanding Aluminum Foil Bags": "فهم اكياس رقائق الالمنيوم",
    "Aluminum foil bags provide the ultimate barrier against light, oxygen, and moisture. Learn why they are the top choice for coffee, tea, and sensitive electronics.":
      "توفر اكياس رقائق الالمنيوم حاجزا مثاليا ضد الضوء والاكسجين والرطوبة. تعرف على سبب كونها الخيار الافضل للقهوة والشاي والالكترونيات الحساسة.",
    "What is a Retort Pouch?": "ما هو كيس الريتورت؟",
    "Retort pouches are designed to withstand high temperatures during sterilization. They are lightweight alternatives to cans and glass jars for ready-to-eat meals.":
      "تم تصميم اكياس الريتورت لتحمل درجات الحرارة العالية اثناء التعقيم. وهي بديل خفيف للعلب المعدنية والعبوات الزجاجية للوجبات الجاهزة.",
    "Custom Printed Pouch Design Guidelines": "إرشادات تصميم الاكياس المطبوعة حسب الطلب",
    "A great design makes your product pop. Learn the basics of preparing your artwork for rotogravure printing to ensure vibrant colors and sharp details.":
      "يجعل التصميم الجيد منتجك اكثر بروزا. تعرف على اساسيات تجهيز التصميم للطباعة الروتوغرافية لضمان الوان قوية وتفاصيل واضحة.",
    "Vacuum Bags: Extending Shelf Life": "اكياس التفريغ: اطالة مدة الصلاحية",
    "By removing air from the package, vacuum bags significantly slow down the growth of bacteria and fungi, keeping meat, cheese, and nuts fresh for longer.":
      "من خلال ازالة الهواء من العبوة، تبطئ اكياس التفريغ نمو البكتيريا والفطريات بشكل كبير، مما يحافظ على اللحوم والجبن والمكسرات طازجة لفترة اطول.",
    "The Rise of Stand-Up Pouches with Zippers": "صعود الاكياس القائمة المزودة بسحاب",
    "Stand-up pouches dominate the retail space due to their convenience and shelf presence. The addition of a resealable zipper adds immense value for consumers.":
      "تسيطر الاكياس القائمة على مساحات البيع بالتجزئة بفضل سهولة استخدامها وحضورها على الرفوف. كما تضيف خاصية السحاب القابل لاعادة الاغلاق قيمة كبيرة للمستهلكين.",
    "How to Measure a Packaging Bag Correctly?": "كيف تقيس كيس التغليف بشكل صحيح؟",
    "Accurate measurements are the first step to creating the perfect custom bag. Learn how to measure width, length, and gussets properly.":
      "القياسات الدقيقة هي الخطوة الاولى لصناعة كيس مخصص مثالي. تعلم كيفية قياس العرض والطول والجوانب بشكل صحيح.",
    "Header Card Mask Bag": "كيس كمامات ببطاقة تعليق",
    "Self Adhesive Header Card Mask Bag": "كيس كمامات ببطاقة تعليق ذاتية اللصق",
    "Mask Packaging Bag": "كيس تغليف كمامات",
    "Resealable Mask Bag": "كيس كمامات قابل لاعادة الاغلاق",
    "Product Spout Bag": "كيس منتج مزود بفوهة",
    "Spout Storage Bag": "كيس تخزين بفوهة",
    "Beverage Spout Bag": "كيس مشروبات بفوهة",
    "Clear Spout Bag": "كيس شفاف بفوهة",
    "Flat Bottom Resealable Bag": "كيس بقاع مسطح قابل لاعادة الاغلاق",
    "Medical Mask Bags": "اكياس الكمامات الطبية",
    "Medical Mask Packaging Bag": "كيس تغليف كمامات طبية",
    "Side Gusset": "ثنيات جانبية",
    "High Barrier": "عالي الحاجز",
    "Tea Packaging Bag": "كيس تغليف شاي",
    "Tea Packaging Pouch": "كيس تغليف شاي",
    "Side Gusset Tea Packaging Bag": "كيس شاي بثنيات جانبية",
    "Side Gusset Tea Bag": "كيس شاي بثنيات جانبية",
    "Side Gusset Tea Packaging Pouch": "كيس شاي بثنيات جانبية",
    "High Barrier Tea Packaging Bag": "كيس تغليف شاي عالي الحاجز",
    "High Barrier Tea Packaging Pouch": "كيس تغليف شاي عالي الحاجز",
    "Tea": "شاي",
    "- High quality customized packaging solutions.": "- حلول تغليف مخصصة عالية الجودة.",
    "Metallized PLA Film - VMPLA": "فيلم PLA معدني - VMPLA",
    "High-Barrier ALOx-BOPP Film (Recyclable) - ALOx-BOPP": "فيلم ALOx-BOPP عالي الحاجز (قابل لاعادة التدوير) - ALOx-BOPP",
    "Biodegradable PLA-AlOx Film - PLA-AlOx": "فيلم PLA-AlOx قابل للتحلل - PLA-AlOx",
    "Medical": "طبي",
    "Mask": "كمامات",
    "Packaging": "تغليف",
    "Header Card": "بطاقة تعليق",
    "Self Adhesive": "ذاتي اللصق",
    "Bubble": "فقاعي",
    "Transparent": "شفاف",
    "Metallized": "معدني",
    "High-Barrier": "عالي الحاجز",
    "Biodegradable": "قابل للتحلل",
    "Recyclable": "قابل لاعادة التدوير",
    "Flexible Packaging": "التغليف المرن",
    "Pouches": "اكياس",
    "Pouch": "كيس",
    "Bags": "اكياس",
    "Bag": "كيس",
    "Film": "فيلم",
    "Storage": "تخزين",
    "Beverage": "مشروبات",
    "Spout": "بفوهة",
    "Quality": "جودة",
    "No.51, Lan'er Road, Longxin Community, Baolong Street, Longgang District, Shenzhen, China":
      "رقم 51، طريق لانئر، مجتمع لونغشين، شارع باولونغ، منطقة لونغقانغ، شنتشن، الصين",
    "No.51, Lan'er Road, Longxin Community,\nBaolong Street, Longgang District,\nShenzhen, Guangdong, China":
      "رقم 51، طريق لانئر، مجتمع لونغشين،\nشارع باولونغ، منطقة لونغقانغ،\nشنتشن، قوانغدونغ، الصين",
    "FAQ": "الاسئلة الشائعة",
  },
} as const;

function getLocaleSuffix(locale: Locale) {
  if (locale === "es") return "Es";
  if (locale === "ar") return "Ar";
  return "";
}

function replaceKnownTranslations(value: string, locale: Locale) {
  if (locale !== "es" && locale !== "ar") return value;
  const translations = KNOWN_FALLBACK_TRANSLATIONS[locale];
  if (!translations) return value;

  if (translations[value as keyof typeof translations]) {
    return translations[value as keyof typeof translations];
  }

  return Object.entries(translations)
    .sort((a, b) => b[0].length - a[0].length)
    .reduce((text, [source, target]) => text.split(source).join(target), value);
}

export function getTranslatedFallback<T>(value: T, locale: Locale): T {
  if (typeof value !== "string") return value;
  const normalized = value.trim();
  if (!normalized || (locale !== "es" && locale !== "ar")) return normalized as T;
  return replaceKnownTranslations(normalized, locale) as T;
}

export function getLocalizedValue<T extends Record<string, any>>(
  record: T,
  field: string,
  locale: Locale
) {
  const suffix = getLocaleSuffix(locale);
  const localizedField = suffix ? `${field}${suffix}` : field;
  const localizedValue = record[localizedField];

  if (typeof localizedValue === "string" && localizedValue.trim()) {
    return localizedValue.trim();
  }

  const fallbackValue = record[field];
  return getTranslatedFallback(fallbackValue, locale);
}

export function getLocalizedHtml<T extends Record<string, any>>(
  record: T,
  field: string,
  locale: Locale
) {
  const value = getLocalizedValue(record, field, locale);
  return typeof value === "string" ? value : "";
}

export function getLocalizedJsonArray<T extends Record<string, any>>(
  record: T,
  field: string,
  locale: Locale
) {
  const raw = getLocalizedValue(record, field, locale);

  if (!raw || typeof raw !== "string") {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed
          .filter((item) => typeof item === "string")
          .map((item) => getTranslatedFallback(item, locale))
      : [];
  } catch {
    return [];
  }
}
