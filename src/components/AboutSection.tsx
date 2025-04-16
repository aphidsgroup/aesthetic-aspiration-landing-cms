import React, { useState, useEffect } from 'react';
import { Medal, Building, Users, GraduationCap, Award, Briefcase, Clock, Heart, Shield, Star, Zap } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

// Default data in case fetching fails
const defaultData = {
  title: "About the Institute",
  subtitle: "Established in 2005, the Institute of Aesthetic Sciences is a premier center for aesthetic education, combining modern infrastructure with world-class faculty to deliver exceptional training programs. Our international certification and state-of-the-art facilities ensure students receive the best education to excel in the growing field of aesthetic medicine.",
  imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  credentials: [
    {
      id: 1,
      icon: "Award",
      title: "ISO Certified",
      description: "9001:2015 certified institution for quality management systems"
    },
    {
      id: 2,
      icon: "Building",
      title: "15+ Years of Excellence",
      description: "Pioneering aesthetic medicine education since 2005"
    },
    {
      id: 3,
      icon: "Users",
      title: "5000+ Alumni Network",
      description: "Professionals thriving in clinics across 32 countries"
    },
    {
      id: 4,
      icon: "GraduationCap",
      title: "Expert Faculty",
      description: "Learn from renowned cosmetic surgeons and practitioners"
    }
  ]
};

const AboutSection = () => {
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        // Try to load from Supabase
        if (window.supabase) {
          const { data: supabaseData, error } = await window.supabase
            .from('content')
            .select('*')
            .eq('type', 'about')
            .single();
            
          if (supabaseData?.content && !error) {
            setData(supabaseData.content);
            setIsLoading(false);
            return;
          }
        }
        
        // Fall back to localStorage
        const savedData = localStorage.getItem('aboutData');
        if (savedData) {
          setData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error loading about data:", error);
        // Keep using default data
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  // Map icon names to components
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Medal: <Medal className="h-8 w-8 text-primary" />,
      Building: <Building className="h-8 w-8 text-primary" />,
      Users: <Users className="h-8 w-8 text-primary" />,
      GraduationCap: <GraduationCap className="h-8 w-8 text-primary" />,
      Award: <Award className="h-8 w-8 text-primary" />,
      Briefcase: <Briefcase className="h-8 w-8 text-primary" />,
      Clock: <Clock className="h-8 w-8 text-primary" />,
      Heart: <Heart className="h-8 w-8 text-primary" />,
      Shield: <Shield className="h-8 w-8 text-primary" />,
      Star: <Star className="h-8 w-8 text-primary" />,
      Zap: <Zap className="h-8 w-8 text-primary" />
    };
    
    return iconMap[iconName] || <Medal className="h-8 w-8 text-primary" />;
  };
  
  return (
    <section id="about" className="section bg-aesthetic-ivory">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.credentials?.map(credential => (
            <CredentialCard 
              key={credential.id}
              icon={getIconComponent(credential.icon)}
              title={credential.title}
              description={credential.description}
            />
          ))}
        </div>
        
        <div className="mt-16 bg-white shadow-soft rounded-lg overflow-hidden">
          <div className="aspect-video w-full">
            <img 
              src={data.imageUrl} 
              alt="Modern training facility" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/1200x600?text=Institute+Facility";
              }}
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
