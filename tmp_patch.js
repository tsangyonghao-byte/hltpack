const fs = require('fs');

let content = fs.readFileSync('src/app/admin/settings/SettingsForm.tsx', 'utf-8');

// 1. Types
content = content.replace(
  'type SettingsTab = "basic" | "contact" | "social" | "seo" | "footer";',
  'type SettingsTab = "basic" | "contact" | "social" | "seo" | "about" | "images" | "footer";'
);

// 2. zh
content = content.replace(
  '    footerCopyEn: "版权信息 (英文)",',
  '    footerCopyEn: "版权信息 (英文)",\n    about: "公司数据",\n    aboutYears: "成立年数",\n    aboutEquipments: "设备数量",\n    aboutArea: "厂房面积 (千平米)",\n    aboutGlobal: "出口国家",\n    images: "页面横幅",\n    aboutHeroImage: "首页公司介绍背景",\n    marketHeroImage: "包装市场大图",\n    safetyHeroImage: "包装安全大图",\n    sustainabilityHeroImage: "可持续发展大图",\n    factoryHeroImage: "工厂实景大图",\n    contactHeroImage: "联系我们大图",'
);

// 3. en
content = content.replace(
  '    footerCopyEn: "Copyright (English)",',
  '    footerCopyEn: "Copyright (English)",\n    about: "Company Stats",\n    aboutYears: "Years of Experience",\n    aboutEquipments: "Advanced Equipments",\n    aboutArea: "Square Meters (K)",\n    aboutGlobal: "Global Delivery",\n    images: "Page Banners",\n    aboutHeroImage: "Home About Us Background",\n    marketHeroImage: "Packaging Market Hero",\n    safetyHeroImage: "Packaging Safety Hero",\n    sustainabilityHeroImage: "Sustainability Hero",\n    factoryHeroImage: "Factory Gallery Hero",\n    contactHeroImage: "Contact Us Hero",'
);

// 4. states
content = content.replace(
  '  const [footerCopyEn, setFooterCopyEn] = useState(setting?.footerCopyEn || "");',
  `  const [footerCopyEn, setFooterCopyEn] = useState(setting?.footerCopyEn || "");
  const [aboutYears, setAboutYears] = useState(setting?.aboutYears || "31");
  const [aboutEquipments, setAboutEquipments] = useState(setting?.aboutEquipments || "100");
  const [aboutArea, setAboutArea] = useState(setting?.aboutArea || "30");
  const [aboutGlobal, setAboutGlobal] = useState(setting?.aboutGlobal || "100");
  const [aboutHeroImage, setAboutHeroImage] = useState(setting?.aboutHeroImage || "");
  const [marketHeroImage, setMarketHeroImage] = useState(setting?.marketHeroImage || "");
  const [safetyHeroImage, setSafetyHeroImage] = useState(setting?.safetyHeroImage || "");
  const [sustainabilityHeroImage, setSustainabilityHeroImage] = useState(setting?.sustainabilityHeroImage || "");
  const [factoryHeroImage, setFactoryHeroImage] = useState(setting?.factoryHeroImage || "");
  const [contactHeroImage, setContactHeroImage] = useState(setting?.contactHeroImage || "");`
);

// 5. switch case
content = content.replace(
  '      case "footer":\n        return { footerCopyZh, footerCopyEn };',
  `      case "footer":
        return { footerCopyZh, footerCopyEn };
      case "about":
        return { aboutYears, aboutEquipments, aboutArea, aboutGlobal };
      case "images":
        return { aboutHeroImage, marketHeroImage, safetyHeroImage, sustainabilityHeroImage, factoryHeroImage, contactHeroImage };`
);

// 6. init
content = content.replace(
  '    footer: JSON.stringify({\n      footerCopyZh: setting?.footerCopyZh || "",\n      footerCopyEn: setting?.footerCopyEn || "",\n    }),',
  `    footer: JSON.stringify({
      footerCopyZh: setting?.footerCopyZh || "",
      footerCopyEn: setting?.footerCopyEn || "",
    }),
    about: JSON.stringify({
      aboutYears: setting?.aboutYears || "31",
      aboutEquipments: setting?.aboutEquipments || "100",
      aboutArea: setting?.aboutArea || "30",
      aboutGlobal: setting?.aboutGlobal || "100",
    }),
    images: JSON.stringify({
      aboutHeroImage: setting?.aboutHeroImage || "",
      marketHeroImage: setting?.marketHeroImage || "",
      safetyHeroImage: setting?.safetyHeroImage || "",
      sustainabilityHeroImage: setting?.sustainabilityHeroImage || "",
      factoryHeroImage: setting?.factoryHeroImage || "",
      contactHeroImage: setting?.contactHeroImage || "",
    }),`
);

