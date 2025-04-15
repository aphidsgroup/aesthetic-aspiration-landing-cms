
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MapIcon } from 'lucide-react';
import LeadCaptureForm from './LeadCaptureForm';

const ContactSection = () => {
  return (
    <section id="contact" className="section bg-aesthetic-ivory">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Contact & Location</h2>
          <p className="section-subtitle">
            Get in touch with our admissions team to learn more about our courses or schedule a campus visit
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map and contact info */}
          <div>
            <div className="overflow-hidden rounded-lg shadow-soft mb-6">
              {/* Replace with actual Google Maps embed */}
              <div className="aspect-video w-full bg-gray-200 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9977310486996!2d77.59684717479637!3d12.970070615383941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167893066d3f%3A0xab141e99b932e5dc!2sVidhana%20Soudha%2C%20Bengaluru%2C%20Karnataka%20560001!5e0!3m2!1sen!2sin!4v1719403359168!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Institute Location"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-none shadow-soft">
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-muted-foreground text-sm">
                      42, Prestige Tower, MG Road<br />
                      Bangalore, Karnataka 560001
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-soft">
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-muted-foreground text-sm mb-1">
                      +91 98765 43210
                    </p>
                    <p className="text-muted-foreground text-sm">
                      +91 80 2345 6789
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-soft">
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm mb-1">
                      admissions@aestheticsci.edu
                    </p>
                    <p className="text-muted-foreground text-sm">
                      info@aestheticsci.edu
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-soft">
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Office Hours</h4>
                    <p className="text-muted-foreground text-sm mb-1">
                      Mon-Fri: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Sat: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex mt-6 gap-4">
              <Button className="flex-1">
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </Button>
              <Button className="flex-1" variant="outline">
                <MapIcon className="mr-2 h-4 w-4" /> Get Directions
              </Button>
            </div>
          </div>
          
          {/* Lead form */}
          <div>
            <Card className="border-none shadow-card">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-semibold mb-2 font-playfair">Request Information</h3>
                <p className="text-muted-foreground mb-6">
                  Fill the form to receive our brochure and detailed course information
                </p>
                <LeadCaptureForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
