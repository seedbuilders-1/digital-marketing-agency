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
import { Star, Check, AlertCircle, X, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGetServiceByIdQuery } from "@/api/servicesApi";
import { useState } from "react";
import DMALogo from "../../../../public/dma_svg.svg";
import Footer from "@/components/layout/footer";

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log("serviceData", serviceData);
  console.log("error", error);

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
          <Link href="/">Back to Our Services</Link>
        </Button>
      </div>
    );
  }
  const Logo = () => (
    <Image
      src={DMALogo}
      alt="Digital Marketing Agency Nigeria Logo"
      width={120}
      height={40}
    />
  );

  return (
    <>
      <div>
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Logo />
            {/* Desktop Navigation: Clear, concise, and captivating */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className="text-[#7642FE] font-bold transition-colors hover:text-purple-700"
              >
                Home
              </Link>
              <Link
                href="/#about-us"
                className="text-gray-700 font-medium hover:text-[#7642FE] transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/#services"
                className="text-gray-700 font-medium hover:text-[#7642FE] transition-colors flex items-center group"
              >
                Services{" "}
                {/* <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" /> */}
              </Link>
              <Link
                href="/#contact"
                className="text-gray-700 font-medium hover:text-[#7642FE] transition-colors"
              >
                Contact Us
              </Link>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-[#7642FE] hover:bg-purple-50"
              >
                <Link href={"/login"}>Sign In</Link>
              </Button>
              <Button className="bg-[#7642FE] hover:bg-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all">
                <Link href={"/signup"}>Sign Up</Link>
              </Button>
            </div>
            {/* Mobile Menu Button: Responsive and intuitive */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-7 w-7 text-gray-700" />
                ) : (
                  <Menu className="h-7 w-7 text-gray-700" />
                )}
              </button>
            </div>
          </nav>
          {/* Mobile Menu: A clean, accessible overlay */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-md absolute w-full shadow-lg border-t border-gray-100">
              <div className="flex flex-col items-start space-y-5 p-6">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#7642FE] font-bold text-lg"
                >
                  Home
                </Link>
                <Link
                  href="/#about-us"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-[#7642FE] text-lg"
                >
                  About Us
                </Link>
                <Link
                  href="/#services"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-[#7642FE] text-lg"
                >
                  Services
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-[#7642FE] text-lg"
                >
                  Contact Us
                </Link>
                <div className="w-full flex flex-col space-y-3 pt-6 border-t border-gray-100">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-center text-lg text-gray-700 hover:text-[#7642FE] hover:bg-purple-50"
                  >
                    <Link href={"/login"}>Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-[#7642FE] hover:bg-purple-700 w-full text-lg font-semibold shadow-md"
                  >
                    <Link href={"/signup"}>Sign Up</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </header>
        <div className="min-h-screen bg-white">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center p-5">
            {service?.title}
          </h1>
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {service.heroHeadline}
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  {service.heroParagraph}
                </p>
                {/* --- FIX #1: Added Link to Request Service Button --- */}
                <Button
                  asChild
                  className="bg-[#7642FE] hover:bg-[#5f35cc] text-white px-8 py-3 text-lg"
                >
                  <Link href={"/signup"}>Request service</Link>
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
                    <p>{service.blueprintParagraph}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Plans */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Choose Your Plan
                </h2>
                <p className="text-lg text-gray-600">
                  Whether you're just starting or scaling up, we have the right
                  plan for you
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {service.plans.map((plan, index) => (
                  <Card key={index} className="flex flex-col">
                    <CardContent className="p-8 flex flex-col flex-grow">
                      {/* ... (Plan details) ... */}
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
                        asChild
                        className="w-full bg-[#7642FE] hover:bg-[#5f35cc] mb-6"
                      >
                        <Link href={"/signup"}>Choose this plan</Link>
                      </Button>

                      {/* ... (Plan features) ... */}
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Features:
                        </h4>
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
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
                ))}
              </div>
            </div>
          </section>

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
                {service.testimonials.map((testimonial, index) => (
                  <Card key={index} className="bg-[#7642FE] text-white">
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
                ))}
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
                <Link href={"/signup"}>Request Service</Link>
              </Button>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
