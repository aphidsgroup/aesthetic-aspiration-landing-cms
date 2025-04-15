import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, X, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Initial FAQ data
const initialFaqData = {
  title: "Frequently Asked Questions",
  subtitle: "Find answers to common questions about our courses, certifications, and enrollment process"
};

// Initial FAQ items
const initialFaqs = [
  {
    id: 1,
    question: "What are the eligibility requirements for the courses?",
    answer: "Our courses are designed for medical professionals including doctors, dentists, and nurses. For specific courses, additional criteria may apply. Please contact our admissions team for details relevant to your specific qualifications."
  },
  {
    id: 2,
    question: "How long are the courses and what are the timings?",
    answer: "Course durations range from weekend workshops to comprehensive 3-month programs. Classes typically run from 9am to 5pm for full-day sessions. We offer weekend batches and weekday options to accommodate working professionals."
  },
  {
    id: 3,
    question: "Is the international certification valid worldwide?",
    answer: "Yes, our certifications are internationally recognized and allow you to practice in most countries, subject to local regulatory requirements. We specifically design our curriculum to meet global standards in aesthetic medicine."
  },
  {
    id: 4,
    question: "What career opportunities can I expect after completing the courses?",
    answer: "Graduates can establish their own aesthetic clinics, join existing medical spas or dermatology practices, or enhance their current practice with aesthetic services. Our placement cell actively works with clinics across India and abroad."
  },
  {
    id: 5,
    question: "Do you provide accommodation for outstation students?",
    answer: "Yes, we can arrange accommodation near the institute for outstation students at additional cost. Options range from shared apartments to hotel accommodations based on your preference and budget."
  }
];

const FaqEditor = () => {
  const [faqData, setFaqData] = useState(initialFaqData);
  const [faqs, setFaqs] = useState(initialFaqs);
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [expandedFaqs, setExpandedFaqs] = useState([]);

  const handleFaqDataChange = (e) => {
    const { name, value } = e.target;
    setFaqData({
      ...faqData,
      [name]: value
    });
  };

  const handleFaqChange = (e, id) => {
    const { name, value } = e.target;
    
    if (id) {
      // Edit existing FAQ
      setFaqs(faqs.map(faq => 
        faq.id === id ? { ...faq, [name]: value } : faq
      ));
    } else {
      // New FAQ
      setNewFaq({
        ...newFaq,
        [name]: value
      });
    }
  };

  const addFaq = () => {
    if (!newFaq.question || !newFaq.answer) return;
    
    const newId = Math.max(0, ...faqs.map(f => f.id)) + 1;
    
    setFaqs([
      ...faqs,
      {
        id: newId,
        ...newFaq
      }
    ]);
    
    // Reset form
    setNewFaq({
      question: "",
      answer: ""
    });
  };

  const removeFaq = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  const moveFaqUp = (id) => {
    const index = faqs.findIndex(faq => faq.id === id);
    if (index <= 0) return;
    
    const newFaqs = [...faqs];
    const temp = newFaqs[index];
    newFaqs[index] = newFaqs[index - 1];
    newFaqs[index - 1] = temp;
    
    setFaqs(newFaqs);
  };

  const moveFaqDown = (id) => {
    const index = faqs.findIndex(faq => faq.id === id);
    if (index >= faqs.length - 1) return;
    
    const newFaqs = [...faqs];
    const temp = newFaqs[index];
    newFaqs[index] = newFaqs[index + 1];
    newFaqs[index + 1] = temp;
    
    setFaqs(newFaqs);
  };

  const saveChanges = () => {
    setIsSaving(true);
    
    // Simulate API call to save changes
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      alert("FAQ changes saved successfully!");
    }, 1000);
  };

  const toggleExpandFaq = (id) => {
    setExpandedFaqs(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(item => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions Section</CardTitle>
          <CardDescription>
            Edit the FAQ section that appears on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Current Content</h3>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-bold text-xl">{faqData.title}</h4>
                  <p className="mt-2 text-gray-600">{faqData.subtitle}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">FAQs</h3>
                <div className="mt-2">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                        <AccordionTrigger className="text-left">
                          {index + 1}. {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
              
              <Button onClick={() => setIsEditing(true)}>Edit FAQ Content</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Section Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={faqData.title} 
                    onChange={handleFaqDataChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="subtitle">Section Subtitle</Label>
                  <Textarea 
                    id="subtitle" 
                    name="subtitle" 
                    value={faqData.subtitle} 
                    onChange={handleFaqDataChange}
                    rows={2}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">FAQ Items</h3>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Order</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Answer</TableHead>
                      <TableHead className="w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faqs.map((faq, index) => (
                      <TableRow key={faq.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => moveFaqUp(faq.id)}
                              disabled={index === 0}
                              className="h-6 w-6 p-0"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <span className="text-center">{index + 1}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => moveFaqDown(faq.id)}
                              disabled={index === faqs.length - 1}
                              className="h-6 w-6 p-0"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={faq.question} 
                            name="question" 
                            onChange={(e) => handleFaqChange(e, faq.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea 
                            value={faq.answer} 
                            name="answer" 
                            onChange={(e) => handleFaqChange(e, faq.id)}
                            rows={3}
                          />
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => removeFaq(faq.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6 p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Add New FAQ</h4>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="new-question">Question</Label>
                      <Input 
                        id="new-question"
                        value={newFaq.question} 
                        name="question" 
                        onChange={(e) => handleFaqChange(e)}
                        placeholder="e.g. What are the eligibility requirements?"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-answer">Answer</Label>
                      <Textarea 
                        id="new-answer"
                        value={newFaq.answer} 
                        name="answer" 
                        onChange={(e) => handleFaqChange(e)}
                        placeholder="e.g. Our courses are designed for medical professionals..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <Button 
                    className="mt-2" 
                    size="sm" 
                    onClick={addFaq}
                    disabled={!newFaq.question || !newFaq.answer}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add FAQ
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={saveChanges} disabled={isSaving}>
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-1" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FaqEditor; 