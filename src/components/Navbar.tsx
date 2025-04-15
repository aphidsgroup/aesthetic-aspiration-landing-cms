import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/515c507a-7030-435d-b388-f30af15eab3c.png" 
              alt="Institute Logo" 
              className="h-12 w-auto"
            />
            <a href="#" className="text-xl font-playfair font-semibold tracking-tight hidden sm:block">
              Institute of <span className="text-luxury-gold">Aesthetic Sciences</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-foreground/80 hover:text-luxury-gold transition-colors text-sm">About</a>
            <a href="#courses" className="text-foreground/80 hover:text-luxury-gold transition-colors text-sm">Courses</a>
            <a href="#why-us" className="text-foreground/80 hover:text-luxury-gold transition-colors text-sm">Why Us</a>
            <a href="#testimonials" className="text-foreground/80 hover:text-luxury-gold transition-colors text-sm">Testimonials</a>
            <a href="#contact" className="text-foreground/80 hover:text-luxury-gold transition-colors text-sm">Contact</a>
            <Button variant="default" size="sm" className="bg-luxury-gold hover:bg-luxury-bronze text-white ml-2">
              Download Brochure
            </Button>
            <a href="/dashboard" className="text-foreground/80 hover:text-luxury-gold transition-colors text-sm ml-2">
              <Button variant="outline" size="sm">Admin Dashboard</Button>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="py-2 text-foreground/80 hover:text-luxury-gold transition-colors">About</a>
              <a href="#courses" onClick={() => setIsMenuOpen(false)} className="py-2 text-foreground/80 hover:text-luxury-gold transition-colors">Courses</a>
              <a href="#why-us" onClick={() => setIsMenuOpen(false)} className="py-2 text-foreground/80 hover:text-luxury-gold transition-colors">Why Us</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="py-2 text-foreground/80 hover:text-luxury-gold transition-colors">Testimonials</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="py-2 text-foreground/80 hover:text-luxury-gold transition-colors">Contact</a>
              <Button variant="default" className="bg-luxury-gold hover:bg-luxury-bronze text-white w-full mt-2" onClick={() => setIsMenuOpen(false)}>
                Download Brochure
              </Button>
              <a href="/dashboard" onClick={() => setIsMenuOpen(false)} className="py-2 text-foreground/80 hover:text-luxury-gold transition-colors">
                <Button variant="outline" className="w-full">Admin Dashboard</Button>
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
