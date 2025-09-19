import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const serviceData = {
  "digital-marketing": {
    title: "Digital Marketing Strategy",
    subtitle:
      "Your Blueprint for Online Growth—Tailored, Strategic, and Results-Driven.",
    description:
      "Without a solid plan, digital marketing can feel scattered and wasteful. Our Digital Marketing Strategy service aligns your goals with a custom roadmap that connects the dots across SEO, content, social media, ads, and analytics.",
    additionalDescription:
      "We analyze your audience, competitors, and current efforts, then guide you on what channels to use, what messages to share, how to manage your budget, and how to track results.",
    finalDescription:
      "No fluff—just focused, actionable strategy designed to help your brand grow smarter and faster online. Let's make your digital presence count.",
    heroImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-T1pqCB9L78N8FimwnRohEIe9pz3c55.png",
    plans: [
      {
        name: "Basic Package",
        price: "₦120,000",
        period: "/month",
        description: "For new businesses",
        features: [
          "Business & audience audit",
          "30-day marketing strategy",
          "Channel & content recommendations",
          "Basic campaign roadmap",
          "1 strategy document",
          "1 review session",
          "1 round of edits",
          "Delivery Timeline: strategy completed in 7-10 business days",
        ],
      },
      {
        name: "Standard Package",
        price: "₦200,000",
        period: "/month",
        description: "For growing businesses",
        features: [
          "Full marketing audit",
          "60-day strategy plan",
          "Clear funnel mapping",
          "Multi-channel strategy (e.g. email + social + ads)",
          "Budget planning with KPIs",
          "Campaign roadmap with timelines",
          "Strategy report with 2 review sessions",
          "2 rounds of edits",
          "1 strategy consultation call included for discussion, refinement, and Q&A",
          "Delivery Timeline: strategy completed within 10-15 working days",
        ],
      },
      {
        name: "Premium Package",
        price: "₦350,000",
        period: "/month",
        description: "For established businesses",
        features: [
          "Full audit and competitor benchmarking",
          "90-day multi-channel marketing strategy",
          "Funnel optimization plan",
          "Content calendar with platform-specific ideas",
          "Budget breakdown by channel",
          "Tools & automation recommendations",
          "Weekly check-ins for 1 month",
          "Final strategy deck with unlimited revisions (within scope)",
          "2 strategy consultation calls included for discussion, refinement, and Q&A",
          "Delivery Timeline: strategy completed within 15-20 working days, weekly check-in for",
        ],
      },
    ],
    caseStudies: [
      {
        id: "farmreach",
        title: "FarmReach",
        subtitle: "Agri-Tech Startup, Nigeria",
        image: "/agriculture-technology-farm.png",
        description:
          "Increased online visibility and user engagement for agricultural technology platform",
      },
      {
        id: "nova-hospitals",
        title: "Nova Hospitals",
        subtitle: "Private Healthcare Facility, Nigeria",
        image: "/hospital-healthcare-medical.png",
        description:
          "Enhanced digital presence and patient acquisition for healthcare facility",
      },
      {
        id: "mindspare-institute",
        title: "Mindspare Institute",
        subtitle: "Online Education Provider",
        image: "/online-graduation.png",
        description:
          "Boosted course enrollments and brand awareness for online education platform",
      },
    ],
    testimonials: [
      {
        rating: 5,
        text: "They didn't just give us a document; they walked us through every step and ensured we understood the why behind each recommendation. We now have a clear path to increasing our online sales and brand presence. Excellent work, I highly recommend.",
        author: "Nike B.",
        position: "E-commerce Lead at Fashion Forward Collective",
        avatar: "/professional-woman-diverse.png",
      },
      {
        rating: 5,
        text: "We were doing a bit of everything online but not seeing the results we wanted. Their digital marketing strategy gave us exactly what we needed. Now we have a clear, actionable plan that aligns with our business goals. It's been transformative!",
        author: "Tola A.",
        position: "CEO of Urban Lifestyle Brands",
        avatar: "/professional-man.png",
      },
    ],
  },
};

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = serviceData[params.slug as keyof typeof serviceData];

  if (!service) {
    return <div>Service not found</div>;
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
          <span className="text-[#7642FE]">Digital Marketing</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Don't just show up online—show up with{" "}
              <span className="text-[#7642FE]">purpose</span>.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A clear digital marketing strategy puts your business in the right
              place, in front of the right people, with the right message. We
              help you build a plan that connects your goals with smart
              execution—so every effort counts.
            </p>
            <Button className="bg-[#7642FE] hover:bg-[#5f35cc] text-white px-8 py-3 text-lg">
              Request service
            </Button>
          </div>
          <div className="relative">
            <Image
              src={service.heroImage || "/placeholder.svg"}
              alt="Digital Marketing"
              width={600}
              height={400}
              className="rounded-lg"
            />
            <div className="absolute -bottom-4 -left-4 bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cbqd3iq39PUZ0wYFrcsVz9Hcxc0nw7.png"
                alt="Digital Strategy"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {service.subtitle}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>{service.description}</p>
                <p>{service.additionalDescription}</p>
                <p>{service.finalDescription}</p>
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
              Whether you're just starting or scaling up, we have the right plan
              for you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.plans.map((plan, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-8">
                  <Badge
                    variant="outline"
                    className="mb-4 text-[#7642FE] border-[#7642FE]"
                  >
                    {plan.name}
                  </Badge>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <Button className="w-full bg-[#7642FE] hover:bg-[#5f35cc] mb-6">
                    Choose this plan
                  </Button>
                  <div>
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

      {/* Case Studies */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              CASE <span className="text-[#7642FE]">Studies</span>
            </h2>
            <p className="text-gray-600">Check out our case studies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.id}
                href={`/services/${params.slug}/case-studies/${caseStudy.id}`}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video relative">
                    <Image
                      src={caseStudy.image || "/placeholder.svg"}
                      alt={caseStudy.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white bg-black bg-opacity-70 p-2 rounded mb-2">
                      {caseStudy.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {caseStudy.subtitle}
                    </p>
                  </CardContent>
                </Card>
              </Link>
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
            <p className="text-gray-600">
              What Our Clients Say About Our Email Marketing Service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#7642FE] text-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-6 text-white/90">{testimonial.text}</p>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-white/70">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#4A1A5C] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Let's build a strategy that turns online effort into real,
            measurable growth.
          </h2>
          <Button className="bg-white text-[#4A1A5C] hover:bg-gray-100 px-8 py-3 text-lg">
            Request Service
          </Button>
        </div>
      </section>
    </div>
  );
}
