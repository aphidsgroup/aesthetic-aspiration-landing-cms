
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import LeadCaptureForm from './LeadCaptureForm';

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-ivory via-luxury-ivory/95 to-luxury-ivory/90"></div>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              Transform Your Career in <span className="text-luxury-gold">Aesthetic Medicine</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-luxury-charcoal/80 max-w-xl mx-auto lg:mx-0">
              Join India's Premier Institute for Facial Aesthetic Surgery & Cosmetology. Get internationally recognized certification and transform your medical practice.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-luxury-gold hover:bg-luxury-bronze text-white px-8 py-6 text-lg">
                Download Brochure <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 px-8 py-6 text-lg">
                Apply Now
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start text-sm text-luxury-charcoal/70 gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>5000+ Alumni</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Global Recognition</span>
              </div>
            </div>
          </div>

          {/* Right content - Lead form */}
          <div className="lg:w-1/2 w-full max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg border border-luxury-gold/10">
              <h3 className="text-2xl font-semibold mb-2 font-playfair text-luxury-charcoal">Request Information</h3>
              <p className="text-luxury-charcoal/70 mb-6">Fill the form to receive our brochure and course details</p>
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile sticky CTA */}
      <Button className="btn-sticky bg-luxury-gold hover:bg-luxury-bronze text-white">
        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </section>
  );
};

export default HeroSection;
