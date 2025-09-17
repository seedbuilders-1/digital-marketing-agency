import { SignUpForm } from "@/components/auth/sign-up-form";
import { getCountries } from "@/lib/services/countries";
import { Suspense } from "react";

export default async function SignupPage() {
  const countries = await getCountries();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="w-full py-8">
        <SignUpForm countries={countries} />
      </div>
    </Suspense>
  );
}
