import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { api, Course } from '@/lib/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CourseEditor = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    excerpt: '',
    duration: '',
    mode: '',
    certification: '',
    batch_size: '',
    slug: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setFormValues({
      title: course.title.rendered,
      content: course.content.rendered,
      excerpt: course.excerpt.rendered,
      duration: course.acf.duration || '',
      mode: course.acf.mode || '',
      certification: course.acf.certification || '',
      batch_size: course.acf.batch_size?.toString() || '',
      slug: course.acf.slug || ''
    });
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setSelectedCourse(null);
    setFormValues({
      title: '',
      content: '',
      excerpt: '',
      duration: '',
      mode: '',
      certification: '',
      batch_size: '',
      slug: ''
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedCourse(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would send data to WordPress REST API
    // For demonstration purposes, we're just simulating a successful update
    
    alert(`Course ${selectedCourse ? 'updated' : 'created'} successfully!\n\nThis is a demo - in a production environment, this would save to your WordPress instance.`);
    
    // Simulating API update for demonstration purposes
    if (selectedCourse) {
      // Update existing course
      const updatedCourses = courses.map(course => 
        course.id === selectedCourse.id ? {
          ...course,
          title: { rendered: formValues.title },
          excerpt: { rendered: formValues.excerpt },
          content: { rendered: formValues.content },
          acf: {
            ...course.acf,
            duration: formValues.duration,
            mode: formValues.mode,
            certification: formValues.certification,
            batch_size: parseInt(formValues.batch_size) || 0,
            slug: formValues.slug
          }
        } : course
      );
      setCourses(updatedCourses);
    } else {
      // Create new course (simulated)
      const newCourse = {
        id: Math.floor(Math.random() * 1000),
        title: { rendered: formValues.title },
        excerpt: { rendered: formValues.excerpt },
        content: { rendered: formValues.content },
        featured_media: 0,
        acf: {
          duration: formValues.duration,
          mode: formValues.mode,
          certification: formValues.certification,
          batch_size: parseInt(formValues.batch_size) || 0,
          slug: formValues.slug
        }
      } as Course;
      
      setCourses([...courses, newCourse]);
    }
    
    setIsEditing(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return <div className="flex justify-center py-10">Loading courses...</div>;
  }

  return (
    <div>
      {!isEditing ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Courses</h2>
            <Button onClick={handleCreateNew}>Create New Course</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No courses found. Create your first course!
                  </TableCell>
                </TableRow>
              ) : (
                courses.map(course => (
                  <TableRow key={course.id}>
                    <TableCell>{course.title.rendered}</TableCell>
                    <TableCell>{course.acf.duration}</TableCell>
                    <TableCell>{course.acf.mode}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSelectCourse(course)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCourse ? 'Edit Course' : 'Create New Course'}
            </h2>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formValues.title.replace(/<\/?[^>]+(>|$)/g, "")} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea 
                id="excerpt" 
                name="excerpt" 
                value={formValues.excerpt.replace(/<\/?[^>]+(>|$)/g, "")} 
                onChange={handleChange} 
                rows={3} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                name="content" 
                value={formValues.content.replace(/<\/?[^>]+(>|$)/g, "")} 
                onChange={handleChange} 
                rows={6} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input 
                  id="duration" 
                  name="duration" 
                  value={formValues.duration} 
                  onChange={handleChange} 
                  placeholder="e.g. 6 Months" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mode">Mode</Label>
                <Select 
                  value={formValues.mode} 
                  onValueChange={(value) => handleSelectChange('mode', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="certification">Certification</Label>
                <Input 
                  id="certification" 
                  name="certification" 
                  value={formValues.certification} 
                  onChange={handleChange} 
                  placeholder="e.g. International" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="batch_size">Batch Size</Label>
                <Input 
                  id="batch_size" 
                  name="batch_size" 
                  type="number" 
                  value={formValues.batch_size} 
                  onChange={handleChange} 
                  placeholder="e.g. 10" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input 
                  id="slug" 
                  name="slug" 
                  value={formValues.slug} 
                  onChange={handleChange} 
                  placeholder="e.g. facial-aesthetic" 
                />
              </div>
            </div>
            
            <Button type="submit" className="mt-4">
              {selectedCourse ? 'Update Course' : 'Create Course'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CourseEditor; 