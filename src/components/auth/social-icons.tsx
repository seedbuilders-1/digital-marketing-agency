"use client";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const SocialIcons = () => {
  const handleInstagramClick = () => {
    console.log("Instagram clicked");
  };

  const handleFacebookClick = () => {
    console.log("Facebook clicked");
  };

  const handleWhatsAppClick = () => {
    console.log("WhatsApp clicked");
  };

  return (
    <div className="flex gap-2.5 mt-4 lg:justify-start md:justify-center">
      <button
        onClick={handleInstagramClick}
        aria-label="Instagram"
        className="bg-none border-none text-white cursor-pointer p-1 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-2 focus:outline-white focus:outline-offset-2"
      >
        <FaInstagram size={24} />
      </button>
      <button
        onClick={handleFacebookClick}
        aria-label="Facebook"
        className="bg-none border-none text-white cursor-pointer p-1 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-2 focus:outline-white focus:outline-offset-2"
      >
        <FaFacebook size={24} />
      </button>
      <button
        onClick={handleWhatsAppClick}
        aria-label="WhatsApp"
        className="bg-none border-none text-white cursor-pointer p-1 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-2 focus:outline-white focus:outline-offset-2"
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  );
};

export default SocialIcons;
