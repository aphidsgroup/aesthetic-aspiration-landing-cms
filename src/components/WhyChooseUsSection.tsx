
import React from 'react';
import { Globe, UserCheck, Award, Briefcase, Users, BookOpen } from 'lucide-react';

const features = [
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: 'Internationally Recognized Curriculum',
    description: 'Our curriculum meets international standards and is recognized by aesthetic medicine bodies worldwide'
  },
  {
    icon: <UserCheck className="h-8 w-8 text-primary" />,
    title: 'Hands-On Live Model Training',
    description: 'Gain practical experience through extensive hands-on training with real patients under expert supervision'
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Expert Cosmetic Surgeons as Trainers',
    description: 'Learn directly from practicing cosmetic surgeons with decades of clinical and teaching experience'
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: 'Career Placement Assistance',
    description: 'Receive comprehensive support for clinic placements both in India and internationally'
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Limited Seats Per Batch',
    description: 'Small batch sizes ensure personalized attention and optimal learning experience for every student'
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Comprehensive Learning Materials',
    description: 'Access to exclusive textbooks, digital resources, and ongoing learning opportunities'
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="section bg-aesthetic-lavender/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Our institute stands out through excellence in training, international recognition, 
            and a commitment to producing highly skilled aesthetic medicine professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-aesthetic-lavender/30">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground font-medium">
            Join over 5000+ successful alumni from 32 countries
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
