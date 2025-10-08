/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/selectors";
// NOTE: Replace this with your actual authentication hook

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

export default function ServiceRequestPage({ params }: any) {
  const router = useRouter();
  const serviceId = params.slug;
  const { setFormData } = useServiceRequest();

  // Get the user object from your auth context/hook
  const user = useSelector(selectCurrentUser);
  console.log("user", user);

  const { data: serviceData, isLoading: isLoadingService } =
    useGetServiceByIdQuery(serviceId);

  const [currentStep, setCurrentStep] = useState(1);

  const service: Service | undefined = serviceData?.data;
  const formFields: any[] = service?.form?.formFields || [];
  console.log("formFields", formFields);

  // Prepare default values for the form based on the user object
  const defaultValues = useMemo(() => {
    if (!user || formFields.length === 0) {
      return {};
    }

    const prefilledData: { [key: string]: any } = {};
    const fieldToUserKeyMap: { [key: string]: string } = {
      user_name: "name",
      user_address: "address",
      user_phone: "tel", // The key remains 'tel'
      user_email: "email",
    };

    // This dataSource is now only for fields that exist in both contexts (name, address, email)
    const dataSource =
      user.category === "organisation" && user.organisation
        ? user.organisation
        : user;

    for (const field of formFields) {
      if (field.fromUser) {
        // --- THIS IS THE NEW, CORRECTED LOGIC ---

        // SPECIAL CASE: The phone number is always on the top-level user object.
        if (field.name === "user_phone") {
          if (user.tel) {
            prefilledData[field.name] = user.tel;
          }
        } else {
          // STANDARD LOGIC: For all other fields, use the dataSource as before.
          const userObjectKey = fieldToUserKeyMap[field.name];
          if (userObjectKey && dataSource[userObjectKey]) {
            prefilledData[field.name] = dataSource[userObjectKey];
          }
        }
      }
    }
    return prefilledData;
  }, [user, formFields]);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
    reset,
  } = useForm({
    // Pass the calculated default values to useForm
    defaultValues,
  });

  useEffect(() => {
    // Check if there are actual values to set.
    // This prevents resetting the form with an empty object unnecessarily.
    if (Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

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

  // The final onSubmit that dispatches data and navigates
  const onSubmit = (data: any) => {
    setFormData(data);
    router.push(`/dashboard/services/${serviceId}/request/select-plan`);
  };

  const handleNext = async () => {
    const fieldsInCurrentStep =
      fieldsByStep[currentStep]?.map((f) => f.name) || [];
    const isValid = await trigger(fieldsInCurrentStep);

    if (isValid) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      } else {
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

            {(() => {
              switch (field.type) {
                case "textarea":
                  return (
                    <Textarea
                      {...register(field.name, { required: field.required })}
                      disabled={field.fromUser}
                    />
                  );

                case "date":
                  return (
                    <Input
                      type="date"
                      {...register(field.name, { required: field.required })}
                      disabled={field.fromUser}
                    />
                  );

                case "file":
                  return (
                    <Input
                      type="file"
                      {...register(field.name, { required: field.required })}
                      disabled={field.fromUser}
                    />
                  );

                case "select":
                  return (
                    <Controller
                      control={control}
                      name={field.name}
                      rules={{ required: field.required }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          onValueChange={onChange}
                          value={value}
                          disabled={field.fromUser}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option..." />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option: any) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  );

                default:
                  return (
                    <Input
                      {...register(field.name, { required: field.required })}
                      disabled={field.fromUser}
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
