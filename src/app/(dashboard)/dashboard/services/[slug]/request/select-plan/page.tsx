/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useGetServiceByIdQuery } from "@/api/servicesApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useServiceRequest } from "@/context/ServiceRequestContext";
import { useGroupedPlans } from "@/hooks/useGroupedPlans";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectPlanPage({ params }: any) {
  const router = useRouter();
  const serviceId = params.slug;

  const { setSelectedPlan } = useServiceRequest();

  const { data: serviceData, isLoading } = useGetServiceByIdQuery(serviceId);
  const plans: any = serviceData?.data?.plans || [];
  console.log(serviceData);

  const { groupedPlans, selectedCycles, handleCycleChange } =
    useGroupedPlans(plans);

  const handleSelectPlan = (groupName: string) => {
    const selectedOptionId = selectedCycles[groupName];
    // Find the original full plan object that matches the selected option
    const finalPlan = plans.find((p: any) => p.id === selectedOptionId);

    if (finalPlan) {
      setSelectedPlan(finalPlan);
      // Navigate to the next step, which is the summary page
      router.push(`/dashboard/services/${serviceId}/request/summary`);
    } else {
      // This is a safeguard in case something goes wrong
      console.error("Could not find the selected plan. Please try again.");
    }
  };
  if (isLoading) return <div>Loading Plans...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">Select Your Plan</h1>
        <p className="text-gray-500 mt-2">
          Choose the package that best fits your needs.
        </p>
      </div>

      {groupedPlans.length === 0 && !isLoading && (
        <div className="text-center text-gray-500">
          <p>No pricing plans have been configured for this service yet.</p>
        </div>
      )}

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(
          groupedPlans.length,
          3,
        )} gap-8`}
      >
        {groupedPlans.map((group) => {
          // Find the currently selected option to display its price
          const selectedOption = group.options.find(
            (opt) => opt.id === selectedCycles[group.name],
          );
          const price = selectedOption?.price || "0";
          const discountPercentage = selectedOption?.discountPercentage || 0;
          const discountedPrice =
            Number(price) * (1 - discountPercentage / 100);

          return (
            <Card
              key={group.name}
              className="flex flex-col border-2 hover:border-purple-600 transition-all"
            >
              <CardContent className="p-8 flex flex-col flex-grow">
                <Badge
                  variant="outline"
                  className="mb-4 text-[#7642FE] border-[#7642FE] w-fit"
                >
                  {group.name}
                </Badge>

                {/* --- Pricing Section --- */}
                <div className="mb-4">
                  <div className="flex flex-col">
                    {discountPercentage > 0 && (
                      <span className="text-2xl text-gray-400 line-through">
                        ₦{Number(price).toLocaleString()}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-gray-900">
                      ₦{discountedPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {group.options.length > 1 ? (
                      <Select
                        value={selectedCycles[group.name]}
                        onValueChange={(value) =>
                          handleCycleChange(group.name, value)
                        }
                      >
                        <SelectTrigger className="w-auto border-none focus:ring-0 font-medium text-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {group.options.map((opt) => (
                            <SelectItem key={opt.id} value={opt.id}>
                              {opt.priceUnit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-gray-600 font-medium">
                        {group.options[0]?.priceUnit}
                      </span>
                    )}
                    {discountPercentage > 0 && (
                      <Badge className="bg-green-100 text-green-700 border-none text-xs font-semibold">
                        {discountPercentage}% OFF
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{group.audience}</p>

                <Button
                  onClick={() => handleSelectPlan(group.name)}
                  className="w-full bg-[#7642FE] hover:bg-[#5f35cc] mb-6"
                >
                  Choose this plan
                </Button>

                {/* --- Features Section --- */}
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Features:
                  </h4>
                  <ul className="space-y-3">
                    {group.features.map((feature, featureIndex) => (
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
          );
        })}
      </div>
    </div>
  );
}
