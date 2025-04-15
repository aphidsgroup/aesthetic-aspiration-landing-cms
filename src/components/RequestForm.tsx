import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Check } from 'lucide-react';

// Course options for the dropdown
const courseOptions = [
  "Diploma in Facial Aesthetic Surgery",
  "Advanced Cosmetology Certification",
  "Combined Master Program",
  "International Certification Program"
];

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    course: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      // In a real implementation, you would send the data to your server
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          course: ''
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Information</h2>
      <p className="text-gray-600 mb-6">Fill the form to receive our brochure and detailed course information</p>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-green-800">Thank You!</h3>
          <p className="text-green-700">Your request has been submitted successfully. We'll send your brochure shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp Number
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              required
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="Enter your WhatsApp number"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Course
            </label>
            <select
              id="course"
              name="course"
              required
              value={formData.course}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
            >
              <option value="">Select a course</option>
              {courseOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
              <Check className="w-4 h-4 text-gray-400" />
              <span>No Spam</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gray-400" />
              <span>Quick Response</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default RequestForm; 