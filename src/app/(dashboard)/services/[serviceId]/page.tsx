"use client";

import { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getServiceDetail } from "@/lib/constants/service-details";
import Image from "next/image";
import { useState } from "react";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.serviceId as string;
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const serviceDetail = getServiceDetail(serviceId);

  if (!serviceDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Service Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested service could not be found.
          </p>
          <Button onClick={() => router.push("/services")}>
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  const handleRequestService = () => {
    router.push(`/dashboard/services/${serviceId}/request`);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev + 1) % serviceDetail.testimonials.reviews.length
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? serviceDetail.testimonials.reviews.length - 1 : prev - 1
    );
  };

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="px-6 py-4 border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Our Services</span>
              <span>/</span>
              <span className="text-[#542FB4]">{serviceDetail.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {serviceDetail.hero.headline.split("attention.")[0]}
                  <span className="text-[#542FB4]">attention.</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  {serviceDetail.hero.subheadline}
                </p>
                <Button
                  onClick={handleRequestService}
                  className="bg-[#542FB4] hover:bg-[#4a2a9e] text-white px-8 py-3 text-lg"
                >
                  Request service
                </Button>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={
                      serviceDetail.hero.heroImage ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt={serviceDetail.title}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    priority
                  />
                  {/* Rating Overlay */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    {[...Array(serviceDetail.hero.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src={
                    serviceDetail.strategy.image ||
                    "/placeholder.svg?height=400&width=500"
                  }
                  alt={serviceDetail.strategy.title}
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {serviceDetail.strategy.title.split("SEO")[0]}
                  <span className="text-[#542FB4]">
                    {serviceDetail.strategy.title.includes("SEO")
                      ? "SEO"
                      : serviceDetail.category}
                  </span>
                  {serviceDetail.strategy.title.split("SEO")[1] ||
                    serviceDetail.strategy.title.split(
                      serviceDetail.category
                    )[1]}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {serviceDetail.strategy.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 bg-[#542FB4] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-full"></div>
          </div>
          <div className="absolute top-8 right-8">
            <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl font-bold mb-8">
              {serviceDetail.cta.title}
            </h2>
            <Button
              onClick={handleRequestService}
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#542FB4] px-8 py-3 text-lg"
            >
              Request Service
            </Button>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {serviceDetail.pricing.title}
              </h2>
              <p className="text-gray-600">{serviceDetail.pricing.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {serviceDetail.pricing.plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative ${
                    plan.popular ? "ring-2 ring-[#542FB4]" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-[#542FB4] text-white">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <Badge variant="outline" className="mb-4">
                        {plan.name}
                      </Badge>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {plan.price}
                        <span className="text-sm font-normal text-gray-600">
                          {plan.period}
                        </span>
                      </div>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                    <Button
                      onClick={handleRequestService}
                      className={`w-full mb-6 ${
                        plan.popular
                          ? "bg-[#542FB4] hover:bg-[#4a2a9e] text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      Choose this plan
                    </Button>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Features:
                      </h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#542FB4] rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                <span className="text-[#542FB4]">
                  {serviceDetail.caseStudies.title.split(" ")[0]}
                </span>{" "}
                {serviceDetail.caseStudies.title.split(" ").slice(1).join(" ")}
              </h2>
              <p className="text-gray-600">
                {serviceDetail.caseStudies.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {serviceDetail.caseStudies.studies.map((study, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64">
                    <Image
                      src={
                        study.image || "/placeholder.svg?height=256&width=400"
                      }
                      alt={study.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="font-bold text-lg mb-1">
                          {study.title}
                        </h3>
                        <p className="text-sm text-white/90">
                          {study.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {serviceDetail.testimonials.title}
              </h2>
              <p className="text-gray-600">
                {serviceDetail.testimonials.subtitle}
              </p>
            </div>

            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {serviceDetail.testimonials.reviews.map((review, index) => (
                <Card key={index} className="bg-[#542FB4] text-white">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-white text-white"
                        />
                      ))}
                      <span className="ml-2 text-sm">{review.rating}/5</span>
                    </div>
                    <p className="text-white/90 mb-6 leading-relaxed">
                      {review.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          review.author.avatar ||
                          "/placeholder.svg?height=40&width=40"
                        }
                        alt={review.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{review.author.name}</p>
                        <p className="text-sm text-white/70">
                          {review.author.role} at {review.author.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <Card className="bg-[#542FB4] text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[
                      ...Array(
                        serviceDetail.testimonials.reviews[currentTestimonial]
                          .rating
                      ),
                    ].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-white text-white" />
                    ))}
                    <span className="ml-2 text-sm">
                      {
                        serviceDetail.testimonials.reviews[currentTestimonial]
                          .rating
                      }
                      /5
                    </span>
                  </div>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    {
                      serviceDetail.testimonials.reviews[currentTestimonial]
                        .text
                    }
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        serviceDetail.testimonials.reviews[currentTestimonial]
                          .author.avatar ||
                        "/placeholder.svg?height=40&width=40"
                      }
                      alt={
                        serviceDetail.testimonials.reviews[currentTestimonial]
                          .author.name
                      }
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">
                        {
                          serviceDetail.testimonials.reviews[currentTestimonial]
                            .author.name
                        }
                      </p>
                      <p className="text-sm text-white/70">
                        {
                          serviceDetail.testimonials.reviews[currentTestimonial]
                            .author.role
                        }{" "}
                        at{" "}
                        {
                          serviceDetail.testimonials.reviews[currentTestimonial]
                            .author.company
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="rounded-full w-10 h-10 p-0 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="rounded-full w-10 h-10 p-0 bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {serviceDetail.faq.title}
                </h2>
                <p className="text-gray-600 mb-8">
                  {serviceDetail.faq.subtitle}
                </p>
                <div className="relative">
                  <Image
                    src={
                      serviceDetail.faq.image ||
                      "/placeholder.svg?height=300&width=400"
                    }
                    alt="FAQ"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
              <div>
                <Accordion type="single" collapsible className="space-y-4">
                  {serviceDetail.faq.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-white rounded-lg border"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                        <span className="font-semibold text-gray-900">
                          {faq.question}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[#542FB4] text-white flex items-center justify-center text-sm ml-4 flex-shrink-0">
                          +
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
