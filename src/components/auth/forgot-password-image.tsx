"use client";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import SocialIcons from "./social-icons";
import { CONTACT_INFO, ASSETS } from "@/lib/constants/auth";

const ForgotPasswordImageSection = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <Image
        src={
          ASSETS.FORGOT_PASSWORD_BACKGROUND ||
          "/placeholder.svg?height=600&width=800"
        }
        alt="Digital Marketing Agency - Forget Password"
        fill
        className="object-cover"
        priority
        sizes="50vw"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,16,59,0.9)] via-[rgba(0,16,59,0.7)] to-transparent text-white p-8 flex flex-col items-start text-left md:p-5 md:text-center md:items-center lg:text-left lg:items-start">
        <div className="relative w-[200px] h-[60px] mb-2 md:w-[180px]">
          <Image
            src={ASSETS.LOGO_IMAGE || "/placeholder.svg?height=60&width=200"}
            alt={CONTACT_INFO.LOGO_ALT}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 180px, 200px"
          />
        </div>
        <div className="flex flex-col gap-1 mb-4 font-['Sora'] text-sm">
          <div className="flex items-center gap-3 leading-[1.2] lg:justify-start md:justify-center">
            <Mail size={16} />
            <span>{CONTACT_INFO.EMAIL}</span>
          </div>
          <div className="flex items-center gap-3 leading-[1.2] lg:justify-start md:justify-center">
            <Phone size={16} />
            <span>{CONTACT_INFO.PHONE}</span>
          </div>
        </div>
        <SocialIcons />
      </div>
    </div>
  );
};

export default ForgotPasswordImageSection;
