import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  openAboutModal: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  openAboutModal,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", page: "home" },
    { label: "Shop", page: "shop" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  // Function to handle brochure download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/sifon-catalogue.pdf';
    link.download = 'sifon-catalogue.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-pink-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center"
          >
            <img
              src="/sifon-logo.svg"
              alt="Sifon Logo"
              className="h-8 w-auto transition-transform duration-300 hover:scale-105"
            />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  currentPage === item.page
                    ? "text-pink-400"
                    : "text-gray-300 hover:text-pink-400"
                } group`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    currentPage === item.page ? "scale-x-100" : ""
                  }`}
                ></span>
              </button>
            ))}
          </div>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <button
              onClick={openAboutModal}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors duration-300"
            >
              About S&M
            </button> */}
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors duration-300"
            >
              Download Catalogue
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-pink-400 transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-pink-500/20">
            <div className="flex flex-col space-y-4 p-4">
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left py-2 text-sm font-medium transition-colors duration-300 ${
                    currentPage === item.page
                      ? "text-pink-400"
                      : "text-gray-300 hover:text-pink-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-700 space-y-2">
                {/* <button
                  onClick={() => {
                    openAboutModal();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors duration-300"
                >
                  About S&M
                </button> */}
                <button
                  onClick={() => {
                    handleDownload();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors duration-300"
                >
                  Download Catalogue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;