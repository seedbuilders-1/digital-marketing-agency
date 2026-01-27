import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Popup Message Bubble */}
      <div className="pointer-events-auto bg-white text-gray-800 text-xs font-semibold py-2 px-4 rounded-xl shadow-xl border border-gray-100 max-w-[180px] text-center relative animate-bounce-slow">
        <p>Do you need support?</p>
        <p className="text-[#25D366]">Reach out via WhatsApp</p>

        {/* Triangle arrow */}
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
      </div>

      <Link
        href="https://wa.me/2349090008888"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp size={32} />
      </Link>
    </div>
  );
};
