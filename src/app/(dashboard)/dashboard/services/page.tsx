"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useGetAllPublicServicesQuery } from "@/api/servicesApi";
import { AlertCircle } from "lucide-react";

// 1. Define types to match your API data structure
interface Plan {
  price: string;
}

interface Service {
  id: string;
  title: string;
  isPublic: boolean;
  heroParagraph: string;
  heroImageUrl: string;
  plans: Plan[];
}

// A reusable skeleton card component for the loading state
const ServiceCardSkeleton = () => (
  <Card className="overflow-hidden animate-pulse">
    <div className="aspect-video relative bg-gray-200"></div>
    <CardContent className="p-6">
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded mb-4"></div>
      <div className="flex items-center justify-between">
        <div className="h-7 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-10 w-1/4 bg-gray-300 rounded-md"></div>
      </div>
    </CardContent>
  </Card>
);

export default function ServicesPage() {
  // 2. Fetch data using the hook
  const {
    data: servicesData,
    isLoading,
    isError,
    error,
  } = useGetAllPublicServicesQuery(undefined);

  console.log("err", error);

  // 3. Filter for public services and memoize the result
  const publicServices: Service[] = servicesData?.data || [];
  console.log("publicServices", publicServices);

  const renderServiceGrid = () => {
    if (isLoading) {
      return (
        // Show a grid of skeletons while loading
        Array.from({ length: 3 }).map((_, index) => (
          <ServiceCardSkeleton key={index} />
        ))
      );
    }

    if (isError) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center text-red-500 bg-red-50 p-8 rounded-lg">
          <AlertCircle className="h-10 w-10 mb-2" />
          <p className="text-lg font-semibold">Failed to load services.</p>
          <p>Please try again later.</p>
        </div>
      );
    }

    if (publicServices.length === 0) {
      return (
        <div className="col-span-full text-center text-gray-500 py-16">
          <h2 className="text-2xl font-semibold">No Services Available</h2>
          <p>Please check back later to see what we have to offer.</p>
        </div>
      );
    }

    return publicServices.map((service) => {
      // 4. Derive the price from the first plan, with a fallback
      // const price = service.plans?.[0]?.price
      //   ? `From ₦${Number(service.plans[0].price).toLocaleString()}`
      //   : "Contact for Price";

      return (
        <Card
          key={service.id}
          className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
        >
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={service.heroImageUrl || "/placeholder.svg"}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardContent className="p-6 flex flex-col h-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-4 flex-grow whitespace-pre-line">
              {service.heroParagraph}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t">
              {/* <span className="text-lg font-semibold text-[#7642FE]">
                {price}
              </span> */}
              <Button asChild className="bg-[#7642FE] hover:bg-[#5f35cc]">
                <Link href={`/dashboard/services/${service.id}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our comprehensive range of digital marketing services
            designed to elevate your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Render the grid based on the API state */}
          {renderServiceGrid()}
        </div>
      </main>
    </div>
  );
}
