import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const LeadCaptureForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    course: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (value: string) => {
    setFormData(prev => ({ ...prev, course: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request submitted!",
        description: "We'll send you the brochure shortly.",
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        course: ''
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
          Full Name
        </Label>
        <Input 
          id="name" 
          name="name" 
          placeholder="Enter your full name" 
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>
      
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
          Email Address
        </Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="Enter your email" 
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>
      
      <div>
        <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700 mb-1">
          WhatsApp Number
        </Label>
        <Input 
          id="whatsapp" 
          name="whatsapp" 
          type="tel" 
          placeholder="Enter your WhatsApp number" 
          value={formData.whatsapp}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>
      
      <div>
        <Label htmlFor="course" className="text-sm font-medium text-gray-700 mb-1">
          Preferred Course
        </Label>
        <Select 
          value={formData.course} 
          onValueChange={handleCourseChange} 
          required
        >
          <SelectTrigger id="course" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="facial-aesthetic">Diploma in Facial Aesthetic Surgery</SelectItem>
            <SelectItem value="advanced-cosmetology">Advanced Cosmetology Certification</SelectItem>
            <SelectItem value="master-program">Combined Master Program</SelectItem>
            <SelectItem value="international-certification">International Certification Program</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-md transition-colors"
      >
        {isSubmitting ? "Processing..." : "Get Brochure & Course Fee"}
      </Button>
      
      <div className="flex justify-center items-center gap-6 mt-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gray-400" />
          <span>100% Privacy</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-gray-400" />
          <span>No Spam</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-gray-400" />
          <span>Quick Response</span>
        </div>
      </div>
    </form>
  );
};

export default LeadCaptureForm;
