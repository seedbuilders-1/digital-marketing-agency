/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Extends standard InputProps to be used in the form

export const PasswordField = ({ name, label, ...props }: any) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                {...props}
                {...field}
              />
            </FormControl>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              onClick={toggleVisibility}
            >
              {isPasswordVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
