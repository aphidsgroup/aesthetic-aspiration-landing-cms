
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4">Institute of Aesthetic Sciences</h3>
            <p className="text-gray-300 mb-4">
              India's premier institute for aesthetic medicine education, providing world-class training for healthcare professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#courses" className="text-gray-300 hover:text-white transition-colors">Courses</a></li>
              <li><a href="#why-us" className="text-gray-300 hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Programs</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Diploma in Facial Aesthetic Surgery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Advanced Cosmetology Certification</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Combined Master Program</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Workshops & Short Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">International Courses</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Information</h4>
            <address className="not-italic text-gray-300 space-y-2">
              <p>42, Prestige Tower, MG Road</p>
              <p>Bangalore, Karnataka 560001</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: admissions@aestheticsci.edu</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Institute of Aesthetic Sciences. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
