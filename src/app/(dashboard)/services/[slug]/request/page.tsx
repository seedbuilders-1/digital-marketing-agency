/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useGetServiceByIdQuery } from "@/api/servicesApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle } from "lucide-react";
import { Service } from "@/lib/types/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useServiceRequest } from "@/context/ServiceRequestContext";

const Stepper = ({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: string[];
}) => (
  <div className="flex items-center justify-center w-full max-w-md mx-auto my-8">
    {steps.map((label, index) => (
      <div key={label} className="flex items-center w-full">
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentStep > index + 1
                ? "bg-green-500 text-white"
                : currentStep === index + 1
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {currentStep > index + 1 ? "✓" : index + 1}
          </div>
          <p className="text-xs mt-2 text-center">{label}</p>
        </div>
        {index < steps.length - 1 && (
          <div
            className={`flex-auto border-t-2 transition-all duration-300 ${
              currentStep > index + 1 ? "border-green-500" : "border-gray-200"
            }`}
          ></div>
        )}
      </div>
    ))}
  </div>
);

export default function ServiceRequestPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const serviceId = params.slug;
  const { setFormData } = useServiceRequest();

  const { data: serviceData, isLoading: isLoadingService } =
    useGetServiceByIdQuery(serviceId);

  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm();

  const service: Service | undefined = serviceData?.data;
  const formFields: any = service?.form?.formFields || [];

  const { fieldsByStep, stepNames } = useMemo(() => {
    const steps: { [key: number]: any[] } = {};
    const names: string[] = [];
    if (formFields) {
      for (const field of formFields) {
        if (!steps[field.step]) {
          steps[field.step] = [];
          names[field.step - 1] = field.groupName;
        }
        steps[field.step].push(field);
      }
    }
    return { fieldsByStep: steps, stepNames: names };
  }, [formFields]);

  const totalSteps = Object.keys(fieldsByStep).length;

  // The final onSubmit that dispatches data to Redux and navigates
  const onSubmit = (data: any) => {
    setFormData(data);
    router.push(`/services/${serviceId}/request/select-plan`);
  };

  const handleNext = async () => {
    const fieldsInCurrentStep =
      fieldsByStep[currentStep]?.map((f) => f.name) || [];
    const isValid = await trigger(fieldsInCurrentStep);

    if (isValid) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // If it's the last step, call the final submit handler
        handleSubmit(onSubmit)();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (isLoadingService)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  if (!service || !service.form || formFields.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-semibold">
          This service is not accepting requests.
        </h2>
        <p className="text-gray-500">
          The request form for this service has not been configured yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-center text-3xl font-bold">{service.title}</h1>
      <p className="text-center text-gray-500 mt-2">
        Kindly fill the form to continue
      </p>

      <Stepper currentStep={currentStep} steps={stepNames} />

      {/* The form tag now only wraps the fields, not the buttons */}
      <form
        id="service-request-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {fieldsByStep[currentStep]?.map((field) => (
          <div key={field.id}>
            <label className="font-medium text-sm text-gray-800 block mb-1">
              {field.label}
              {field.required && "*"}
            </label>

            {/* Use a switch statement for cleaner conditional rendering */}
            {(() => {
              switch (field.type) {
                case "textarea":
                  return (
                    <Textarea
                      {...register(field.name, { required: field.required })}
                    />
                  );

                case "date":
                  return (
                    <Input
                      type="date"
                      {...register(field.name, { required: field.required })}
                    />
                  );

                case "file":
                  return (
                    <Input
                      type="file"
                      {...register(field.name, { required: field.required })}
                    />
                  );

                case "select":
                  return (
                    <Controller
                      control={control}
                      name={field.name}
                      rules={{ required: field.required }}
                      render={({ field: { onChange, value } }) => (
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option..." />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  );

                // Default case for 'text' and any other unknown types
                default:
                  return (
                    <Input
                      {...register(field.name, { required: field.required })}
                    />
                  );
              }
            })()}

            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                This field is required.
              </p>
            )}
          </div>
        ))}
        {currentStep === totalSteps && (
          <>
            <div className="pt-4 border-t">
              <label className="font-medium">Project Start Date*</label>
              <Input
                type="date"
                {...register("start_date", { required: true })}
              />
              {errors.start_date && (
                <p className="text-red-500 text-sm mt-1">
                  Start date is required.
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Project End Date*</label>
              <Input
                type="date"
                {...register("end_date", { required: true })}
              />
              {errors.end_date && (
                <p className="text-red-500 text-sm mt-1">
                  End date is required.
                </p>
              )}
            </div>
          </>
        )}
      </form>

      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div />
        )}

        <Button type="button" onClick={handleNext} className="bg-purple-600">
          {currentStep < totalSteps ? "Next" : "Continue to Select Plan"}
        </Button>
      </div>
    </div>
  );
}
