import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "digital-marketing",
    title: "Digital Marketing Strategy",
    description:
      "Comprehensive digital marketing strategy to grow your online presence",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cbqd3iq39PUZ0wYFrcsVz9Hcxc0nw7.png",
    price: "From ₦120,000",
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    description: "Engage your audience across all social media platforms",
    image: "/social-media-marketing.png",
    price: "From ₦80,000",
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    description:
      "Create compelling content that drives engagement and conversions",
    image: "/content-marketing-strategy.png",
    price: "From ₦100,000",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Services Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-gray-600 text-lg">
            Choose from our comprehensive range of digital marketing services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#7642FE]">
                    {service.price}
                  </span>
                  <Button asChild className="bg-[#7642FE] hover:bg-[#5f35cc]">
                    <Link href={`/services/${service.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
