"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import DMALogo from "../../../public/dma_svg.svg";

const Logo = () => <Image src={DMALogo} alt="" />;

const Footer = () => {
  return (
    <footer className="bg-[#22003C] text-white py-12 px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo />
              <div>
                <div className="text-lg font-bold">DIGITAL</div>
                <div className="text-lg font-bold">MARKETING</div>
                <div className="text-lg font-bold">AGENCY</div>
              </div>
            </div>
            <p className="text-sm text-gray-200 mb-4 leading-relaxed">
              A platform that offers digital marketing solutions to individuals
              and businesses in their fingertips.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="  rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="  rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="  rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <MessageCircle size={20} />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/payments"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Payments & billings
                </Link>
              </li>
            </ul>
          </div>

          {/* Others Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Others</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/support"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Support & Help
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/license"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Licenses & Agreement
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/support"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Support & Help
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/license"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Licenses & Agreement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-200">
            ©Digital Marketing Agency. All rights reserved 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