// 7. deps
content = content.replace(
  '    footerCopyZh,\n    footerCopyEn,',
  `    footerCopyZh,
    footerCopyEn,
    aboutYears, aboutEquipments, aboutArea, aboutGlobal,
    aboutHeroImage, marketHeroImage, safetyHeroImage, sustainabilityHeroImage, factoryHeroImage, contactHeroImage,`
);

// 8. tabs
content = content.replace(
  '    { id: "seo", label: t.seo },\n    { id: "footer", label: t.footer },',
  `    { id: "seo", label: t.seo },
    { id: "about", label: t.about },
    { id: "images", label: t.images },
    { id: "footer", label: t.footer },`
);

// 9. tab map
content = content.replace(
  '    seo: t.seo,\n    footer: t.footer,',
  `    seo: t.seo,
    about: t.about,
    images: t.images,
    footer: t.footer,`
);

// 10. JSX
const jsx = `        {/* About Section */}
        {activeTab === "about" && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">{t.about}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminField label={t.aboutYears} htmlFor="aboutYears">
              <AdminInput type="text" id="aboutYears" name="aboutYears" value={aboutYears} onChange={(e) => setAboutYears(e.target.value)} />
            </AdminField>
            <AdminField label={t.aboutEquipments} htmlFor="aboutEquipments">
              <AdminInput type="text" id="aboutEquipments" name="aboutEquipments" value={aboutEquipments} onChange={(e) => setAboutEquipments(e.target.value)} />
            </AdminField>
            <AdminField label={t.aboutArea} htmlFor="aboutArea">
              <AdminInput type="text" id="aboutArea" name="aboutArea" value={aboutArea} onChange={(e) => setAboutArea(e.target.value)} />
            </AdminField>
            <AdminField label={t.aboutGlobal} htmlFor="aboutGlobal">
              <AdminInput type="text" id="aboutGlobal" name="aboutGlobal" value={aboutGlobal} onChange={(e) => setAboutGlobal(e.target.value)} />
            </AdminField>
          </div>
        </section>
        )}

        {/* Images Section */}
        {activeTab === "images" && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">{t.images}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AdminImageUploadField
              fieldId="about-hero" title={t.aboutHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              initialImage={aboutHeroImage} onImageChange={setAboutHeroImage}
              fileInputName="aboutHeroImageFile" urlInputName="aboutHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
            <AdminImageUploadField
              fieldId="market-hero" title={t.marketHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              initialImage={marketHeroImage} onImageChange={setMarketHeroImage}
              fileInputName="marketHeroImageFile" urlInputName="marketHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
            <AdminImageUploadField
              fieldId="safety-hero" title={t.safetyHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              initialImage={safetyHeroImage} onImageChange={setSafetyHeroImage}
              fileInputName="safetyHeroImageFile" urlInputName="safetyHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
            <AdminImageUploadField
              fieldId="sustainability-hero" title={t.sustainabilityHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              initialImage={sustainabilityHeroImage} onImageChange={setSustainabilityHeroImage}
              fileInputName="sustainabilityHeroImageFile" urlInputName="sustainabilityHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
            <AdminImageUploadField
              fieldId="factory-hero" title={t.factoryHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              initialImage={factoryHeroImage} onImageChange={setFactoryHeroImage}
              fileInputName="factoryHeroImageFile" urlInputName="factoryHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
            <AdminImageUploadField
              fieldId="contact-hero" title={t.contactHeroImage}
              uploadLabel="上传图片" urlLabel="图片链接"
              initialImage={contactHeroImage} onImageChange={setContactHeroImage}
              fileInputName="contactHeroImageFile" urlInputName="contactHeroImage"
              previewClassName="h-32 w-full object-cover rounded-md"
            />
          </div>
        </section>
        )}

        {/* Footer Section */}`;

content = content.replace('{/* Footer Section */}', jsx);

fs.writeFileSync('src/app/admin/settings/SettingsForm.tsx', content, 'utf-8');
console.log('Patch complete!');