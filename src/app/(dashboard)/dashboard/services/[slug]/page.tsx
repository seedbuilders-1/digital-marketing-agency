/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star, Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGetServiceByIdQuery } from "@/api/servicesApi";
import { useGroupedPlans } from "@/hooks/useGroupedPlans";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useServiceRequest } from "@/context/ServiceRequestContext";

// ... (All your interface and skeleton component definitions remain the same) ...

interface Plan {
  name: string;
  price: string;
  priceUnit: string;
  audience: string;
  features: string[];
}

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  bannerImageUrl: string;
}

interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImageUrl: string;
  stars: number;
}

interface Faq {
  question: string;
  answer: string;
}

interface Service {
  id: string;
  title: string;
  heroHeadline: string;
  heroParagraph: string;
  heroImageUrl: string;
  blueprintHeadline: string;
  blueprintParagraph: string;
  blueprintImageUrl: string;

  onboardingVideoUrl?: string; // Added optional video URL
  bannerText: string; // Added bannerText to the type
  plans: Plan[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  faqs: Faq[]; // Add faqs to the Service type
}

// ... (Skeleton component remains the same) ...
const ServiceDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="h-12 w-3/4 bg-gray-200 rounded mb-6"></div>
          <div className="h-6 w-full bg-gray-200 rounded mb-3"></div>
          <div className="h-6 w-5/6 bg-gray-200 rounded mb-8"></div>
          <div className="h-12 w-40 bg-gray-300 rounded-md"></div>
        </div>
        <div className="aspect-video bg-gray-200 rounded-lg"></div>
      </div>
    </div>
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-8 w-1/2 bg-gray-200 rounded mb-8 mx-auto"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export default function ServiceDetailPage({ params }: any) {
  const serviceId = params.slug;
  const {
    data: serviceData,
    isLoading,
    isError,
    error,
  } = useGetServiceByIdQuery(serviceId);
  const service: Service | undefined = serviceData?.data;

  const { setSelectedPlan } = useServiceRequest();
  const router = useRouter();

  const { groupedPlans, selectedCycles, handleCycleChange } = useGroupedPlans(
    (service?.plans as any) || [],
  );

  const plans: any = serviceData?.data?.plans || [];
  console.log("serviceData", serviceData);
  console.log("error", error);

  const handleSelectPlan = (groupName: any) => {
    const selectedOptionId = selectedCycles[groupName];
    // Find the original full plan object that matches the selected option
    const finalPlan = plans.find((p: any) => p.id === selectedOptionId);

    if (finalPlan) {
      setSelectedPlan(finalPlan);
      // Navigate to the next step, which is the summary page
      router.push(`/dashboard/services/${serviceId}/request`);
    } else {
      // This is a safeguard in case something goes wrong
      console.error("Could not find the selected plan. Please try again.");
    }
  };

  // ... (loading, error, and not found states remain the same) ...
  if (isLoading) {
    return <ServiceDetailSkeleton />;
  }

  if (isError || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Service Not Found</h1>
        <p className="text-gray-600 mt-2">
          We couldn't find the service you're looking for.
        </p>
        <Button asChild className="mt-6 bg-[#7642FE] hover:bg-[#5f35cc]">
          <Link href="/services">Back to Our Services</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* --- (Breadcrumb and other sections are fine) --- */}
      <h1 className="text-2xl lg:text-5xl font-bold text-[#7642FE] mb-6 text-center p-5">
        {service?.title}
      </h1>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {service.heroHeadline}
            </h1>
            <p className="text-lg text-gray-600 mb-8 whitespace-pre-line">
              {service.heroParagraph}
            </p>
            {/* --- FIX #1: Added Link to Request Service Button --- */}
            <Button
              asChild
              className="bg-[#7642FE] hover:bg-[#5f35cc] text-white px-8 py-3 text-lg"
            >
              <Link href={`#plan`}>Request service</Link>
            </Button>
          </div>
          <div className="relative aspect-video">
            <Image
              src={service.heroImageUrl || "/placeholder.svg"}
              alt={service.title}
              fill
              className="rounded-lg object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* --- (Service Description is fine) --- */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video">
              <Image
                src={service.blueprintImageUrl || "/placeholder.svg"}
                alt={service.blueprintHeadline}
                fill
                className="rounded-lg object-cover object-top"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {service.blueprintHeadline}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="whitespace-pre-line">
                  {service.blueprintParagraph}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" id="plan">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600">
              Whether you're just starting or scaling up, we have the right plan
              for you
            </p>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(
              groupedPlans.length,
              3,
            )} gap-8`}
          >
            {groupedPlans.map((group) => {
              const selectedOption = group.options.find(
                (opt) => opt.id === selectedCycles[group.name],
              );
              const price = selectedOption?.price || "0";
              const discountPercentage =
                selectedOption?.discountPercentage || 0;
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

                    {/* Pricing Section */}
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

                    {/* Features Section */}
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
                            <span className="text-sm text-gray-600">
                              {feature}
                            </span>
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
      </section>

      {/* Onboarding Video Section */}
      {service.onboardingVideoUrl && (
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              How to Onboard
            </h2>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
              <video
                src={service.onboardingVideoUrl}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* --- (Case Studies, Testimonials, and FAQs are fine) --- */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              CASE <span className="text-[#7642FE]">Studies</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.caseStudies.map((caseStudy) => (
              // --- START: THIS IS THE FIX ---
              <Link
                key={caseStudy.id}
                href={`/dashboard/services/${service.id}/case-studies/${caseStudy.id}`}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group h-full">
                  <div className="aspect-video relative">
                    <Image
                      src={caseStudy.bannerImageUrl || "/placeholder.svg"}
                      alt={caseStudy.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {caseStudy.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {caseStudy.subtitle}
                    </p>
                  </CardContent>
                </Card>
              </Link>
              // --- END: THIS IS THE FIX ---
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Testimonials
            </h2>
            <p className="text-gray-600">What Our Clients Say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.testimonials.map((testimonial, index) => {
              const TestimonialCard = (
                <Card
                  className={`bg-[#7642FE] text-white h-full ${
                    testimonial.link ? "cursor-pointer" : ""
                  }`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="mb-6 text-white/90">{testimonial.quote}</p>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={testimonial.authorImageUrl || "/placeholder.svg"}
                        alt={testimonial.authorName}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">
                          {testimonial.authorName}
                        </p>
                        <p className="text-sm text-white/70">
                          {testimonial.authorTitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );

              return testimonial.link ? (
                <Link
                  key={index}
                  href={testimonial.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-[1.02] transition-transform"
                >
                  {TestimonialCard}
                </Link>
              ) : (
                <div key={index}>{TestimonialCard}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- START: NEW FAQ Section --- */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Have questions? We've got answers.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}
      {/* --- END: NEW FAQ Section --- */}

      {/* CTA Section */}
      <section className="bg-[#4A1A5C] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            {service.bannerText}
          </h2>
          {/* --- FIX #3: Added Link to final CTA Button --- */}
          <Button
            asChild
            className="bg-white text-[#4A1A5C] hover:bg-gray-100 px-8 py-3 text-lg"
          >
            <Link href={`/dashboard/services/${service.id}/request`}>
              Request Service
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
