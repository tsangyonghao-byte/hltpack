"use client";

import { motion } from "framer-motion";
import { useSystemSetting } from "@/components/layout/SystemSettingContext";

export default function FloatingWhatsApp() {
  const setting = useSystemSetting();
  const waUrl = setting?.whatsapp || "#";
  const hasRealLink = Boolean(setting?.whatsapp);

  return (
    <motion.a
      href={waUrl}
      target={hasRealLink ? "_blank" : undefined}
      rel={hasRealLink ? "noopener noreferrer" : undefined}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-[128px] right-4 z-[100] w-[112px] h-[112px] flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <img src="/WhatsApp.png" alt="WhatsApp" className="w-[152px] h-[152px] object-contain drop-shadow-[0_18px_34px_rgba(37,211,102,0.32)]" />
    </motion.a>
  );
}
