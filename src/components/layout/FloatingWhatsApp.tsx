"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  // Use the actual phone number for WhatsApp without '+' or spaces
  const phoneNumber = "8613682412949";
  const message = "Hi, I'm interested in your packaging solutions.";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] flex items-center justify-center hover:bg-[#20BD5A] transition-colors"
      aria-label="Chat on WhatsApp"
    >
      {/* Official WhatsApp SVG Icon */}
      <svg 
        viewBox="0 0 24 24" 
        width="32" 
        height="32" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="fill-current text-white"
      >
        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.061-.301-.15-1.265-.462-2.406-1.305-.886-.653-1.484-1.463-1.658-1.763-.173-.3-.018-.462.13-.611.134-.133.301-.349.451-.523.151-.173.2-.296.3-.497.102-.196.05-.37-.025-.52-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.273-.21-.573-.36z"></path>
        <path d="M20.52 3.449A11.892 11.892 0 0 0 12 0C5.383 0 0 5.383 0 12c0 2.126.553 4.2 1.606 6.03L0 24l6.146-1.59A11.905 11.905 0 0 0 12 24c6.617 0 12-5.383 12-12 0-3.204-1.246-6.216-3.48-8.551zM12 21.986c-1.802 0-3.565-.483-5.112-1.397l-.366-.217-3.799.983.999-3.73-.238-.38C2.553 15.545 2.014 13.805 2.014 12c0-5.503 4.482-9.985 9.986-9.985 2.666 0 5.172 1.04 7.056 2.926A9.92 9.92 0 0 1 21.986 12c0 5.502-4.482 9.986-9.986 9.986z"></path>
      </svg>
    </motion.a>
  );
}
