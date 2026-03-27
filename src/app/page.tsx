/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Lightbulb,
  LayoutDashboard,
  Menu,
  Zap,
  X,
  Clock,
  CheckCircle2,
  TrendingUp,
  Shield,
  Sparkles,
  Play,
  Users,
  BarChart3,
  Rocket,
  MousePointer2,
} from "lucide-react";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { useGetAllPublicServicesQuery } from "@/api/servicesApi";
import { Service } from "@/lib/types/services";
import DMALogo from "../../public/dma_logo.svg";

// A simple, elegant Logo component – because branding is everything!
export const Logo = () => (
  <Image
    src={DMALogo}
    alt="Digital Marketing Agency Nigeria Logo"
    width={100}
    height={40}
  />
);

// --- Components ---

const AnimatedCounter = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7642FE] via-purple-400 to-[#7642FE] origin-left z-[60]"
      style={{ scaleX }}
    />
  );
};

// const FloatingElement = ({
//   children,
//   delay = 0,
// }: {
//   children: React.ReactNode;
//   delay?: number;
// }) => (
//   <motion.div
//     animate={{ y: [0, -10, 0] }}
//     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
//   >
//     {children}
//   </motion.div>
// );

const MagneticButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.2;
    const y = (clientY - top - height / 2) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
    >
      {children}
    </motion.button>
  );
};

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/service/${service.id}`}>
        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
          <div className="relative h-52 overflow-hidden">
            <motion.img
              src={service.heroImageUrl}
              alt={service.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="inline-flex items-center gap-2 text-white text-sm font-semibold bg-[#7642FE] px-4 py-2 rounded-full">
                View Details <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-[#7642FE] transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkles className="w-5 h-5 text-[#7642FE]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const PainPoint = ({ text, index }: { text: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-red-50/50 border border-red-100"
    >
      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
        <X className="w-4 h-4 text-red-500" />
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
    </motion.div>
  );
};

const SolutionPoint = ({ text, index }: { text: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-green-50/50 border border-green-100"
    >
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
    </motion.div>
  );
};

const ProcessStep = ({
  number,
  title,
  description,
  icon: Icon,
  index,
}: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      {index < 3 && (
        <motion.div
          className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#7642FE] to-purple-300 -z-10"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ originX: 0 }}
        />
      )}
      <div className="flex flex-col items-center text-center">
        <motion.div
          className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[#7642FE] to-purple-600 flex items-center justify-center text-white shadow-xl mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-10 h-10" />
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#7642FE] font-bold shadow-lg border-2 border-[#7642FE]">
            {number}
          </div>
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 max-w-xs">{description}</p>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ quote, author, role, company }: any) => (
  <motion.div
    className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="absolute -top-4 left-8">
      <div className="bg-[#7642FE] text-white p-2 rounded-lg">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
    </div>
    <p className="text-gray-700 text-lg leading-relaxed mb-6 mt-2">{quote}</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7642FE] to-purple-400 flex items-center justify-center text-white font-bold text-lg">
        {author[0]}
      </div>
      <div>
        <p className="font-bold text-gray-900">{author}</p>
        <p className="text-sm text-gray-500">
          {role}, {company}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: servicesData } = useGetAllPublicServicesQuery(undefined);
  const services: Service[] = servicesData?.data || [];

  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const painPoints = [
    "Waiting 7-14 days for simple designs?",
    "Chasing freelancers for updates?",
    "Paying monthly retainers for small tasks?",
    "Missing sales because creatives weren't ready?",
  ];

  const solutionPoints = [
    "Designs delivered in 3 hours",
    "Real-time dashboard tracking",
    "Pay per project, no retainers",
    "Never miss a campaign deadline",
  ];

  return (
    <div className="bg-white text-gray-900 font-sans antialiased overflow-x-hidden">
      <ScrollProgress />

      {/* Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="container mx-auto px-6 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Logo />
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            {["Services", "How It Works", "About", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={`font-medium hover:text-[#7642FE] transition-colors ${
                  scrolled ? "text-gray-700" : "text-white/90"
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              className={`${scrolled ? "text-gray-700" : "text-white"} hover:text-[#7642FE] hover:bg-white/10`}
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <MagneticButton className="bg-[#7642FE] hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all">
              <Link href="/signup">Get Started</Link>
            </MagneticButton>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10"
          >
            {isMenuOpen ? (
              <X
                className={`w-6 h-6 ${scrolled ? "text-gray-900" : "text-white"}`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${scrolled ? "text-gray-900" : "text-white"}`}
              />
            )}
          </button>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {["Services", "How It Works", "About", "Contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-lg font-medium text-gray-700 hover:text-[#7642FE]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ),
                )}
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button className="w-full bg-[#7642FE]" asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-[#7642FE]/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -30, 0],
                y: [0, -50, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%237642FE\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
          </div>

          <motion.div
            className="container mx-auto px-6 relative z-10 text-center pt-32 md:pt-40"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium">
                Now serving 500+ businesses in Nigeria
              </span>
            </motion.div> */}

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Marketing Delivered
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-[#7642FE] to-pink-400">
                in 3 Hours
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Designs, ads, SEO, content — requested and delivered through one
              seamless dashboard.{" "}
              <span className="text-white font-semibold">
                No agencies. No waiting. No stress.
              </span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="group relative inline-flex items-center gap-2 bg-[#7642FE] hover:bg-purple-700 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-2xl shadow-purple-500/25 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/signup">
                  Get Started in 60 Seconds
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-[#7642FE]"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                className="inline-flex items-center gap-2 text-white/90 hover:text-white text-lg font-medium px-6 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Play className="w-5 h-5" />
                Watch How It Works
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Pain Points vs Solution Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Tired of Slow Marketing?
              </h2>
              <p className="text-xl text-gray-600">
                Business owners don't have time for agency drama.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
                  <X className="w-6 h-6" /> The Old Way
                </h3>
                {painPoints.map((point, i) => (
                  <PainPoint key={i} text={point} index={i} />
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" /> The DMA Way
                </h3>
                {solutionPoints.map((point, i) => (
                  <SolutionPoint key={i} text={point} index={i} />
                ))}
              </div>
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl font-bold text-gray-900 mb-8">
                That's why <span className="text-[#7642FE]">DMA</span> exists.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { value: 3, suffix: "hrs", label: "Average Delivery" },
                  { value: 500, suffix: "+", label: "Businesses Served" },
                  { value: 98, suffix: "%", label: "Satisfaction Rate" },
                  { value: 24, suffix: "/7", label: "Available" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-4xl md:text-5xl font-bold text-[#7642FE] mb-2">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-[#7642FE] font-semibold text-sm mb-4">
                Our Services
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get Results, Not Just Deliverables
              </h2>
              <p className="text-xl text-gray-600">
                Outcome-based marketing services designed to drive revenue
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.length > 0
                ? services.map((service, i) => (
                    <ServiceCard key={service.id} service={service} index={i} />
                  ))
                : // Fallback services if API fails
                  [
                    {
                      title: "Graphics Design",
                      desc: "Sales flyers, Instagram creatives, ad banners delivered fast",
                      icon: LayoutDashboard,
                    },
                    {
                      title: "Sponsored Ads (PPC)",
                      desc: "Launch revenue-driven campaigns without long setup delays",
                      icon: TrendingUp,
                    },
                    {
                      title: "Social Media Marketing",
                      desc: "Stay consistent. Stay visible. Stay selling.",
                      icon: Users,
                    },
                    {
                      title: "SEO",
                      desc: "Get found by customers already searching for you",
                      icon: BarChart3,
                    },
                    {
                      title: "Digital Strategy",
                      desc: "Stop guessing. Start executing with clarity.",
                      icon: Lightbulb,
                    },
                    {
                      title: "Content Creation",
                      desc: "Compelling copy that converts browsers into buyers",
                      icon: Sparkles,
                    },
                  ].map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-8 rounded-3xl bg-gray-50 hover:bg-[#7642FE] transition-all duration-500 cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-white/20 flex items-center justify-center mb-6 transition-colors">
                        <service.icon className="w-7 h-7 text-[#7642FE] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                        {service.desc}
                      </p>
                    </motion.div>
                  ))}
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="bg-[#7642FE] hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
                asChild
              >
                <Link href="/signup">View All Services</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Cost of Bad Design Section */}
        {/* <section className="py-24 bg-red-50">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Bad Design Is <span className="text-red-600">Expensive</span>
              </h2>
              <p className="text-xl text-gray-700 mb-12">
                It costs you lost sales, low engagement, weak brand perception,
                and missed campaign deadlines. Business owners don't lose money
                because they lack ideas. They lose money because execution is
                slow.
              </p>

              <motion.div
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-red-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      DMA fixes that.
                    </h3>
                    <p className="text-gray-600">
                      Fast execution. Professional quality. Zero drama.
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="bg-[#7642FE] hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg whitespace-nowrap"
                    asChild
                  >
                    <Link href="/signup">Start Executing Faster</Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section> */}

        {/* What You Can Request Grid */}
        {/* <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What You Can Request
              </h2>
              <p className="text-xl text-gray-600">
                Assets that drive action — not just look pretty
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                "Sales Flyers",
                "Instagram Posts",
                "Carousel Designs",
                "Ad Creatives",
                "Promo Banners",
                "Event Graphics",
                "Product Launch",
                "Presentations",
                "Brand Identity",
                "Packaging",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="group p-6 rounded-2xl bg-gray-50 hover:bg-[#7642FE] transition-all duration-300 text-center cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <Sparkles className="w-6 h-6 text-[#7642FE] group-hover:text-white transition-colors" />
                  </div>
                  <p className="font-semibold text-gray-900 group-hover:text-white transition-colors">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 mb-6">
                <span className="font-bold text-[#7642FE]">
                  If it needs to be seen, we design it.
                </span>
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-100 text-[#7642FE] font-semibold">
                <Zap className="w-5 h-5" />
                3-Hour Graphic Delivery Available
              </div>
            </motion.div>
          </div>
        </section> */}

        {/* Why Choose Us */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Business Owners Choose DMA
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Speed",
                  desc: "Campaign launching today? We're ready.",
                },
                {
                  icon: LayoutDashboard,
                  title: "Structure",
                  desc: "Submit → Track → Download. Simple.",
                },
                {
                  icon: Shield,
                  title: "Consistency",
                  desc: "Brand-aligned designs that match your voice.",
                },
                {
                  icon: CheckCircle2,
                  title: "Zero Drama",
                  desc: "No endless calls. No WhatsApp chasing. Just results.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-[#7642FE]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-[#7642FE]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Four simple steps to marketing success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                {
                  number: "1",
                  title: "Submit Request",
                  desc: "Choose your service and provide details",
                  icon: MousePointer2,
                },
                {
                  number: "2",
                  title: "Choose Speed",
                  desc: "Standard or 3-hour rush delivery",
                  icon: Clock,
                },
                {
                  number: "3",
                  title: "Track Progress",
                  desc: "Monitor from your dashboard in real-time",
                  icon: LayoutDashboard,
                },
                {
                  number: "4",
                  title: "Download & Launch",
                  desc: "Get your files and hit publish",
                  icon: Rocket,
                },
              ].map((step, i) => (
                <ProcessStep key={i} {...step} index={i} />
              ))}
            </div>

            {/* How It Works Video */}
            <motion.div
              className="mt-20 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative bg-gray-900 aspect-video flex items-center justify-center border border-gray-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7642FE]/10 to-transparent pointer-events-none" />
              {/* Add your video file here by replacing the src below */}
              <video
                className="w-full h-full object-cover relative z-10"
                controls
              >
                <source src="/vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Trusted by Business Owners
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "DMA delivered our campaign creatives in 2 hours. We launched on time and hit our sales target. Incredible service!",
                  author: "Sarah O.",
                  role: "CEO",
                  company: "Luxe Fashion NG",
                },
                {
                  quote:
                    "No more chasing freelancers on WhatsApp. The dashboard makes everything transparent and stress-free.",
                  author: "Michael K.",
                  role: "Founder",
                  company: "TechStart Africa",
                },
                {
                  quote:
                    "The 3-hour delivery option saved our product launch. Professional quality, lightning fast.",
                  author: "Chioma N.",
                  role: "Marketing Director",
                  company: "Glow Beauty",
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#7642FE] relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Execute Faster?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
                Join 500+ businesses using DMA to get marketing done in hours,
                not weeks.
              </p>
              <motion.button
                className="bg-white text-[#7642FE] text-lg font-bold px-10 py-5 rounded-full shadow-2xl inline-flex items-center gap-2 hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started in 60 Seconds
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <p className="mt-6 text-white/80 text-sm">
                No credit card required • Cancel anytime
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Let's Talk
                </h2>
                <p className="text-xl text-gray-600 mb-12">
                  Have a project in mind? Get in touch and we'll respond within
                  the hour.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      label: "Visit Us",
                      value: "6A Embu Street, Wuse 2, Abuja",
                    },
                    {
                      icon: Phone,
                      label: "Call Us",
                      value: "+234 909 000 8888",
                    },
                    {
                      icon: Mail,
                      label: "Email Us",
                      value: "helpdesk@digitalmarketingagency.ng",
                    },
                  ].map((contact, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <contact.icon className="w-6 h-6 text-[#7642FE]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          {contact.label}
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {contact.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-8 md:p-10 rounded-3xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send a Message
                </h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      className="bg-white border-gray-200 h-12"
                    />
                    <Input
                      placeholder="Last Name"
                      className="bg-white border-gray-200 h-12"
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="bg-white border-gray-200 h-12"
                  />
                  <select className="w-full h-12 px-4 rounded-md border border-gray-200 bg-white text-gray-700">
                    <option>Select a service...</option>
                    <option>Graphic Design</option>
                    <option>Social Media Marketing</option>
                    <option>SEO</option>
                    <option>PPC Advertising</option>
                  </select>
                  <Textarea
                    placeholder="Tell us about your project..."
                    className="bg-white border-gray-200 min-h-[120px]"
                  />
                  <Button className="w-full bg-[#7642FE] hover:bg-purple-700 text-white h-12 text-lg rounded-xl">
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
