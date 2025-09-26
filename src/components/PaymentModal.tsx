/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useInitializePaystackPaymentMutation } from "@/api/invoiceApi";
import { cn } from "@/lib/utils";

// Update the payment methods array to include Paystack
const paymentMethods = [
  { id: "paystack", name: "Pay with Paystack", icon: "/visa.svg" },
  { id: "visa", name: "Pay with Visa", icon: "/visa.svg" },
  { id: "mastercard", name: "Pay with Mastercard", icon: "/mastercard.svg" },
  { id: "paypal", name: "Pay with Paypal", icon: "/paypal.svg" },
  { id: "stripe", name: "Pay with Stripe", icon: "/stripe.svg" },
];

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: string;
}

export const PaymentModal = ({
  isOpen,
  onClose,
  invoiceId,
}: PaymentModalProps) => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [view, setView] = useState<"selection" | "success">("selection");

  // Hook for Paystack initialization
  const [initializePaystack, { isLoading: isInitializing }] =
    useInitializePaystackPaymentMutation();

  // Hook for other simulated payments

  const handlePayment = async () => {
    const toastId = toast.loading("Preparing your payment...");

    // --- PAYSTACK LOGIC ---
    if (selectedMethod === "paystack") {
      try {
        const result = await initializePaystack({ invoiceId }).unwrap();

        if (result.authorization_url) {
          toast.success("Redirecting to Paystack...", { id: toastId });
          // Redirect the user to the Paystack checkout page
          window.location.href = result.authorization_url;
        } else {
          throw new Error("Could not retrieve payment URL.");
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to start payment.", {
          id: toastId,
        });
      }
      return; // Stop execution here for Paystack
    }

    // --- SIMULATED LOGIC FOR OTHER METHODS ---
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // await processPayment({ invoiceId, paymentMethod: selectedMethod }).unwrap();
      toast.success("Payment successful!", { id: toastId });
      setView("success");
    } catch (err: any) {
      toast.error("Payment failed. Please try again.", { id: toastId });
    }
  };

  // The Success View (remains the same)
  if (view === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-10 flex flex-col items-center text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold">Transaction Successful!</h2>
          <p className="text-gray-500 mt-2">Your payment has been validated.</p>
          <Button
            className="w-full bg-[#7642FE] hover:bg-[#6c39e6] mt-8"
            onClick={() => router.push("/dashboard/projects")}
          >
            Proceed
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  // The Payment Selection View (UI remains the same, logic is updated)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-8">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Select Payment Method
        </h2>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={cn(
                "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all",
                selectedMethod === method.id
                  ? "border-[#7642FE] bg-purple-50 ring-1 ring-[#7642FE]"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={method.icon}
                  alt={`${method.name} logo`}
                  width={40}
                  height={24}
                  className="object-contain"
                />
                <span className="font-medium text-sm text-gray-700">
                  {method.name}
                </span>
              </div>
              {selectedMethod === method.id && (
                <div className="h-5 w-5 bg-[#7642FE] rounded-sm flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-8">
          <Button
            onClick={handlePayment}
            disabled={isInitializing}
            className="w-full bg-[#7642FE] hover:bg-[#6c39e6]"
          >
            {isInitializing ? <Loader2 className="animate-spin" /> : "Continue"}
          </Button>
          <Button variant="ghost" onClick={onClose} className="text-gray-500">
            Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
