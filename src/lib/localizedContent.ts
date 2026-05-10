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
    "Choosing the right food packaging bag is crucial for preserving product quality, extending shelf life, and attracting consumers. This guide covers material selection, barrier properties, and printing options.":
      "Elegir la bolsa adecuada para alimentos es clave para preservar la calidad del producto, extender la vida util y atraer consumidores. Esta guia cubre la seleccion de materiales, las propiedades de barrera y las opciones de impresion.",
    "When selecting food packaging bags, consider the following factors: 1. Material safety (must be food-grade), 2. Barrier requirements (oxygen and moisture resistance), 3. Physical strength (puncture resistance), 4. Convenience (zippers, tear notches). At HAILITONG, we provide customized solutions based on your specific product needs.":
      "Al seleccionar bolsas para empaque de alimentos, considere los siguientes factores: 1. Seguridad del material (debe ser apto para alimentos), 2. Requisitos de barrera (resistencia al oxigeno y a la humedad), 3. Resistencia fisica (resistencia a perforaciones), 4. Comodidad (zippers y muescas de rasgado). En HAILITONG, ofrecemos soluciones personalizadas segun las necesidades especificas de su producto.",
    "What are the Advantages of Transparent Plastic Bags?": "Cuales son las ventajas de las bolsas plasticas transparentes?",
    "Transparent plastic bags offer high visibility, allowing consumers to see the product inside. This builds trust and enhances the visual appeal of fresh produce and retail goods.":
      "Las bolsas plasticas transparentes ofrecen alta visibilidad y permiten ver el producto en su interior. Esto genera confianza y mejora el atractivo visual de productos frescos y minoristas.",
    "Transparent packaging stands out by offering complete visibility. It is widely used in the fresh food, hardware, and cosmetics industries. Our high-clarity OPP and PE bags ensure your products look their best on the shelf while providing excellent moisture protection.":
      "El empaque transparente destaca por ofrecer visibilidad total. Se utiliza ampliamente en las industrias de alimentos frescos, ferreteria y cosmeticos. Nuestras bolsas OPP y PE de alta claridad ayudan a que sus productos luzcan mejor en el estante mientras brindan una excelente proteccion contra la humedad.",
    "The Benefits of Eco-Friendly Packaging Bags": "Los beneficios de las bolsas de empaque ecologicas",
    "Eco-friendly packaging is becoming the new standard. Discover how biodegradable and recyclable materials can reduce your carbon footprint and appeal to modern consumers.":
      "El empaque ecologico se esta convirtiendo en el nuevo estandar. Descubra como los materiales biodegradables y reciclables pueden reducir su huella de carbono y atraer a los consumidores modernos.",
    "Sustainable packaging helps reduce environmental impact and aligns with global green initiatives. HAILITONG offers a range of recyclable mono-material pouches and compostable films that deliver the same high-barrier performance as traditional plastics.":
      "El empaque sostenible ayuda a reducir el impacto ambiental y se alinea con las iniciativas verdes globales. HAILITONG ofrece una gama de bolsas monomaterial reciclables y peliculas compostables que proporcionan el mismo rendimiento de alta barrera que los plasticos tradicionales.",
    "Understanding Aluminum Foil Bags": "Comprender las bolsas de papel de aluminio",
    "Aluminum foil bags provide the ultimate barrier against light, oxygen, and moisture. Learn why they are the top choice for coffee, tea, and sensitive electronics.":
      "Las bolsas de papel de aluminio ofrecen la maxima barrera contra la luz, el oxigeno y la humedad. Descubra por que son la mejor opcion para cafe, te y productos electronicos sensibles.",
    "Featuring a multi-layer composite structure, aluminum foil bags completely block out UV light and oxygen. They are essential for extending the shelf life of roasted coffee beans, premium teas, and pharmaceutical products.":
      "Gracias a su estructura compuesta multicapa, las bolsas de papel de aluminio bloquean por completo la luz UV y el oxigeno. Son esenciales para prolongar la vida util de granos de cafe tostado, tes premium y productos farmaceuticos.",
    "What is a Retort Pouch?": "Que es un pouch retort?",
    "Retort pouches are designed to withstand high temperatures during sterilization. They are lightweight alternatives to cans and glass jars for ready-to-eat meals.":
      "Los pouches retort estan disenados para soportar altas temperaturas durante la esterilizacion. Son una alternativa ligera a las latas y frascos de vidrio para comidas listas para consumir.",
    "Retort pouches are made from specialized laminates that can survive temperatures up to 121°C (250°F). They offer a long shelf life for liquid foods, curries, and pet food without requiring refrigeration.":
      "Los pouches retort estan fabricados con laminados especializados capaces de soportar temperaturas de hasta 121C (250F). Ofrecen una larga vida util para alimentos liquidos, curries y alimentos para mascotas sin necesidad de refrigeracion.",
    "Custom Printed Pouch Design Guidelines": "Guia de diseno para pouches impresos personalizados",
    "A great design makes your product pop. Learn the basics of preparing your artwork for rotogravure printing to ensure vibrant colors and sharp details.":
      "Un gran diseno hace que su producto destaque. Aprenda los conceptos basicos para preparar su arte para impresion rotograbada y lograr colores vivos y detalles nítidos.",
    "To achieve the best printing results, provide vector artwork in CMYK color mode. Pay attention to bleed areas and avoid placing critical text near the sealing edges. Our prepress team is always available to help optimize your designs.":
      "Para lograr los mejores resultados de impresion, proporcione el arte vectorial en modo de color CMYK. Preste atencion a las areas de sangrado y evite colocar textos importantes cerca de los bordes de sellado. Nuestro equipo de preimpresion siempre esta disponible para ayudarle a optimizar sus disenos.",
    "Vacuum Bags: Extending Shelf Life": "Bolsas al vacio: ampliar la vida util",
    "By removing air from the package, vacuum bags significantly slow down the growth of bacteria and fungi, keeping meat, cheese, and nuts fresh for longer.":
      "Al eliminar el aire del envase, las bolsas al vacio ralentizan de forma notable el crecimiento de bacterias y hongos, manteniendo la carne, el queso y los frutos secos frescos durante mas tiempo.",
    "Vacuum packaging is a proven method for food preservation. Our heavy-duty vacuum bags are highly puncture-resistant, ensuring the vacuum seal remains intact during transportation and storage.":
      "El empaque al vacio es un metodo comprobado para la conservacion de alimentos. Nuestras bolsas al vacio de alta resistencia ofrecen una gran resistencia a las perforaciones, garantizando que el sellado al vacio se mantenga intacto durante el transporte y el almacenamiento.",
    "The Rise of Stand-Up Pouches with Zippers": "El auge de los pouches stand-up con zipper",
    "Stand-up pouches dominate the retail space due to their convenience and shelf presence. The addition of a resealable zipper adds immense value for consumers.":
      "Los pouches stand-up dominan el espacio minorista por su practicidad y su fuerte presencia en estanteria. La incorporacion de un zipper resellable aporta un gran valor para los consumidores.",
    "Offering a large billboard area for branding, stand-up pouches are perfect for snacks, pet food, and powders. The built-in bottom gusset allows the bag to stand upright, while the zipper ensures the contents stay fresh after opening.":
      "Al ofrecer una gran superficie para la marca, los pouches stand-up son perfectos para snacks, alimentos para mascotas y polvos. El fuelle inferior integrado permite que la bolsa permanezca de pie, mientras que el zipper garantiza que el contenido se mantenga fresco despues de abrirse.",
    "How to Measure a Packaging Bag Correctly?": "Como medir correctamente una bolsa de empaque?",
    "Accurate measurements are the first step to creating the perfect custom bag. Learn how to measure width, length, and gussets properly.":
      "Las medidas precisas son el primer paso para crear la bolsa personalizada perfecta. Aprenda a medir correctamente el ancho, el largo y los fuelles.",
    "When specifying bag dimensions, always provide the Outer Dimensions (OD). For stand-up pouches, measure Width x Height + Bottom Gusset. Remember to account for the seal width and the volume of the product you intend to fill.":
      "Al especificar las dimensiones de la bolsa, proporcione siempre las dimensiones exteriores (OD). Para los pouches stand-up, mida Ancho x Alto + Fuelle inferior. Recuerde considerar el ancho del sellado y el volumen del producto que desea envasar.",
    "Why Choose Solvent-Free Lamination?": "Por que elegir la laminacion sin solventes?",
    "Solvent-free lamination is safer for the environment and food products. It eliminates the risk of solvent residue and VOC emissions.":
      "La laminacion sin solventes es mas segura para el medio ambiente y para los productos alimenticios. Elimina el riesgo de residuos de solventes y de emisiones de COV.",
    "At HAILITONG, we utilize advanced solvent-free laminators. This process uses 100% solid adhesives, curing quickly without releasing harmful emissions, making it the safest choice for food-contact packaging.":
      "En HAILITONG utilizamos laminadoras avanzadas sin solventes. Este proceso emplea adhesivos 100% solidos y cura rapidamente sin liberar emisiones nocivas, lo que lo convierte en la opcion mas segura para envases en contacto con alimentos.",
    "Spout Pouches for Liquid Packaging": "Pouches con boquilla para envasado de liquidos",
    "Spout pouches offer a lightweight, unbreakable alternative to rigid bottles. They are ideal for beverages, sauces, and liquid detergents.":
      "Los pouches con boquilla ofrecen una alternativa ligera e irrompible a las botellas rigidas. Son ideales para bebidas, salsas y detergentes liquidos.",
    "Designed with leak-proof seals and easy-pour spouts, these pouches are highly convenient for on-the-go consumption. They also reduce transportation costs and plastic waste compared to traditional rigid containers.":
      "Disenados con sellos a prueba de fugas y boquillas de vertido facil, estos pouches resultan muy practicos para el consumo fuera de casa. Tambien reducen los costos de transporte y los residuos plasticos en comparacion con los envases rigidos tradicionales.",
    "The Difference Between PE and PP Films": "La diferencia entre las peliculas PE y PP",
    "Polyethylene (PE) and Polypropylene (PP) are the two most common packaging plastics. Understand their distinct properties to make the right choice.":
      "El polietileno (PE) y el polipropileno (PP) son los dos plasticos de empaque mas comunes. Comprender sus propiedades distintivas le ayudara a tomar la decision correcta.",
    "PE is soft, flexible, and offers excellent heat-sealing properties, making it ideal for inner sealing layers. PP is stiffer, highly transparent, and provides a better moisture barrier, often used as the outer printing layer.":
      "El PE es suave, flexible y ofrece excelentes propiedades de sellado termico, por lo que es ideal para las capas internas de sellado. El PP es mas rigido, muy transparente y proporciona una mejor barrera contra la humedad, por lo que suele utilizarse como capa exterior de impresion.",
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
    "Flat Bottom Resealable Pet Food Bag": "Bolsa resellable de fondo plano para alimentos para mascotas",
    "Three Side Seal Hang Hole Resealable Bag": "Bolsa resellable con orificio para colgar y sellado en tres lados",
    "Three Side Seal Handle Bag": "Bolsa con asa y sellado en tres lados",
    "Three Side Seal Resealable Zipper with Hang Hole Bag": "Bolsa resellable con zipper, orificio para colgar y sellado en tres lados",
    "Three Side Seal Resealable Bag （ Foil Clear Bag with Hang Hole ）":
      "Bolsa resellable con sellado en tres lados (bolsa foil transparente con orificio para colgar)",
    "Three Side Seal Bag Foil Clear Bag": "Bolsa foil transparente con sellado en tres lados",
    "Three Side Seal Food Handle Bag": "Bolsa para alimentos con asa y sellado en tres lados",
    "Center Seal Bag Center Seal Bag 价格": "Bolsa de sellado central",
    "with Hang Hole Center Seal Bag": "Bolsa de sellado central con orificio para colgar",
    "with Hang Hole Center Seal Food Bag": "Bolsa para alimentos de sellado central con orificio para colgar",
    "Zipper Three Side Seal Resealable Bag": "Bolsa resellable con zipper y sellado en tres lados",
    "Zipper Hang Hole Stand Up Resealable Bag": "Bolsa stand-up resellable con zipper y orificio para colgar",
    "Zipper Stand Up Resealable Bag": "Bolsa stand-up resellable con zipper",
    "Zipper Stand Up Resealable Food Bag": "Bolsa stand-up resellable con zipper para alimentos",
    "Shaped Flat Bottom Handle Bag": "Bolsa con forma, fondo plano y asa",
    "Shaped Stand Up Resealable Bag （ with Hang Hole ）": "Bolsa con forma, stand-up y resellable (con orificio para colgar)",
    "Vacuum Compression Handle Rice Bag": "Bolsa de compresion al vacio para arroz con asa",
    "Food Handle Packaging Bag": "Bolsa de empaque para alimentos con asa",
    "Food Handle Bag": "Bolsa para alimentos con asa",
    "Product Shaped Bag": "Bolsa para productos con forma",
    "Shaped Packaging Bag": "Bolsa de empaque con forma",
    "Daily Care Shaped Bag": "Bolsa con forma para cuidado diario",
    "Food Shaped Bag": "Bolsa con forma para alimentos",
    "Three Side Seal Kraft Paper Bag": "Bolsa de papel kraft con sellado en tres lados",
    "Window Kraft Paper Bag": "Bolsa de papel kraft con ventana",
    "Three Side Seal Hang Hole Packaging Bag": "Bolsa de empaque con orificio para colgar y sellado en tres lados",
    "Three Side Seal Hang Hole Toy Bag": "Bolsa para juguetes con orificio para colgar y sellado en tres lados",
    "Three Side Seal Hang Hole Bag": "Bolsa con orificio para colgar y sellado en tres lados",
    "Three Side Seal Toy Bag": "Bolsa para juguetes con sellado en tres lados",
    "Hang Hole Three Side Seal Packaging Bag": "Bolsa de empaque con sellado en tres lados y orificio para colgar",
    "Toy Resealable Bag": "Bolsa resellable para juguetes",
    "Resealable Toy Seal Bag": "Bolsa resellable para juguetes",
    "Coffee Bean Resealable Bag": "Bolsa resellable para granos de cafe",
    "Storage Resealable Bag": "Bolsa resellable de almacenamiento",
    "Garment Resealable Bag": "Bolsa resellable para ropa",
    "Resealable Custom Bag": "Bolsa resellable personalizada",
    "装 Garment Resealable Bag": "Bolsa resellable para ropa",
    "Side Gusset Bag Resealable Bag": "Bolsa resellable con fuelle lateral",
    "Three Side Seal Packaging Bag": "Bolsa de empaque con sellado en tres lados",
    "Flat Bottom Resealable Tea Bag": "Bolsa resellable de fondo plano para te",
    "Shaped Tea Packaging Bag": "Bolsa para te con forma",
    "Shaped Tea Bag": "Bolsa de te con forma",
    "Tea Three Side Seal Bag": "Bolsa de te con sellado en tres lados",
    "Custom Foil Clear Bag": "Bolsa foil transparente personalizada",
    "Clear Foil Clear Bag": "Bolsa foil transparente",
    "Foil Clear Packaging Bag": "Bolsa de empaque foil transparente",
    "Three Side Seal Hang Hole Facial Mask Bag": "Bolsa para mascarilla facial con orificio para colgar y sellado en tres lados",
    "Three Side Seal Facial Mask Packaging Bag": "Bolsa de empaque para mascarilla facial con sellado en tres lados",
    "Three Side Seal Facial Mask Bag": "Bolsa para mascarilla facial con sellado en tres lados",
    "Three Side Seal Facial Mask Custom Bag": "Bolsa personalizada para mascarilla facial con sellado en tres lados",
    "Standard Facial Mask Bag": "Bolsa estandar para mascarilla facial",
    "Shaped Facial Mask Packaging Bag": "Bolsa de empaque con forma para mascarilla facial",
    "Shaped Facial Mask Bag": "Bolsa con forma para mascarilla facial",
    "Facial Mask Packaging Bag": "Bolsa de empaque para mascarilla facial",
    "Facial Mask Bag": "Bolsa para mascarilla facial",
    "Heat Shrink Sleeve Label": "Etiqueta de funda termoencogible",
    "Shrink Label Series": "Serie de etiquetas termoencogibles",
    "Transparent High-Barrier Films (AlOx)": "Peliculas transparentes de alta barrera (AlOx)",
    "Recyclable Mono-Materials": "Monomateriales reciclables",
    "Mono-PE Recyclable Rollstock": "Bobina mono-PE reciclable",
    "Transparent High-Barrier PET-AlOx Film (Boilable) - PET-AlOx-010":
      "Pelicula PET-AlOx transparente de alta barrera (hervible) - PET-AlOx-010",
    "Transparent High-Barrier PET-AlOx Film (Retortable) - PET-AlOx-TZ":
      "Pelicula PET-AlOx transparente de alta barrera (retortable) - PET-AlOx-TZ",
    "Ultra-High Barrier Transparent PET-AlOx Film (Retortable) - PET-AlOx-DTZ":
      "Pelicula PET-AlOx transparente de ultra alta barrera (retortable) - PET-AlOx-DTZ",
    "Strip/Window Metallized PET Film - VMPET": "Pelicula PET metalizada para tira/ventana - VMPET",
    "Electronic Grade Metallized PET Film - VMPET-DZ": "Pelicula PET metalizada grado electronico - VMPET-DZ",
    "Reflective Metallized PET Film - VMPET": "Pelicula PET metalizada reflectante - VMPET",
    "Twist Metallized PET Film - VPET-NJ": "Pelicula PET metalizada para twist - VPET-NJ",
    "Brushed Metallized PET Film - VMPET (Brushed)": "Pelicula PET metalizada cepillada - VMPET (Brushed)",
    "Copper Metallized PET Film - VMPET-Cu": "Pelicula PET metalizada de cobre - VMPET-Cu",
    "Slit Metallized PET Film - VPET": "Pelicula PET metalizada slit - VPET",
    "Chemically Enhanced Metallized PET Film - VMPET-JQ": "Pelicula PET metalizada mejorada quimicamente - VMPET-JQ",
    "High-Barrier Metallized PET Film - VMPET-GZ": "Pelicula PET metalizada de alta barrera - VMPET-GZ",
    "High-Adhesion Metallized PET Film - VMPET-GF": "Pelicula PET metalizada de alta adhesion - VMPET-GF",
    "Ultra-High Barrier Metallized BOPP Film - VMBOPP-GZ": "Pelicula BOPP metalizada de ultra alta barrera - VMBOPP-GZ",
    "Double-Sided High-Adhesion Metallized PET Film - VMPET-GF02":
      "Pelicula PET metalizada de alta adhesion por ambas caras - VMPET-GF02",
    "High-Adhesion Metallized BOPP Film - BOPP-GF02": "Pelicula BOPP metalizada de alta adhesion - BOPP-GF02",
    "Aluminum Silver Paste Metallized PET Film - VMPET": "Pelicula PET metalizada con pasta plateada de aluminio - VMPET",
    "Nickel Metallized PET Film - VMPET-Ni": "Pelicula PET metalizada de niquel - VMPET-Ni",
    "Metallized CPP Film - VMCPP": "Pelicula CPP metalizada - VMCPP",
    "Metallized PE Film - VMPE": "Pelicula PE metalizada - VMPE",
    "Metallized PVC Film - VMPVC": "Pelicula PVC metalizada - VMPVC",
    "Metallized BOPA/Nylon Film - VMBOPA": "Pelicula BOPA/Nylon metalizada - VMBOPA",
    "Metallized Non-Woven Fabric": "Tela no tejida metalizada",
    "Single-Sided Matte Metallized PET Film - VMPET (Matte)": "Pelicula PET metalizada mate por una cara - VMPET (Matte)",
    "Matte Metallized PET Film - VPET-YGD-B/H": "Pelicula PET metalizada mate - VPET-YGD-B/H",
    "High-Gloss Metallized PET Film - VMPET-GL": "Pelicula PET metalizada de alto brillo - VMPET-GL",
    "High-Barrier Metallized Paper": "Papel metalizado de alta barrera",
    "Matte PET Film - YG/YGD": "Pelicula PET mate - YG/YGD",
    "General Purpose PET Film - PET-TY": "Pelicula PET de uso general - PET-TY",
    "Twist PET Film - PET-NJ": "Pelicula PET para twist - PET-NJ",
    "Black PET Film - PET-Black": "Pelicula PET negra - PET-Black",
    "Anti-Explosion / Window Film - VMPET": "Pelicula antiexplosion / para ventana - VMPET",
    "White PET Film - PET-White": "Pelicula PET blanca - PET-White",
    "Hot Stamping / Thermal Transfer PET Film - PET-HP": "Pelicula PET para hot stamping / transferencia termica - PET-HP",
    "Heat Sealable PET Film - PET-RF": "Pelicula PET sellable por calor - PET-RF",
    "Anti-UV PET Film - PET-KZ": "Pelicula PET anti-UV - PET-KZ",
    "Anti-Static PET Film - PET-KJ": "Pelicula PET antiestatica - PET-KJ",
    "Release PET Film / Silicone Coated PET - PET-LX": "Pelicula PET release / PET recubierto de silicona - PET-LX",
    "High Transparency PET Film - PET-GT": "Pelicula PET de alta transparencia - PET-GT",
    "MDOPE Film with Water-Based Coating - MDOPE": "Pelicula MDOPE con recubrimiento a base de agua - MDOPE",
    "Product Gallery": "Galeria del producto",
    "Metallized PLA Film - VMPLA": "Pelicula PLA metalizada - VMPLA",
    "High-Barrier ALOx-BOPP Film (Recyclable) - ALOx-BOPP": "Pelicula ALOx-BOPP de alta barrera (reciclable) - ALOx-BOPP",
    "Biodegradable PLA-AlOx Film - PLA-AlOx": "Pelicula PLA-AlOx biodegradable - PLA-AlOx",
    "- High quality customized packaging solutions.": "- Soluciones de empaque personalizadas de alta calidad.",
    "High quality customized packaging solutions.": "Soluciones de empaque personalizadas de alta calidad.",
    "Product Overview": "Descripcion general del producto",
    "Key Characteristics": "Caracteristicas clave",
    "Why Choose Our Films?": "Por que elegir nuestras peliculas?",
    "Boilable & Heat Stable": "Hervible y estable al calor",
    "Excellent Oxygen/Moisture Barrier": "Excelente barrera contra oxigeno y humedad",
    "Mono-Materials": "Monomateriales",
    "Biodegradable VMPLA": "VMPLA biodegradable",
    "Microorganism Degradation": "Degradacion por microorganismos",
    "Core Advantage:": "Ventaja principal:",
    "Application:": "Aplicacion:",
    "Original Spec:": "Especificacion original:",
    "Quality Assurance:": "Garantia de calidad:",
    "The <strong>": "<strong>",
    "</strong> is engineered to meet the highest industry standards for flexible packaging and functional applications. Utilizing advanced manufacturing processes, this material delivers exceptional performance tailored for specialized needs.":
      "</strong> esta disenado para cumplir con los mas altos estandares de la industria en envases flexibles y aplicaciones funcionales. Mediante procesos avanzados de fabricacion, este material ofrece un rendimiento excepcional adaptado a necesidades especializadas.",
    "Manufactured with precision to ensure uniform thickness, excellent barrier properties, and superior mechanical strength.":
      "Fabricado con precision para garantizar un espesor uniforme, excelentes propiedades de barrera y una resistencia mecanica superior.",
    "Whether you require high-barrier properties for food preservation, specific metallic aesthetics for brand enhancement, or eco-friendly mono-materials to meet sustainability goals, our film series provides a reliable, cost-effective, and highly customizable solution. The material is compatible with various conversion processes including printing, lamination, and pouch making.":
      "Ya sea que necesite propiedades de alta barrera para la conservacion de alimentos, una estetica metalizada especifica para reforzar su marca, o monomateriales ecologicos para cumplir objetivos de sostenibilidad, nuestra serie de peliculas ofrece una solucion confiable, rentable y altamente personalizable. El material es compatible con diversos procesos de conversion, incluyendo impresion, laminacion y fabricacion de bolsas.",
    "Header Card": "tarjeta colgante",
    "Self Adhesive": "autoadhesivo",
    "Mask Packaging": "empaque para mascarillas",
    "Bubble Bag": "bolsa burbuja",
    "Three Side Seal": "sellado en tres lados",
    "Center Seal": "sellado central",
    "Hang Hole": "orificio para colgar",
    "Stand Up": "stand-up",
    "Flat Bottom": "de fondo plano",
    "Side Gusset": "fuelle lateral",
    "High Barrier": "alta barrera",
    "Tea Packaging Bag": "bolsa para empaque de te",
    "Tea Packaging Pouch": "bolsa para empaque de te",
    "Facial Mask": "mascarilla facial",
    "Heat Shrink": "termoencogible",
    "Shrink Sleeve": "funda termoencogible",
    "Rollstock": "bobina",
    "Kraft Paper": "papel kraft",
    "Pet Food": "alimentos para mascotas",
    "Coffee Bean": "granos de cafe",
    "Daily Care": "cuidado diario",
    "Vacuum Compression": "compresion al vacio",
    "Food Handle": "asa para alimentos",
    "Water-Based Coating": "recubrimiento a base de agua",
    "General Purpose": "de uso general",
    "High-Gloss": "de alto brillo",
    "Double-Sided": "por ambas caras",
    "High-Adhesion": "de alta adhesion",
    "Electronic Grade": "grado electronico",
    "Anti-Explosion": "antiexplosion",
    "Anti-Static": "antiestatico",
    "Anti-UV": "anti-UV",
    "Heat Sealable": "sellable por calor",
    "Silicone Coated": "recubierto de silicona",
    "High Transparency": "de alta transparencia",
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
    "Label": "etiqueta",
    "Labels": "etiquetas",
    "Toy": "juguetes",
    "Food": "alimentos",
    "Handle": "asa",
    "Window": "ventana",
    "Resealable": "resellable",
    "Zipper": "zipper",
    "Custom": "personalizado",
    "Shaped": "con forma",
    "Paper": "papel",
    "Facial": "facial",
    "Tea": "te",
    "Storage": "almacenamiento",
    "Beverage": "bebidas",
    "Spout": "boquilla",
    "Medical": "medico",
    "Mask": "mascarilla",
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
    "When selecting food packaging bags, consider the following factors: 1. Material safety (must be food-grade), 2. Barrier requirements (oxygen and moisture resistance), 3. Physical strength (puncture resistance), 4. Convenience (zippers, tear notches). At HAILITONG, we provide customized solutions based on your specific product needs.":
      "عند اختيار اكياس تغليف الطعام، ينبغي مراعاة العوامل التالية: 1. سلامة المادة ويجب ان تكون مخصصة للاغذية، 2. متطلبات الحاجز مثل مقاومة الاكسجين والرطوبة، 3. المتانة الفيزيائية مثل مقاومة الثقب، 4. سهولة الاستخدام مثل السحاب وفتحات التمزق. في HAILITONG نوفر حلولا مخصصة وفقا لاحتياجات منتجك المحددة.",
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
    "Heat Shrink Sleeve Label": "ملصق غلاف انكماشي حراري",
    "High quality heat shrink sleeve label customized for your brand.":
      "ملصق غلاف انكماشي حراري عالي الجودة مخصص لعلامتك التجارية.",
    "Shrink Label Series": "سلسلة الملصقات المنكمشة",
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
    "Mono-PE Recyclable Rollstock": "لفائف Mono-PE قابلة لاعادة التدوير",
    "Transparent High-Barrier PET-AlOx Film (Boilable) - PET-AlOx-010":
      "فيلم PET-AlOx شفاف عالي الحاجز (قابل للغلي) - PET-AlOx-010",
    "Transparent High-Barrier PET-AlOx Film (Retortable) - PET-AlOx-TZ":
      "فيلم PET-AlOx شفاف عالي الحاجز (قابل للتعقيم الحراري) - PET-AlOx-TZ",
    "Ultra-High Barrier Transparent PET-AlOx Film (Retortable) - PET-AlOx-DTZ":
      "فيلم PET-AlOx شفاف فائق الحاجز (قابل للتعقيم الحراري) - PET-AlOx-DTZ",
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
    "High quality customized packaging solutions.": "حلول تغليف مخصصة عالية الجودة.",
    "Metallized PLA Film - VMPLA": "فيلم PLA معدني - VMPLA",
    "High-Barrier ALOx-BOPP Film (Recyclable) - ALOx-BOPP": "فيلم ALOx-BOPP عالي الحاجز (قابل لاعادة التدوير) - ALOx-BOPP",
    "Biodegradable PLA-AlOx Film - PLA-AlOx": "فيلم PLA-AlOx قابل للتحلل - PLA-AlOx",
    "MDOPE Film with Water-Based Coating - MDOPE": "فيلم MDOPE بطلاء مائي الاساس - MDOPE",
    "Product Gallery": "معرض المنتج",
    "Product Overview": "نظرة عامة على المنتج",
    "Key Characteristics": "الخصائص الرئيسية",
    "Why Choose Our Films?": "لماذا تختار افلامنا؟",
    "Boilable & Heat Stable": "قابل للغلي ومستقر حراريا",
    "Excellent Oxygen/Moisture Barrier": "حاجز ممتاز ضد الاكسجين والرطوبة",
    "Mono-Materials": "مواد احادية",
    "Microorganism Degradation": "التحلل بواسطة الكائنات الدقيقة",
    "Core Advantage:": "الميزة الرئيسية:",
    "Application:": "التطبيق:",
    "Original Spec:": "المواصفة الاصلية:",
    "Quality Assurance:": "ضمان الجودة:",
    "The <strong>": "<strong>",
    "</strong> is engineered to meet the highest industry standards for flexible packaging and functional applications. Utilizing advanced manufacturing processes, this material delivers exceptional performance tailored for specialized needs.":
      "</strong> تم تصميمه ليلبي اعلى معايير الصناعة في مجالات التغليف المرن والتطبيقات الوظيفية. ومن خلال عمليات تصنيع متقدمة، توفر هذه المادة اداء مميزا مصمما لتلبية الاحتياجات المتخصصة.",
    "Manufactured with precision to ensure uniform thickness, excellent barrier properties, and superior mechanical strength.":
      "تم تصنيعه بدقة لضمان سماكة موحدة وخصائص حاجزة ممتازة وقوة ميكانيكية فائقة.",
    "Whether you require high-barrier properties for food preservation, specific metallic aesthetics for brand enhancement, or eco-friendly mono-materials to meet sustainability goals, our film series provides a reliable, cost-effective, and highly customizable solution. The material is compatible with various conversion processes including printing, lamination, and pouch making.":
      "سواء كنت تحتاج الى خصائص حاجزة عالية لحفظ الاغذية، او مظهرا معدنيا محددا لتعزيز العلامة التجارية، او مواد احادية صديقة للبيئة لتحقيق اهداف الاستدامة، فان سلسلة الافلام لدينا توفر حلا موثوقا وفعالا من حيث التكلفة وقابلا للتخصيص بدرجة عالية. كما تتوافق هذه المادة مع عمليات تحويل متعددة، بما في ذلك الطباعة والتغليف المركب وتصنيع الاكياس.",
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
    "Water-Based Coating": "طلاء مائي الاساس",
    "Rollstock": "لفائف",
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
