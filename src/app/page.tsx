/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client"; // Absolutely crucial for our interactive components in Next.js!
import { useState } from "react"; // For that slick mobile menu toggle
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Heart,
  Lightbulb,
  Code,
  LayoutDashboard, // For the all-in-one platform
  Rocket,
  X,
  Menu,
  Zap,
  Wallet, // For focus on core areas
} from "lucide-react"; // A stellar icon set, as always!
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Landing1 from "../../public/dma-banner.jpg";
import Link from "next/link";
import DMALogo from "../../public/dma_svg.svg";
import { useGetAllPublicServicesQuery } from "@/api/servicesApi";
import { Service } from "@/lib/types/services";

// A simple, elegant Logo component – because branding is everything!
const Logo = () => (
  <Image
    src={DMALogo}
    alt="Digital Marketing Agency Nigeria Logo"
    width={100}
    height={40}
  />
);

// Our robust array of services, now with a punchier feel.

// A visually rich ServiceCard component – because every service deserves to shine!
const ServiceCard = ({ id, title, description, heroImageUrl }: any) => (
  <Link href={`/service/${id}`}>
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full group">
      <div className="relative h-40">
        <img
          src={heroImageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* <div className="absolute top-4 left-4 bg-white rounded-full p-3 shadow-md group-hover:rotate-6 transition-transform duration-300">
        {icon}
      </div> */}
      </div>
      <div className="p-6">
        <h3 className="font-extrabold text-xl text-gray-900 leading-tight group-hover:text-[#7642FE] transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

// The main event: our stunning LandingPage!
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: servicesData } = useGetAllPublicServicesQuery(undefined);

  // The actual services array is inside the response data
  const services: Service[] = servicesData?.data || [];
  console.log("srrvices", services);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-purple-50 text-gray-800 font-sans antialiased">
      {/* Smooth scrolling is a must for a polished experience! */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header: The command center for navigation */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          {/* Desktop Navigation: Clear, concise, and captivating */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="#"
              className="text-[#7642FE] font-bold transition-colors hover:text-purple-700"
            >
              Home
            </Link>
            <Link
              href="#about-us"
              className="text-gray-700 font-medium hover:text-[#7642FE] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="#services"
              className="text-gray-700 font-medium hover:text-[#7642FE] transition-colors flex items-center group"
            >
              Services{" "}
              <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
            </Link>
            <Link
              href="#contact"
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
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#7642FE] font-bold text-lg"
              >
                Home
              </Link>
              <Link
                href="#about-us"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[#7642FE] text-lg"
              >
                About Us
              </Link>
              <Link
                href="#services"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[#7642FE] text-lg"
              >
                Services
              </Link>
              <Link
                href="#contact"
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

      <main>
        {/* Hero Section: The grand entrance, clear and compelling */}
        <section className="relative isolate overflow-hidden bg-slate-900">
          {/* Background Gradients and Grid */}
          <div
            className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8F75FF] to-[#7642FE] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-slate-900/50 to-transparent -z-10"></div>

          {/* Content */}
          <div className="container mx-auto px-6 py-24 text-center sm:py-32 relative z-10">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Your Digital Marketing, Done in
                <span className="mt-2 block text-5xl sm:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-[#7642FE] to-indigo-400">
                  Hours — Not Weeks
                </span>
              </h1>
              <p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-slate-300">
                Why hire staff or chase agencies when you can get{" "}
                <strong className="font-semibold text-white">
                  professional digital marketing services instantly?
                </strong>{" "}
                With{" "}
                <strong className="font-semibold text-white">
                  Digital Marketing Agency Nigeria
                </strong>
                , individuals and businesses request exactly what they need —
                from{" "}
                <strong className="font-semibold text-white">
                  social media marketing to SEO, content creation, graphic
                  design, ads, and more
                </strong>{" "}
                — and receive it in{" "}
                <strong className="font-semibold text-white">
                  under 3 hours
                </strong>
                , all through one seamless platform.
              </p>
              <div className="mt-12 flex items-center justify-center gap-x-6">
                <Link
                  href="/signup"
                  className="group relative inline-flex items-center justify-center rounded-full bg-[#7642FE] px-8 py-3.5 text-lg font-semibold text-white shadow-2xl shadow-[#7642FE]/20 transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  Request Your First Service
                  <svg
                    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href="#about-us"
                  className="group text-lg font-semibold leading-6 text-slate-200 transition-colors duration-300 hover:text-white"
                >
                  Discover More{" "}
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 -mt-16 relative z-20 flex justify-center">
          <Image
            src={Landing1}
            width={1000}
            alt="Digital Marketing Team collaborating"
            className="rounded-3xl shadow-2xl border-4 border-white transform hover:scale-101 transition-transform duration-500"
          />
        </section>

        <section className="py-20 bg-white" id="about-us">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Digital Marketing Agency Nigeria: <br />
              <span className="text-[#7642FE]">
                The Future of Digital Growth.
              </span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Digital Marketing Agency Nigeria is Nigeria’s first-ever seamless,
              one-stop digital platform that connects individuals and businesses
              with premium digital marketing services at their fingertips, thus
              saving time and expenses.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              It is a platform that allows a client (individual or business) to
              request a service and get it done seamlessly at the proposed time
              of collection. Users retrieve their solutions and requests from
              their dashboards without stress or excessive communication,
              allowing them to focus on their work.
            </p>
            <Button
              size="lg"
              className="bg-[#7642FE] hover:bg-purple-700 text-white font-bold py-3 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Link href={"/signup"}>Start Your Journey</Link>
            </Button>
          </div>
        </section>

        {/* Why Businesses Are Switching to Us Section */}
        <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Why Businesses Are{" "}
              <span className="text-[#7642FE]">Switching to Us</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border-b-4 border-[#7642FE]">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <Zap className="text-[#7642FE] h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Speed That Matters
                </h3>
                <p className="text-gray-600 text-center">
                  Get your marketing request delivered in under 3 hours —
                  because your business can’t wait.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border-b-4 border-[#7642FE]">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <Wallet className="text-[#7642FE] h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Cost-Effective
                </h3>
                <p className="text-gray-600 text-center">
                  Only pay for the services you need. No overhead, no staff
                  salaries. Pure efficiency.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border-b-4 border-[#7642FE]">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <LayoutDashboard className="text-[#7642FE] h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  All-in-One Platform
                </h3>
                <p className="text-gray-600 text-center">
                  From SEO to social media campaigns, graphics, ads, and so on —
                  everything lives in your dashboard.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border-b-4 border-[#7642FE]">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <Star className="text-[#7642FE] h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Superb Process
                </h3>
                <p className="text-gray-600 text-center">
                  No endless phone calls or emails. Your work arrives, ready for
                  use, right where you need it.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <p className="text-xl font-semibold text-gray-800">
                Seamless Dashboard: Track, review, and collect all deliverables
                in one place.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Services Section: Where expertise meets opportunity */}
        <div className="bg-white font-sans py-24" id="services">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Our Core <span className="text-[#7642FE]">Services.</span>
              </h2>
              <p className="mt-6 text-xl text-gray-700 leading-relaxed">
                Unlock unparalleled growth with our comprehensive suite of
                digital marketing solutions. Each service is meticulously
                crafted to deliver measurable results and propel your brand
                forward.
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link
                href="#contact"
                className="inline-flex items-center text-xl text-[#7642FE] font-bold hover:text-purple-700 transition-colors group"
              >
                Explore All Our Solutions{" "}
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* How It Works Section: Simplicity in action */}
        <section className="py-24 bg-gradient-to-tl from-purple-50 to-indigo-50 container mx-auto px-6 text-center rounded-3xl shadow-inner my-16">
          <h2 className="text-5xl font-extrabold mb-6 text-gray-900">
            How It <span className="text-[#7642FE]">Works</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-700 mb-16 leading-relaxed">
            Getting started with us is effortlessly simple. In just a few steps,
            you'll be on your way to elevated digital marketing, connecting with
            trusted experts and managing everything from one intuitive platform.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12">
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#7642FE] text-white p-5 rounded-full mb-5 shadow-lg">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="font-extrabold text-xl text-gray-900 mb-2">
                Request a Service
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Choose precisely the digital marketing service you need.
              </p>
            </div>
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#7642FE] text-white p-5 rounded-full mb-5 shadow-lg">
                <Code className="h-8 w-8" />
              </div>
              <h3 className="font-extrabold text-xl text-gray-900 mb-2">
                Set Your Timeline
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us when you need it delivered – we work fast!
              </p>
            </div>
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#7642FE] text-white p-5 rounded-full mb-5 shadow-lg">
                <LayoutDashboard className="h-8 w-8" />
              </div>
              <h3 className="font-extrabold text-xl text-gray-900 mb-2">
                Track & Collect
              </h3>
              <p className="text-gray-600 leading-relaxed">
                View progress and retrieve your completed work from your
                dashboard.
              </p>
            </div>
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#7642FE] text-white p-5 rounded-full mb-5 shadow-lg">
                <Rocket className="h-8 w-8" />
              </div>
              <h3 className="font-extrabold text-xl text-gray-900 mb-2">
                Focus on Your Core
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You run your business; we handle your marketing and visibility.
              </p>
            </div>
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#7642FE] text-white p-5 rounded-full mb-5 shadow-lg">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="font-extrabold text-xl text-gray-900 mb-2">
                Experience Growth
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Watch your brand flourish with expert digital strategies.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section 1: A powerful prompt to action */}
        <section className="container mx-auto px-6 my-20">
          <div className="bg-[#7642FE] text-white rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Swirling background elements for visual flair */}
            <div className="absolute -left-1/4 -bottom-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay animate-pulse-slow"></div>
            <div className="absolute -right-1/4 -top-1/4 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay animate-pulse-slow delay-500"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-snug">
                Your Business Deserves Marketing That Moves as Fast as You Do.
              </h2>
              <p className="text-lg md:text-xl mb-10 leading-relaxed">
                With Digital Marketing Agency Nigeria, digital marketing is no
                longer complex or slow. It’s seamless, fast, and always at your
                fingertips.
              </p>
              <Button
                size="lg"
                className="bg-white text-[#7642FE] font-bold py-3 px-10 text-xl rounded-full hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link href={"/signup"}>👉 Request Your First Service Now!</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Get In Touch Section: Building connections */}
        <section className="py-24 bg-white" id="contact">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold text-gray-900">
                Let's Make <span className="text-[#7642FE]">Magic</span> Happen!
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-gray-700 mt-6 leading-relaxed">
                Have burning questions or ready to ignite your digital presence?
                Our dedicated team is eager to connect and craft the perfect
                strategy for your business.
              </p>
            </div>
            <div className="grid lg:grid-cols-5 gap-16">
              <div className="lg:col-span-2 bg-[#7642FE] text-white p-10 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-8">Reach Out Today!</h3>
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <MapPin className="mr-4 mt-1 flex-shrink-0 h-7 w-7" />
                      <div>
                        <h4 className="font-bold text-xl mb-1">Our Hub</h4>
                        <p className="text-lg">
                          6A Embu Street, Wuse 2, Abuja. Nigeria
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="mr-4 mt-1 flex-shrink-0 h-7 w-7" />
                      <div>
                        <h4 className="font-bold text-xl mb-1">Direct Line</h4>
                        <p className="text-lg">+234 909 000 8888</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="mr-4 mt-1 flex-shrink-0 h-7 w-7" />
                      <div>
                        <h4 className="font-bold text-xl mb-1">Email Us</h4>
                        <p className="text-lg">
                          support@digitalmarketingagency.ng
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 text-center">
                  <p className="text-lg font-semibold italic">
                    We're here to help you shine!
                  </p>
                </div>
              </div>
              <div className="lg:col-span-3 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Send Us a Message
                </h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      placeholder="Your First Name"
                      className="p-3 text-lg border-gray-300 focus:border-[#7642FE] focus:ring-[#7642FE]"
                    />
                    <Input
                      placeholder="Your Last Name"
                      className="p-3 text-lg border-gray-300 focus:border-[#7642FE] focus:ring-[#7642FE]"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      type="email"
                      placeholder="Your Best Email"
                      className="p-3 text-lg border-gray-300 focus:border-[#7642FE] focus:ring-[#7642FE]"
                    />
                    <Input
                      type="tel"
                      placeholder="Your Phone Number (Optional)"
                      className="p-3 text-lg border-gray-300 focus:border-[#7642FE] focus:ring-[#7642FE]"
                    />
                  </div>
                  <div>
                    <select className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 text-lg focus:border-[#7642FE] focus:ring-[#7642FE]">
                      <option className="text-gray-500">
                        What service are you interested in?
                      </option>
                      <option>Search Engine Optimization (SEO)</option>
                      <option>Social Media Marketing</option>
                      <option>Content Marketing</option>
                      <option>Web Design & Development</option>
                      <option>Digital Marketing Strategy</option>
                      <option>Influencer Marketing</option>
                      <option>
                        Public Relations & Online Reputation Management
                      </option>
                      <option>Other</option>
                    </select>
                  </div>
                  <Textarea
                    placeholder="Tell us about your project or question..."
                    rows={6}
                    className="p-3 text-lg border-gray-300 focus:border-[#7642FE] focus:ring-[#7642FE]"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-[#7642FE] hover:bg-purple-700 w-full text-white font-bold py-4 text-xl rounded-lg shadow-md hover:shadow-xl transition-all"
                  >
                    Get a Free Consultation{" "}
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
