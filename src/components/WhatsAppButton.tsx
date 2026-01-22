import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppButton = () => {
  return (
    <Link
      href="https://wa.me/2349090008888"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </Link>
  );
};
