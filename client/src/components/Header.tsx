import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-gradient-to-r from-warm-orange to-warm-yellow">
      <div className="container mx-auto px-4">
        {/* Top Bar with Social Links */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 font-amiri">بسم الله الرحمن الرحيم</span>
          </div>
          <div className="flex items-center space-x-3">
            <a href="#" className="text-islamic-green hover:text-warm-orange transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-islamic-green hover:text-warm-orange transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-islamic-green hover:text-warm-orange transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.989C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            {/* Logo and Branding */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-warm-orange to-warm-yellow rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl font-amiri">ش</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold font-amiri text-islamic-green">الشيخ شاهد</h1>
                <p className="text-sm text-gray-600">Sheikh Shahid Muhammad Zaid</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('nyumbani')} 
              className="text-islamic-green hover:text-warm-orange font-medium transition-colors"
            >
              Nyumbani
            </button>
            <button 
              onClick={() => scrollToSection('mafunzo')} 
              className="text-gray-700 hover:text-warm-orange font-medium transition-colors"
            >
              Mafunzo
            </button>
            <button 
              onClick={() => scrollToSection('hotuba')} 
              className="text-gray-700 hover:text-warm-orange font-medium transition-colors"
            >
              Hotuba
            </button>
            <button 
              onClick={() => scrollToSection('makala')} 
              className="text-gray-700 hover:text-warm-orange font-medium transition-colors"
            >
              Makala
            </button>
            <button 
              onClick={() => scrollToSection('ratiba')} 
              className="text-gray-700 hover:text-warm-orange font-medium transition-colors"
            >
              Ratiba ya Darsa
            </button>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => window.open('/dashboard', '_blank')}
                variant="outline"
                className="border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-white px-4 py-2 rounded-full font-medium transition-all duration-300"
              >
                Dashboard
              </Button>
              <Button className="bg-gradient-to-r from-warm-orange to-warm-yellow text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300">
                Changia
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden text-islamic-green"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('nyumbani')} 
                className="text-left text-islamic-green hover:text-warm-orange font-medium transition-colors"
              >
                Nyumbani
              </button>
              <button 
                onClick={() => scrollToSection('mafunzo')} 
                className="text-left text-gray-700 hover:text-warm-orange font-medium transition-colors"
              >
                Mafunzo
              </button>
              <button 
                onClick={() => scrollToSection('hotuba')} 
                className="text-left text-gray-700 hover:text-warm-orange font-medium transition-colors"
              >
                Hotuba
              </button>
              <button 
                onClick={() => scrollToSection('makala')} 
                className="text-left text-gray-700 hover:text-warm-orange font-medium transition-colors"
              >
                Makala
              </button>
              <button 
                onClick={() => scrollToSection('ratiba')} 
                className="text-left text-gray-700 hover:text-warm-orange font-medium transition-colors"
              >
                Ratiba ya Darsa
              </button>
              <Button className="bg-gradient-to-r from-warm-orange to-warm-yellow text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 w-fit">
                Changia
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
