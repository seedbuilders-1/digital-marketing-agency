"use client";

import type React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        primary-action-button
        w-full 
        p-3 
        border-0 
        rounded-lg 
        text-base 
        font-medium 
        transition-colors 
        duration-200 
        ease-in-out
        font-['Sora']
        focus:outline-2 
        focus:outline-[#007BFF] 
        focus:outline-offset-2
        ${
          disabled
            ? "bg-[#D1D5DB] text-[#1F2937] cursor-not-allowed hover:bg-[#D1D5DB]"
            : "bg-[#7642FE] text-white cursor-pointer hover:bg-[#5f35cc]"
        }
      `}
    >
      {children}
    </button>
  );
}
