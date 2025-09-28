/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client"; // Required for using state and event listeners in Next.js App Router
import { useState } from "react"; // Import useState for managing mobile menu state
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Heart,
  Lightbulb,
  BarChart,
  Send,
  Search,
  Megaphone,
  PenTool,
  Code,
  Users,
  Newspaper,
  Menu, // Import Menu icon for hamburger button
  X, // Import X icon for the close button
} from "lucide-react";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Landing1 from "../../public/landing-1.png";
import Landing2 from "../../public/landing-2.png";
import Landing3 from "../../public/landing-3.png";
import Link from "next/link";

// You can create a simple Logo component like this or just use an Image tag.
const Logo = () => (
  <div className="bg-[#7642FE] text-white font-bold text-3xl p-2 px-4 rounded-lg">
    DMA
  </div>
);

const services = [
  {
    icon: <Search className="h-6 w-6 text-gray-800" />,
    title: "Search Engine Optimization (SEO)",
    description: "Get your business found by the right customers.",
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: <Megaphone className="h-6 w-6 text-gray-800" />,
    title: "Social Media Marketing",
    description: "Transform your social presence into a sales engine.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: <PenTool className="h-6 w-6 text-gray-800" />,
    title: "Content Marketing",
    description: "Tell your story, attract your audience.",
    imageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: <Code className="h-6 w-6 text-gray-800" />,
    title: "Web Design & Development",
    description: "Build your dream online presence.",
    imageUrl:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: <BarChart className="h-6 w-6 text-gray-800" />,
    title: "Digital Marketing Strategy",
    description: "Develop a clear roadmap for online success.",
    imageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: <Users className="h-6 w-6 text-gray-800" />,
    title: "Influencer Marketing",
    description: "Amplify your brand's reach through authentic voices.",
    imageUrl:
      "https://images.unsplash.com/photo-1585255285330-aae636831416?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: <Newspaper className="h-6 w-6 text-gray-800" />,
    title: "Public Relations (PR) & Online Reputation Management",
    description: "Build trust and protect your brand's image.",
    imageUrl:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop",
  },
];
const ServiceCard = ({ icon, title, description, imageUrl }: any) => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full">
    <div className="relative">
      <img src={imageUrl} alt={title} className="w-full h-36 object-cover" />
      <div className="absolute top-3 left-3 bg-white rounded-full p-2.5 shadow-md">
        {icon}
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-bold text-gray-900 leading-snug">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainServices = services.slice(0, 6);
  const lastService = services.length > 6 ? services[6] : null;

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Add smooth scrolling behavior */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="#" className="text-[#7642FE] font-semibold">
              Home
            </Link>
            <Link href="#about-us" className="hover:text-[#7642FE]">
              About Us
            </Link>
            <Link
              href="#services"
              className="hover:text-[#7642FE] flex items-center"
            >
              Services <ChevronDown className="w-4 h-4 ml-1" />
            </Link>
            <Link href="#contact" className="hover:text-[#7642FE]">
              Contact Us
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost">
              <Link href={"/login"}>Sign In</Link>
            </Button>
            <Button className="bg-[#7642FE] hover:bg-purple-700">
              <Link href={"/signup"}>Sign Up</Link>
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-sm absolute w-full shadow-lg">
            <div className="flex flex-col items-start space-y-4 p-6">
              <Link
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#7642FE] font-semibold"
              >
                Home
              </Link>
              <Link
                href="#about-us"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#7642FE]"
              >
                About Us
              </Link>
              <Link
                href="#services"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#7642FE]"
              >
                Services
              </Link>
              <Link
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#7642FE]"
              >
                Contact Us
              </Link>
              <div className="w-full flex flex-col space-y-2 pt-4 border-t">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href={"/login"}>Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-[#7642FE] hover:bg-purple-700 w-full"
                >
                  <Link href={"/signup"}>Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 "></div>
          <div className="container mx-auto px-6 relative">
            <p className="text-gray-600 mb-4">
              Connecting Businesses With The Right
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Digital <span className="text-[#7642FE]">Marketing</span> Services
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 mb-8">
              We turn clicks to customers, our data driven strategies increase
              your brand visibility, boost conversions and maximize your return
              on investment.
            </p>
            <div className="space-x-4">
              <Button size="lg" className="bg-[#7642FE] hover:bg-purple-700">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Get In Touch
              </Button>
            </div>
          </div>
        </section>

        {/* Image below Hero */}
        <section className="container mx-auto px-6 -mt-10">
          <Image
            src={Landing1}
            alt="Digital Marketing Team"
            className="rounded-xl w-full"
          />
        </section>

        {/* Stats Bar */}
        <section className="bg-[#7642FE] text-white py-12 mt-16">
          <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold">12</p>
              <p>Digital Marketing Services</p>
            </div>
            <div>
              <p className="text-4xl font-bold">300+</p>
              <p>Satisfied Clients</p>
            </div>
            <div>
              <p className="text-4xl font-bold">1200+</p>
              <p>Successful Campaigns Delivered</p>
            </div>
            <div>
              <p className="text-4xl font-bold">24/7</p>
              <p>Support and Assistance</p>
            </div>
          </div>
        </section>

        {/* What Drives Us Section */}
        <section
          id="about-us"
          className="relative w-full py-20 lg:py-32 overflow-hidden"
          style={{
            background:
              "linear-gradient(100deg, #fefce8 10%, #ffffff 50%, #f3e8ff 90%)",
          }}
        >
          <div className="container mx-auto px-6">
            {/* Flex container to align the images and the central text content */}
            <div className="flex justify-center items-center gap-8">
              {/* Left Image Placeholder - hidden on smaller screens */}
              <div className="hidden lg:block transform -rotate-3">
                <div
                  className="w-72 h-[26rem] rounded-full overflow-hidden shadow-2xl"
                  style={{ borderRadius: "30rem" }}
                >
                  <Image
                    src={Landing2}
                    alt="A person working on a laptop"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Central Content */}
              <div className="text-center max-w-2xl mx-auto z-10">
                {/* Circular Graphic Element */}
                <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center rounded-full relative">
                  {/* Animated rotating text using SVG */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full animate-spin"
                    style={{
                      animationDuration: "20s",
                      animationDirection: "reverse",
                    }}
                  >
                    <path
                      id="circlePath"
                      fill="none"
                      d="M 10, 50 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    ></path>
                    <text>
                      <textPath
                        href="#circlePath"
                        className="text-[7px] font-semibold tracking-widest uppercase fill-gray-500"
                      >
                        Build a successful brand with digital marketing agency
                      </textPath>
                    </text>
                  </svg>
                  {/* Arrow Icon in the center */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#7642FE]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                      transform="rotate(45 12 12)"
                    />
                  </svg>
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
                  What Drives Digital
                  <br />
                  <span className="text-[#7642FE]">Marketing Agency?</span>
                </h2>

                {/* Paragraph Text */}
                <p className="max-w-xl mx-auto text-gray-600 mb-8">
                  Our Digital Marketing Agency platform was built to bridge the
                  gap between businesses and digital marketing services. We make
                  it easier for brands to discover, connect, and grow with the
                  right marketing solutions—all in one platform.
                </p>

                {/* Call to Action Button */}
                <Button className="bg-[#7642FE] text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition-all duration-300">
                  Read About Us
                </Button>
              </div>

              {/* Right Image Placeholder - hidden on smaller screens */}
              <div className="hidden lg:block transform rotate-3">
                <div
                  className="w-72 h-[26rem] rounded-full overflow-hidden shadow-2xl"
                  style={{ borderRadius: "30rem" }}
                >
                  <Image
                    src={Landing3}
                    alt="A person working at a computer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section 1 */}
        <section className="container mx-auto px-6 my-10">
          {/* Main container with purple background, rounded corners, and relative positioning */}
          <div className="bg-[#7642FE] text-white rounded-2xl p-12 text-center relative overflow-hidden">
            {/* Decorative SVG Shapes positioned absolutely */}
            {/* Left Side Shape */}
            <div className="absolute left-0 bottom-0 text-[#7642FE] opacity-50 -translate-x-1/4 translate-y-1/4">
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M199 100C199 45.2285 154.771 1 100 1C45.2285 1 1 45.2285 1 100"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M1 100C1 154.771 45.2285 199 100 199"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Right Side Shape */}
            <div className="absolute right-0 bottom-0 text-[#7642FE] opacity-50 translate-x-1/4 translate-y-1/4">
              <svg
                width="150"
                height="150"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 100C1 154.771 45.2285 199 100 199C154.771 199 199 154.771 199 100"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Search Icon SVG */}
            <div className="absolute top-8 right-8 text-white/80 hidden sm:block">
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="45"
                  cy="45"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="10"
                />
                <line
                  x1="68"
                  y1="68"
                  x2="90"
                  y2="90"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Content container with z-index to stay above the shapes */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 max-w-4xl mx-auto">
                Ready to take your business to the next level? Let us help you
                find the right digital marketing service and connect you with
                the experts who can help your brand grow
              </h2>
              <Button className="bg-transparent border border-white/75 text-white font-semibold py-2 px-6 rounded-lg hover:bg-white hover:text-[#7642FE] transition-colors duration-300">
                Request Service
              </Button>
            </div>
          </div>
        </section>

        {/* Popular Services Section */}
        <div className="bg-white font-sans" id="services">
          <div className="container mx-auto px-6 lg:px-20 py-24">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                Popular <span className="text-[#7642FE]">Services.</span>
              </h2>
              <p className="mt-5 text-base text-gray-600 leading-relaxed">
                Don't let your messages go unseen. With our email marketing
                service, you can build real relationships with your audience,
                deliver personalized experiences, and drive consistent sales.
                Let your emails work smarter — not harder.
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {mainServices.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>

            {lastService && (
              <div className="mt-8 flex justify-center">
                <div className="w-full sm:w-1/2 lg:w-1/3 sm:px-3">
                  <ServiceCard {...lastService} />
                </div>
              </div>
            )}

            <div className="mt-20 text-center">
              <a
                href="#"
                className="text-sm text-[#7642FE] font-semibold hover:text-purple-700 transition-colors"
              >
                See all services
              </a>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <section className="py-20 container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            How it <span className="text-[#7642FE]">Works</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-12">
            Getting started with us is simple. In just a few steps, you can find
            the right digital marketing service, connect with trusted experts,
            and manage everything in one place — stress-free.
          </p>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Heart className="text-[#7642FE]" />
              </div>
              <h3 className="font-bold">Pick your goal</h3>
              <p className="text-sm text-gray-600">
                Choose your preferred service
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Lightbulb className="text-[#7642FE]" />
              </div>
              <h3 className="font-bold">Create a free account</h3>
              <p className="text-sm text-gray-600">
                Sign up in minutes to manage your project
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Send className="text-[#7642FE]" />
              </div>
              <h3 className="font-bold">Make Payment</h3>
              <p className="text-sm text-gray-600">
                Complete your payment securely
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <BarChart className="text-[#7642FE]" />
              </div>
              <h3 className="font-bold">Track results</h3>
              <p className="text-sm text-gray-600">
                Monitor progress and stay updated
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Star className="text-[#7642FE]" />
              </div>
              <h3 className="font-bold">Share your feedback</h3>
              <p className="text-sm text-gray-600">
                Rate your experience and help us serve you better
              </p>
            </div>
          </div>
        </section>

        {/* Get In Touch Section */}
        <section className="py-20 bg-white" id="contact">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold">
                Get In <span className="text-[#7642FE]">Touch</span> With Us
                Today!
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 mt-4">
                Have questions or ready to get started? Our team is here to help
                you find the right digital marketing solution for your business.
              </p>
            </div>
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2 bg-[#7642FE] text-white p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-2 flex items-center">
                      <MapPin className="mr-2" /> Our Location
                    </h4>
                    <p>42 Kingsway Tower, Victoria Island, Lagos, Nigeria</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 flex items-center">
                      <Phone className="mr-2" /> Phone Number
                    </h4>
                    <p>+234 000 000 0000</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 flex items-center">
                      <Mail className="mr-2" /> Email address
                    </h4>
                    <p>hello@digitalmarketingagency.com</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input type="email" placeholder="Email Address" />
                    <Input type="tel" placeholder="Phone Number" />
                  </div>
                  <div>
                    <select className="w-full p-2 border rounded">
                      <option>Service Type</option>
                      <option>SEO</option>
                      <option>Social Media</option>
                    </select>
                  </div>
                  <Textarea placeholder="Your Message" rows={5} />
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-[#7642FE] hover:bg-purple-700 w-full"
                  >
                    Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="container mx-auto px-6 py-16">
          <div className="bg-[#7642FE] text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Ahead With Digital Marketing Agency
            </h2>
            <p className="max-w-xl mx-auto mb-8">
              Get the latest tips, insights, and updates on digital marketing
              delivered straight to your inbox. No spam, just value.
            </p>
            <form className="max-w-md mx-auto flex gap-2">
              <Input
                type="email"
                placeholder="Enter Email"
                className="bg-white text-gray-800"
              />
              <Button
                type="submit"
                className="bg-white text-[#7642FE] hover:bg-gray-200"
              >
                Subscribe Now
              </Button>
            </form>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">FAQs</h2>
            <p className="max-w-2xl mx-auto text-gray-600 mt-4">
              Get quick solutions to popular questions in our FAQ, giving you
              essential info at a glance.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="FAQ"
                className="rounded-lg shadow-lg"
              />
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How long does it take to see results from email marketing?
                </AccordionTrigger>
                <AccordionContent>
                  The timeframe for seeing results can vary depending on your
                  industry, audience, and the goals of your campaigns.
                  Generally, you can start seeing increased engagement and
                  initial conversions within a few weeks of consistent
                  campaigning. Building a strong, responsive email list and
                  achieving significant ROI often takes a few months.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I provide my own email list?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can provide your own email list. However, we
                  recommend a verification process to ensure the list is clean
                  and compliant with anti-spam laws, which helps improve
                  deliverability and campaign performance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Do you manage subscriber lists?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely. We manage subscriber lists, including
                  segmentation, cleanup of inactive subscribers, and growth
                  strategies to ensure your list remains healthy and engaged.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Do I need to share my email platform login?
                </AccordionTrigger>
                <AccordionContent>
                  For us to manage your campaigns effectively, we would
                  typically need access to your email marketing platform. We can
                  work with you to set up appropriate user permissions to ensure
                  security.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Can I request changes to the email content or design
                  mid-campaign?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we are flexible and can accommodate changes. We'll work
                  with you to make necessary adjustments, keeping in mind that
                  significant changes might affect the campaign timeline and
                  performance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
