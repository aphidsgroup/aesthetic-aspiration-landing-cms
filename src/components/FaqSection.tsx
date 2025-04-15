
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What are the eligibility requirements for the courses?",
    answer: "For Diploma in Facial Aesthetic Surgery, applicants must have a medical degree (MBBS, BDS, BAMS) or related healthcare qualification. For Advanced Cosmetology, we accept candidates with a background in healthcare, beauty therapy, or related fields. The Combined Master Program requires a medical degree with a minimum of 1 year experience in a related field."
  },
  {
    question: "What is the duration and batch timings for the courses?",
    answer: "The Facial Aesthetic Surgery Diploma runs for 6 months with weekend classes (Sat-Sun, 9am-5pm). Advanced Cosmetology certification is a 4-month program with weekday options (Mon-Wed, 10am-3pm) or weekend options. The Master Program spans 9 months with a combination of weekday and weekend sessions, plus online components."
  },
  {
    question: "Are these certifications valid internationally?",
    answer: "Yes, all our certifications are internationally recognized and accredited by global aesthetic medicine bodies. Our diploma is valid in over 30 countries including the UAE, Singapore, UK, and Australia. We provide assistance with credential verification for international practice."
  },
  {
    question: "What career opportunities can I expect after completing the course?",
    answer: "Graduates commonly establish their own aesthetic practices, join premium medical spas, work with dermatology clinics, or secure positions at international aesthetic centers. Our career placement cell has connections with leading clinics in India, the Middle East, and Southeast Asia. Many alumni have successfully started their own clinics within 1-2 years of graduation."
  },
  {
    question: "Do you provide accommodation for outstation students?",
    answer: "Yes, we offer accommodation assistance for outstation students. We have partnered with nearby service apartments and hostels that provide safe, comfortable stays at special rates for our students. These accommodations are within 2-5 km from our campus and include essential amenities like WiFi, housekeeping, and meals."
  }
];

const FaqSection = () => {
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about our courses, eligibility, certification, 
            and career opportunities
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-lg py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? Contact our admissions team
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
