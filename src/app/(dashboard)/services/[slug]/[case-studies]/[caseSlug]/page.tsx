import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const caseStudyData = {
  "mindspare-institute": {
    title: "Mindspare Institute",
    subtitle: "Online Education Provider",
    heroImage: "/online-education-learning.png",
    challenge: {
      title: "The Challenge",
      description:
        "Mindspare Institute, an online education provider specializing in professional development courses, had a good product but struggled to scale their student enrollments over one year. Their cost per acquisition (CPA) for new students decreased by 18% due to optimized targeting and a more efficient funnel. The clear strategy allowed them to confidently invest more in digital marketing, leading to sustained growth.",
      image: "/education-challenge-online-learning.png",
    },
    solution: {
      title: "Solution",
      description:
        "Our team developed an end-to-end digital strategy focused on content marketing, social media discovery, building robust email marketing funnels for lead nurturing, designing targeted social media ad campaigns (Facebook, LinkedIn), and outlining a content strategy for thought leadership. The plan included detailed budget allocation and projected ROI.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0Hz7hgLBzZtDJACNLPk8jhSahRTRZC.png",
    },
    result: {
      title: "The Result",
      description:
        "The strategic framework provided by our team enabled Mindspare Institute to achieve a 50% increase in course enrollments over one year. Their cost per acquisition (CPA) for new students decreased by 18% due to optimized targeting and a more efficient funnel. The clear strategy allowed them to confidently invest more in digital marketing, leading to sustained growth.",
      image: "/education-growth-success.png",
    },
  },
};

export default function CaseStudyDetailPage({
  params,
}: {
  params: { slug: string; caseSlug: string };
}) {
  const caseStudy =
    caseStudyData[params.caseSlug as keyof typeof caseStudyData];

  if (!caseStudy) {
    return <div>Case study not found</div>;
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
            href={`/services/${params.slug}`}
            className="hover:text-[#7642FE]"
          >
            Digital Marketing
          </Link>
          <span>/</span>
          <span className="text-[#7642FE]">Case study</span>
        </div>
      </div>

      {/* Case Study Header */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <span className="text-sm text-[#7642FE] font-medium">
            Case study 1
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          "{caseStudy.title}"
        </h1>
        <p className="text-xl text-gray-600 mb-8">{caseStudy.subtitle}</p>

        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src={caseStudy.heroImage || "/placeholder.svg"}
            alt={caseStudy.title}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src={caseStudy.challenge.image || "/placeholder.svg"}
                alt="Challenge"
                width={500}
                height={400}
                className="rounded-lg"
              />
              <div className="absolute top-4 left-4 w-12 h-12 bg-[#7642FE] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">?</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {caseStudy.challenge.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {caseStudy.challenge.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-[#7642FE] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6">Solution</h2>
              <p className="leading-relaxed">
                {caseStudy.solution.description}
              </p>
            </div>
            <div className="relative">
              <Image
                src={caseStudy.solution.image || "/placeholder.svg"}
                alt="Solution"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Result Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src={caseStudy.result.image || "/placeholder.svg"}
                alt="Result"
                width={500}
                height={400}
                className="rounded-lg"
              />
              <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 border-2 border-[#7642FE] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#7642FE] rounded-full"></div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {caseStudy.result.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {caseStudy.result.description}
              </p>
            </div>
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

      {/* More Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            More case studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/hospital-healthcare-medical.png"
                  alt="Nova Hospitals"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nova Hospitals
                </h3>
                <p className="text-gray-600">
                  Private Healthcare Facility, Nigeria
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/agriculture-technology-farm.png"
                  alt="FarmReach"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  FarmReach
                </h3>
                <p className="text-gray-600">Agri-Tech Startup, Nigeria</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
