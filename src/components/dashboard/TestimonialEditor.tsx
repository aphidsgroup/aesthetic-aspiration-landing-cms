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
import { api, Testimonial } from '@/lib/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TestimonialEditor = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    name: '',
    position: '',
    location: '',
    rating: '5'
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await api.getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleSelectTestimonial = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormValues({
      title: testimonial.title.rendered,
      content: testimonial.content.rendered,
      name: testimonial.acf.name || '',
      position: testimonial.acf.position || '',
      location: testimonial.acf.location || '',
      rating: testimonial.acf.rating?.toString() || '5'
    });
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setSelectedTestimonial(null);
    setFormValues({
      title: '',
      content: '',
      name: '',
      position: '',
      location: '',
      rating: '5'
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedTestimonial(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    
    alert(`Testimonial ${selectedTestimonial ? 'updated' : 'created'} successfully!\n\nThis is a demo - in a production environment, this would save to your WordPress instance.`);
    
    // Simulating API update for demonstration purposes
    if (selectedTestimonial) {
      // Update existing testimonial
      const updatedTestimonials = testimonials.map(testimonial => 
        testimonial.id === selectedTestimonial.id ? {
          ...testimonial,
          title: { rendered: formValues.title },
          content: { rendered: formValues.content },
          acf: {
            ...testimonial.acf,
            name: formValues.name,
            position: formValues.position,
            location: formValues.location,
            rating: parseInt(formValues.rating) || 5
          }
        } : testimonial
      );
      setTestimonials(updatedTestimonials);
    } else {
      // Create new testimonial (simulated)
      const newTestimonial = {
        id: Math.floor(Math.random() * 1000),
        title: { rendered: formValues.title },
        content: { rendered: formValues.content },
        featured_media: 0,
        acf: {
          name: formValues.name,
          position: formValues.position,
          location: formValues.location,
          rating: parseInt(formValues.rating) || 5
        }
      } as Testimonial;
      
      setTestimonials([...testimonials, newTestimonial]);
    }
    
    setIsEditing(false);
    setSelectedTestimonial(null);
  };

  if (loading) {
    return <div className="flex justify-center py-10">Loading testimonials...</div>;
  }

  return (
    <div>
      {!isEditing ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Testimonials</h2>
            <Button onClick={handleCreateNew}>Create New Testimonial</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No testimonials found. Create your first testimonial!
                  </TableCell>
                </TableRow>
              ) : (
                testimonials.map(testimonial => (
                  <TableRow key={testimonial.id}>
                    <TableCell>{testimonial.acf.name || testimonial.title.rendered}</TableCell>
                    <TableCell>{testimonial.acf.position || 'N/A'}</TableCell>
                    <TableCell>{testimonial.acf.location || 'N/A'}</TableCell>
                    <TableCell>{testimonial.acf.rating || 5} / 5</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSelectTestimonial(testimonial)}
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
              {selectedTestimonial ? 'Edit Testimonial' : 'Create New Testimonial'}
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
              <Label htmlFor="content">Testimonial Text</Label>
              <Textarea 
                id="content" 
                name="content" 
                value={formValues.content.replace(/<\/?[^>]+(>|$)/g, "")} 
                onChange={handleChange} 
                rows={4} 
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formValues.name} 
                  onChange={handleChange} 
                  placeholder="e.g. Dr. John Smith" 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input 
                  id="position" 
                  name="position" 
                  value={formValues.position} 
                  onChange={handleChange} 
                  placeholder="e.g. Aesthetic Surgeon" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formValues.location} 
                  onChange={handleChange} 
                  placeholder="e.g. Mumbai" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Select 
                  value={formValues.rating} 
                  onValueChange={(value) => handleSelectChange('rating', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Poor</SelectItem>
                    <SelectItem value="2">2 - Fair</SelectItem>
                    <SelectItem value="3">3 - Good</SelectItem>
                    <SelectItem value="4">4 - Very Good</SelectItem>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button type="submit" className="mt-4">
              {selectedTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TestimonialEditor; 