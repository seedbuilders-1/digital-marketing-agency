/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useGetServiceByIdQuery } from "@/api/servicesApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useServiceRequest } from "@/context/ServiceRequestContext";

export default function SelectPlanPage({ params }: any) {
  const router = useRouter();
  const serviceId = params.slug;

  const { setSelectedPlan } = useServiceRequest();

  const { data: serviceData, isLoading } = useGetServiceByIdQuery(serviceId);
  const plans: any = serviceData?.data?.plans || [];
  console.log(serviceData);

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
    router.push(`dashboard//services/${serviceId}/request/summary`);
  };

  if (isLoading) return <div>Loading Plans...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Select Your Plan</h1>
        <p className="text-gray-500 mt-2">
          Choose the package that best fits your needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan: any, index: any) => (
          <Card key={index} className="flex flex-col">
            <CardContent className="p-8 flex flex-col flex-grow">
              <Badge
                variant="outline"
                className="mb-4 text-[#7642FE] border-[#7642FE] w-fit"
              >
                {plan.name}
              </Badge>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  ₦{Number(plan.price).toLocaleString()}
                </span>
                <span className="text-gray-600">{plan.priceUnit}</span>
              </div>
              <p className="text-gray-600 mb-6">{plan.audience}</p>

              {/* --- FIX #2: Added Link to Choose Plan Button --- */}
              <Button
                onClick={() => handleSelectPlan(plan)}
                className="w-full bg-[#7642FE] hover:bg-[#5f35cc] mb-6"
              >
                {" "}
                Choose this plan
              </Button>

              {/* ... (Plan features) ... */}
              <div className="flex-grow">
                <h4 className="font-semibold text-gray-900 mb-4">Features:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature: any, featureIndex: any) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
