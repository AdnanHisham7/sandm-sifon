import React, { useState, useEffect } from "react";
import { Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { getCategoriesByBrand } from "../api"; // Adjust the path if api.ts is elsewhere

interface FooterProps {
  onNavigate: (page: string, categoryId?: string) => void;
}

// Define the Category interface based on the expected API response
interface Category {
  _id: string;
  name: string;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  // State to hold fetched categories, initialized as an empty array
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    getCategoriesByBrand("sifon")
      .then((data) => setCategories(data)) // Update state with fetched data
      .catch((error) => console.error("Error fetching categories:", error)); // Log errors
  }, []); // Empty dependency array ensures this runs once on mount

  const mainLinks = [
    { label: "About", page: "about" },
    { label: "Shop", page: "shop" },
    { label: "Collections", page: "shop" },
    { label: "Contact", page: "contact" },
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <button
                onClick={() => onNavigate("home")}
                className="mb-6 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src="/sifon-logo.svg"
                  alt="Sifon Logo"
                  title="Sifon Home"
                  className="h-10 w-auto mx-auto"
                />
              </button>

              <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                Retro ceramics reimagined for the bold. Transforming spaces with
                artistic sanitary ware that dares to be different.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-400 hover:text-pink-400 hover:border-pink-500/50 transition-all duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-400 hover:text-pink-400 hover:border-pink-500/50 transition-all duration-300"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="#"
                  className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-400 hover:text-pink-400 hover:border-pink-500/50 transition-all duration-300"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {mainLinks.map((link) => (
                  <li key={link.page}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories Cloud */}
            <div>
              <h4 className="text-white font-semibold mb-6">Collections</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category._id} // Use _id for a unique key
                    onClick={() => onNavigate("shop", category._id)}
                    className="px-3 py-1 bg-gray-900/50 border border-gray-700 text-gray-400 text-sm rounded-full hover:border-pink-500/50 hover:text-pink-400 transition-all duration-300"
                  >
                    {category.name} {/* Display category name */}
                  </button>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <div className="space-y-3 text-gray-400 text-sm">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-pink-400" />
                    <span>Downtown Design District</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-pink-400" />
                    <span>+1 (555) 123-VIBE</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2 text-pink-400" />
                    <span>hello@sifon.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Sifon. All rights reserved. Crafted with rebellious love.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-pink-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-pink-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-pink-400 transition-colors duration-300"
              >
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Grain Texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')] mix-blend-overlay pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
