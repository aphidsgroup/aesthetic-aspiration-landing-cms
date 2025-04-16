import React, { useState, useEffect } from 'react';
import { Globe, UserCheck, Award, Briefcase, Users, BookOpen } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Icon mapping for dynamic rendering
const IconMap = {
  Globe: <Globe className="h-8 w-8 text-primary" />,
  UserCheck: <UserCheck className="h-8 w-8 text-primary" />,
  Award: <Award className="h-8 w-8 text-primary" />,
  Briefcase: <Briefcase className="h-8 w-8 text-primary" />,
  Users: <Users className="h-8 w-8 text-primary" />,
  BookOpen: <BookOpen className="h-8 w-8 text-primary" />
};

// Default data if nothing is loaded
const defaultData = {
  title: "Why Choose Us",
  subtitle: "Our institute stands out through excellence in training, international recognition, and a commitment to producing highly skilled aesthetic medicine professionals",
  tagline: "Join over 5000+ successful alumni from 32 countries",
  features: [
    {
      icon: "Globe",
      title: 'Internationally Recognized Curriculum',
      description: 'Our curriculum meets international standards and is recognized by aesthetic medicine bodies worldwide'
    },
    {
      icon: "UserCheck",
      title: 'Hands-On Live Model Training',
      description: 'Gain practical experience through extensive hands-on training with real patients under expert supervision'
    },
    {
      icon: "Award",
      title: 'Expert Cosmetic Surgeons as Trainers',
      description: 'Learn directly from practicing cosmetic surgeons with decades of clinical and teaching experience'
    },
    {
      icon: "Briefcase",
      title: 'Career Placement Assistance',
      description: 'Receive comprehensive support for clinic placements both in India and internationally'
    },
    {
      icon: "Users",
      title: 'Limited Seats Per Batch',
      description: 'Small batch sizes ensure personalized attention and optimal learning experience for every student'
    },
    {
      icon: "BookOpen",
      title: 'Comprehensive Learning Materials',
      description: 'Access to exclusive textbooks, digital resources, and ongoing learning opportunities'
    }
  ]
};

const WhyChooseUsSection = () => {
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Try to get data from Supabase
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qehgflksdftpsxnqnekd.supabase.co';
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlaGdmbGtzZGZ0cHN4bnFuZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NDc1MzcsImV4cCI6MjAyNjQyMzUzN30.tmQE5oGHaBgWhNoGJ9RSkLoMgSeEZv0MMUXz7YDVjwQ';
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        const { data: whyUsData, error } = await supabase
          .from('content')
          .select('*')
          .eq('section', 'whyus')
          .single();
          
        if (error || !whyUsData) {
          // If Supabase fails, try localStorage
          const localData = localStorage.getItem('whyUsData');
          if (localData) {
            setData(JSON.parse(localData));
          }
        } else {
          setData(whyUsData.content);
        }
      } catch (error) {
        console.error('Error loading Why Choose Us data:', error);
        // Keep default data if both Supabase and localStorage fail
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <section id="why-us" className="section bg-aesthetic-lavender/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {data.features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-aesthetic-lavender/30">
                {IconMap[feature.icon] || <Globe className="h-8 w-8 text-primary" />}
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
            {data.tagline}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
