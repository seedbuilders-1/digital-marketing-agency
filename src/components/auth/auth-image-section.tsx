"use client";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import SocialIcons from "./social-icons";
import { CONTACT_INFO, ASSETS } from "@/lib/constants/auth";

interface AuthImageSectionProps {
  backgroundImage: string;
}

const AuthImageSection = ({ backgroundImage }: AuthImageSectionProps) => {
  return (
    <div className="relative w-full h-full flex items-end justify-start overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      />
      <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[rgba(0,16,59,0.9)] via-[rgba(0,16,59,0.7)] to-transparent z-[1]" />
      <div className="relative z-[2] text-white text-left p-8 max-w-[400px] w-full md:p-5 md:text-center lg:text-left">
        <div className="relative w-[200px] h-[60px] mb-2 md:w-[180px] md:mx-auto lg:mx-0">
          <Image
            src={ASSETS.LOGO_IMAGE || "/placeholder.svg?height=60&width=200"}
            alt={CONTACT_INFO.LOGO_ALT}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 180px, 200px"
          />
        </div>
        <div className="mb-4 p-0">
          <div className="flex items-center gap-3 mb-1 text-sm font-['Sora'] leading-[1.2] lg:justify-start md:justify-center">
            <Mail size={16} />
            <span>{CONTACT_INFO.EMAIL}</span>
          </div>
          <div className="flex items-center gap-3 mb-0 text-sm font-['Sora'] leading-[1.2] lg:justify-start md:justify-center">
            <Phone size={16} />
            <span>{CONTACT_INFO.PHONE}</span>
          </div>
        </div>
        <SocialIcons />
      </div>
    </div>
  );
};

export default AuthImageSection;
