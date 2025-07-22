/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  hasError?: boolean;
  onReset?: () => void;
  className?: string;
}

export function OTPInput({
  length,
  value,
  onChange,
  onComplete,
  hasError = false,
  onReset,
  className,
}: OTPInputProps) {
  const inputRefs = React.useRef<any>([]);

  const handleChange = (index: number, inputValue: string) => {
    if (onReset) {
      onReset();
    }

    const newValue = value.split("");
    newValue[index] = inputValue.slice(-1); // Only take the last character
    const updatedValue = newValue.join("");

    onChange(updatedValue);

    // Move to next input if value is entered
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete if all inputs are filled
    if (updatedValue.length === length && onComplete) {
      onComplete(updatedValue);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    onChange(pastedData);

    if (pastedData.length === length && onComplete) {
      onComplete(pastedData);
    }
  };

  return (
    <div className={cn("flex gap-3 justify-center", className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el: any) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            "w-12 h-12 text-center text-lg font-medium border rounded-lg transition-colors duration-200 ease-in-out focus:outline-none font-['Poppins']",
            hasError
              ? "border-[#EF4444] focus:border-[#EF4444] bg-red-50"
              : "border-[#D1D5DB] focus:border-[#007BFF] bg-white"
          )}
        />
      ))}
    </div>
  );
}
