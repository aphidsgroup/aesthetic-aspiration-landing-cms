import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { api, Testimonial as ApiTestimonial } from '@/lib/api';

// Keep as fallback in case API fails
const fallbackTestimonials = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    role: 'Aesthetic Surgeon',
    location: 'Mumbai',
    course: 'Diploma in Facial Aesthetic Surgery',
    stars: 5,
    quote: 'The hands-on training I received was exceptional. I now run my own successful clinic in Mumbai with clients from across Asia. The international certification has opened doors I never thought possible.'
  },
  {
    id: 2,
    name: 'Dr. Raj Malhotra',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    role: 'Medical Director',
    location: 'Dubai',
    course: 'Combined Master Program',
    stars: 5,
    quote: 'After completing the Master Program, I secured a position at a prestigious clinic in Dubai. The curriculum was comprehensive and up-to-date with the latest techniques in aesthetic medicine.'
  },
  {
    id: 3,
    name: 'Dr. Ananya Reddy',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    role: 'Cosmetologist',
    location: 'Bangalore',
    course: 'Advanced Cosmetology Certification',
    stars: 5,
    quote: 'The Advanced Cosmetology program transformed my practice. The skills I learned allowed me to expand my services and double my client base within just six months of completion.'
  },
  {
    id: 4,
    name: 'Dr. Vikram Singh',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    role: 'Founder',
    location: 'Delhi',
    course: 'Diploma in Facial Aesthetic Surgery',
    stars: 5,
    quote: "The practical exposure and personalized mentoring I received helped me launch my own chain of aesthetic clinics across North India. The institute's network continues to support my growth."
  }
];

interface Testimonial {
  id: number;
  name: string;
  image: string;
  role: string;
  location: string;
  course: string;
  stars: number;
  quote: string;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const wpTestimonials = await api.getTestimonials();
        
        // Transform WordPress testimonials to match our UI format
        const transformedTestimonials = wpTestimonials.map((testimonial: ApiTestimonial) => {
          return {
            id: testimonial.id,
            name: testimonial.acf.name || testimonial.title.rendered,
            image: testimonial._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            role: testimonial.acf.role || '',
            location: testimonial.acf.location || '',
            course: testimonial.acf.course || '',
            stars: testimonial.acf.stars || 5,
            quote: testimonial.acf.quote || testimonial.content.rendered.replace(/<\/?p>/g, '')
          };
        });
        
        setTestimonials(transformedTestimonials);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Using fallback data.");
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }

    if (touchStart - touchEnd < -50) {
      handlePrev();
    }
  };

  const renderStars = (count: number) => {
    return Array(count).fill(0).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <section id="testimonials" className="section bg-aesthetic-rose/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Student Testimonials</h2>
          <p className="section-subtitle">
            Hear from our alumni about how our programs have transformed their careers 
            and opened new opportunities in aesthetic medicine
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mb-4">{error}</div>
        ) : (
          <>
            <div 
              className="relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  width: `${testimonials.length * 100}%`
                }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full px-4">
                    <Card className="border-none shadow-soft overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3">
                            <div className="h-64 md:h-full">
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                            <div className="flex mb-3">
                              {renderStars(testimonial.stars)}
                            </div>
                            <blockquote className="text-lg italic mb-6">
                              "{testimonial.quote}"
                            </blockquote>
                            <div>
                              <h4 className="text-xl font-medium">{testimonial.name}</h4>
                              <p className="text-muted-foreground">{testimonial.role} • {testimonial.location}</p>
                              <p className="text-sm text-primary mt-1">{testimonial.course}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
