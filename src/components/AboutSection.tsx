
import React from 'react';
import { Medal, Building, Users, GraduationCap } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="section bg-aesthetic-ivory">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">About the Institute</h2>
          <p className="section-subtitle">
            Established in 2005, the Institute of Aesthetic Sciences is a premier center for aesthetic education, 
            combining modern infrastructure with world-class faculty to deliver exceptional training programs. 
            Our international certification and state-of-the-art facilities ensure students receive the best 
            education to excel in the growing field of aesthetic medicine.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CredentialCard 
            icon={<Medal className="h-8 w-8 text-primary" />}
            title="ISO Certified"
            description="9001:2015 certified institution for quality management systems"
          />
          <CredentialCard 
            icon={<Building className="h-8 w-8 text-primary" />}
            title="15+ Years of Excellence"
            description="Pioneering aesthetic medicine education since 2005"
          />
          <CredentialCard 
            icon={<Users className="h-8 w-8 text-primary" />}
            title="5000+ Alumni Network"
            description="Professionals thriving in clinics across 32 countries"
          />
          <CredentialCard 
            icon={<GraduationCap className="h-8 w-8 text-primary" />}
            title="Expert Faculty"
            description="Learn from renowned cosmetic surgeons and practitioners"
          />
        </div>
        
        <div className="mt-16 bg-white shadow-soft rounded-lg overflow-hidden">
          <div className="aspect-video w-full">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Modern training facility" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface CredentialCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CredentialCard = ({ icon, title, description }: CredentialCardProps) => {
  return (
    <Card className="border-none shadow-soft hover:shadow-card transition-shadow">
      <CardContent className="p-6 text-center">
        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-aesthetic-lavender/20 rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
