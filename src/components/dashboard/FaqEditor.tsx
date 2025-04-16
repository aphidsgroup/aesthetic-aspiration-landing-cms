import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

// Initial data (would come from API in production)
const initialData = {
  title: "Frequently Asked Questions",
  subtitle: "Find answers to common questions about our courses",
  faqs: [
    {
      id: 1,
      question: "What are the eligibility requirements for the courses?",
      answer: "Our courses are open to anyone with a high school diploma or equivalent. Some advanced courses may require prior knowledge or experience in related fields."
    },
    {
      id: 2,
      question: "How long are the courses and what are the timings?",
      answer: "Course durations range from 2 weeks to 6 months depending on the program. Classes typically run Monday to Friday, 10:00 AM to 4:00 PM, with weekend batches available for working professionals."
    },
    {
      id: 3,
      question: "Are the certifications valid internationally?",
      answer: "Yes, our certifications are internationally recognized and accredited by global aesthetic medicine boards, allowing graduates to practice worldwide."
    },
    {
      id: 4,
      question: "What career opportunities are available after completing the courses?",
      answer: "Graduates can work in medical spas, aesthetic clinics, wellness centers, beauty salons, or even set up their own practice. Our placement cell assists with finding suitable positions."
    },
    {
      id: 5,
      question: "Do you provide accommodation for outstation students?",
      answer: "While we don't directly provide accommodation, we assist outstation students in finding suitable housing options near the institute through our network of trusted partners."
    }
  ]
};

const FaqEditor = () => {
  const [data, setData] = useState(initialData);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = () => {
    // In a real application, you would save to an API
    alert("Changes saved successfully!");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, title: e.target.value });
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, subtitle: e.target.value });
  };

  const handleFaqEdit = (faq: any) => {
    setEditingFaq({ ...faq });
    setIsDialogOpen(true);
  };

  const handleFaqAdd = () => {
    const newId = Math.max(0, ...data.faqs.map(f => f.id)) + 1;
    setEditingFaq({
      id: newId,
      question: "",
      answer: ""
    });
    setIsDialogOpen(true);
  };

  const handleFaqDelete = (id: number) => {
    setData({
      ...data,
      faqs: data.faqs.filter(faq => faq.id !== id)
    });
  };

  const handleFaqSave = () => {
    if (editingFaq) {
      const updatedFaqs = editingFaq.id
        ? data.faqs.map(f => f.id === editingFaq.id ? editingFaq : f)
        : [...data.faqs, editingFaq];
      
      setData({
        ...data,
        faqs: updatedFaqs
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>FAQ Section</CardTitle>
        <CardDescription>
          Edit the content for the "Frequently Asked Questions" section of your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Section Title</Label>
                <Input 
                  id="title" 
                  value={data.title} 
                  onChange={handleTitleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="subtitle">Section Subtitle</Label>
                <Input 
                  id="subtitle" 
                  value={data.subtitle} 
                  onChange={handleSubtitleChange}
                />
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">FAQ Items</h3>
                  <Button onClick={handleFaqAdd} size="sm">Add FAQ</Button>
                </div>
                
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Answer</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.faqs.map(faq => (
                        <TableRow key={faq.id}>
                          <TableCell className="font-medium max-w-[250px] truncate">{faq.question}</TableCell>
                          <TableCell className="max-w-[350px] truncate">{faq.answer}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleFaqEdit(faq)}>Edit</Button>
                              <Button variant="destructive" size="sm" onClick={() => handleFaqDelete(faq.id)}>Delete</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="border rounded-md p-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-2">{data.title}</h2>
              <p className="text-lg text-muted-foreground text-center mb-8">{data.subtitle}</p>
              
              <Accordion type="single" collapsible className="w-full">
                {data.faqs.map((faq, index) => (
                  <AccordionItem key={faq.id} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFaq?.id ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
            </DialogHeader>
            
            {editingFaq && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="faq-question">Question</Label>
                  <Input
                    id="faq-question"
                    value={editingFaq.question}
                    onChange={e => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="faq-answer">Answer</Label>
                  <Textarea
                    id="faq-answer"
                    value={editingFaq.answer}
                    onChange={e => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleFaqSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const FaqEditorComponent = FaqEditor;
export default FaqEditorComponent;
