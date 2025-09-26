/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useGetServiceByIdQuery } from "@/api/servicesApi";
import { AlertCircle } from "lucide-react";

// 1. Define detailed types to match your API data structure
interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  bannerImageUrl: string;
  challenge: string;
  challengeImageUrl: string;
  solution: string;
  solutionImageUrl: string;
  result: string;
  resultImageUrl: string;
}

interface Service {
  id: string;
  title: string;
  caseStudies: CaseStudy[];
  bannerText: string;
}

// 2. A detailed skeleton component for the case study page
const CaseStudyDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="h-4 w-1/4 bg-gray-200 rounded mb-8"></div>
      <div className="h-10 w-3/4 bg-gray-200 rounded mb-3"></div>
      <div className="h-6 w-1/2 bg-gray-200 rounded mb-8"></div>
      <div className="aspect-video bg-gray-200 rounded-lg"></div>
    </div>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
          <div>
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-3"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-3"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default function CaseStudyDetailPage({ params }: any) {
  const { slug: serviceId, caseSlug } = params;

  // 3. Fetch the parent service, which contains all its case studies
  const {
    data: serviceData,
    isLoading,
    isError,
  } = useGetServiceByIdQuery(serviceId);

  // 4. Use useMemo to efficiently find the current case study and filter for others
  const { caseStudy, otherCaseStudies, serviceTitle } = useMemo(() => {
    const service: Service | undefined = serviceData?.data;
    if (!service) {
      return { caseStudy: undefined, otherCaseStudies: [], serviceTitle: "" };
    }

    const current = service.caseStudies.find((cs) => cs.id === caseSlug);
    const others = service.caseStudies.filter((cs) => cs.id !== caseSlug);

    return {
      caseStudy: current,
      otherCaseStudies: others,
      serviceTitle: service.title,
    };
  }, [serviceData, caseSlug]);

  // 5. Handle loading, error, and not found states
  if (isLoading) {
    return <CaseStudyDetailSkeleton />;
  }

  if (isError || !caseStudy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">
          Case Study Not Found
        </h1>
        <p className="text-gray-600 mt-2">
          We couldn't find the case study you're looking for.
        </p>
        <Button asChild className="mt-6 bg-[#7642FE] hover:bg-[#5f35cc]">
          <Link href={`/dashboard/services/${serviceId}`}>
            Back to Service Details
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/services" className="hover:text-[#7642FE]">
            Our Services
          </Link>
          <span>/</span>
          <Link
            href={`/dashboard/services/${serviceId}`}
            className="hover:text-[#7642FE]"
          >
            {serviceTitle}
          </Link>
          <span>/</span>
          <span className="text-[#7642FE]">Case study</span>
        </div>
      </div>

      {/* Case Study Header */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
          "{caseStudy.title}"
        </h1>
        <p className="text-xl text-gray-600 mb-8">{caseStudy.subtitle}</p>
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src={caseStudy.bannerImageUrl || "/placeholder.svg"}
            alt={caseStudy.title}
            fill
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video">
              <Image
                src={caseStudy.challengeImageUrl || "/placeholder.svg"}
                alt="Challenge"
                fill
                className="object-cover object-top rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Challenge
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-[#7642FE] py-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 relative aspect-video">
              <Image
                src={caseStudy.solutionImageUrl || "/placeholder.svg"}
                alt="Solution"
                fill
                className="object-cover object-top rounded-lg"
              />
            </div>
            <div className="lg:order-1">
              <h2 className="text-3xl font-bold mb-6">The Solution</h2>
              <p className="leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Result Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video">
              <Image
                src={caseStudy.resultImageUrl || "/placeholder.svg"}
                alt="Result"
                fill
                className="object-cover object-top rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Result
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {caseStudy.result}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#4A1A5C] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            {serviceData.data.bannerText}
          </h2>
          <Button className="bg-white text-[#4A1A5C] hover:bg-gray-100 px-8 py-3 text-lg">
            Request Service
          </Button>
        </div>
      </section>

      {/* More Case Studies */}
      {otherCaseStudies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              More case studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherCaseStudies.map((cs) => (
                <Link
                  key={cs.id}
                  href={`/dashboard/services/${serviceId}/case-studies/${cs.id}`}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-video relative">
                      <Image
                        src={cs.bannerImageUrl || "/placeholder.svg"}
                        alt={cs.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {cs.title}
                      </h3>
                      <p className="text-gray-600">{cs.subtitle}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
