import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarDays, Clock, Award, Users } from 'lucide-react';
import { api, Course as ApiCourse } from '@/lib/api';

// This can be kept as a fallback if API fails
const fallbackCourses = [
  {
    id: 'facial-aesthetic',
    title: 'Diploma in Facial Aesthetic Surgery',
    description: 'Master advanced facial aesthetic procedures including fillers, botulinum toxin, thread lifts, and more.',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    details: [
      { icon: <CalendarDays className="h-4 w-4" />, label: 'Duration', value: '6 Months' },
      { icon: <Clock className="h-4 w-4" />, label: 'Mode', value: 'Offline/Hybrid' },
      { icon: <Award className="h-4 w-4" />, label: 'Certification', value: 'International' },
      { icon: <Users className="h-4 w-4" />, label: 'Batch Size', value: 'Limited to 10' }
    ],
    startDate: 'August 15, 2023'
  },
  {
    id: 'advanced-cosmetology',
    title: 'Advanced Cosmetology Certification',
    description: 'Comprehensive training in modern cosmetology techniques, skin care treatments, and client management.',
    image: 'https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    details: [
      { icon: <CalendarDays className="h-4 w-4" />, label: 'Duration', value: '4 Months' },
      { icon: <Clock className="h-4 w-4" />, label: 'Mode', value: 'Offline' },
      { icon: <Award className="h-4 w-4" />, label: 'Certification', value: 'International' },
      { icon: <Users className="h-4 w-4" />, label: 'Batch Size', value: 'Limited to 12' }
    ],
    startDate: 'September 5, 2023'
  },
  {
    id: 'master-program',
    title: 'Combined Master Program',
    description: 'Elite comprehensive program combining aesthetic surgery and cosmetology for complete mastery.',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    details: [
      { icon: <CalendarDays className="h-4 w-4" />, label: 'Duration', value: '9 Months' },
      { icon: <Clock className="h-4 w-4" />, label: 'Mode', value: 'Hybrid' },
      { icon: <Award className="h-4 w-4" />, label: 'Certification', value: 'International Gold' },
      { icon: <Users className="h-4 w-4" />, label: 'Batch Size', value: 'Limited to 8' }
    ],
    startDate: 'July 20, 2023'
  }
];

// Interface for course details used in the UI
interface CourseDetail {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// Interface for the Course props
interface CourseProps {
  id: string;
  title: string;
  description: string;
  image: string;
  details: CourseDetail[];
  startDate: string;
}

interface CourseCardProps {
  course: CourseProps;
}

const CoursesSection = () => {
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const wpCourses = await api.getCourses();
        
        // Transform WordPress courses to match our UI format
        const transformedCourses = wpCourses.map((course: ApiCourse) => {
          return {
            id: course.acf.slug || course.id.toString(),
            title: course.title.rendered,
            description: course.excerpt.rendered.replace(/<\/?p>/g, ''),
            image: course._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                  'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            details: [
              { icon: <CalendarDays className="h-4 w-4" />, label: 'Duration', value: course.acf.duration },
              { icon: <Clock className="h-4 w-4" />, label: 'Mode', value: course.acf.mode },
              { icon: <Award className="h-4 w-4" />, label: 'Certification', value: course.acf.certification },
              { icon: <Users className="h-4 w-4" />, label: 'Batch Size', value: `Limited to ${course.acf.batch_size}` }
            ],
            startDate: 'Next batch starting soon' // This could also come from ACF if available
          };
        });
        
        setCourses(transformedCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Using fallback data.");
        setCourses(fallbackCourses as CourseProps[]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section id="courses" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Courses Offered</h2>
          <p className="section-subtitle">
            Choose from our range of internationally recognized certification programs designed 
            to elevate your career in aesthetic medicine and cosmetology
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mb-4">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
          New Batch
        </div>
      </div>
      <CardHeader className="px-6 pt-6 pb-0">
        <h3 className="text-xl font-semibold font-playfair">{course.title}</h3>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <p className="text-muted-foreground mb-6 line-clamp-2">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          {course.details.map((detail, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="text-primary">{detail.icon}</div>
              <div>
                <p className="text-xs text-muted-foreground">{detail.label}</p>
                <p className="text-sm font-medium">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border/50">
          <p className="text-sm"><span className="font-medium">Starts:</span> {course.startDate}</p>
        </div>
      </CardContent>
      <CardFooter className="px-6 pt-0 pb-6">
        <Button className="w-full">Apply for this course</Button>
      </CardFooter>
    </Card>
  );
};

export default CoursesSection;
