import React, { useState, useEffect } from 'react';
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Phone, Mail, Clock, MapIcon, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Default contact data
const initialContactData = {
  title: "Contact & Location",
  subtitle: "Get in touch with our admissions team to learn more about our courses or schedule a campus visit",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9977310486996!2d77.59684717479637!3d12.970070615383941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167893066d3f%3A0xab141e99b932e5dc!2sVidhana%20Soudha%2C%20Bengaluru%2C%20Karnataka%20560001!5e0!3m2!1sen!2sin!4v1719403359168!5m2!1sen!2sin",
  address: {
    title: "Address",
    line1: "42, Prestige Tower, MG Road",
    line2: "Bangalore, Karnataka 560001"
  },
  phone: {
    title: "Phone",
    number1: "+91 98765 43210",
    number2: "+91 80 2345 6789"
  },
  email: {
    title: "Email",
    email1: "admissions@aestheticsci.edu",
    email2: "info@aestheticsci.edu"
  },
  hours: {
    title: "Office Hours",
    line1: "Mon-Fri: 9:00 AM - 6:00 PM",
    line2: "Sat: 9:00 AM - 1:00 PM"
  },
  buttons: {
    callButton: "Call Now",
    directionsButton: "Get Directions"
  }
};

const MapLocationEditor = () => {
  const [contactData, setContactData] = useState(initialContactData);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<null | 'saving' | 'success' | 'error'>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Try to get data from localStorage first
        const localData = localStorage.getItem('contactData');
        if (localData) {
          setContactData(JSON.parse(localData));
        } else {
          // Otherwise try to get from Supabase
          try {
            const { data: contactSectionData, error } = await supabase
              .from('content')
              .select('*')
              .eq('section', 'contact')
              .single();
              
            if (!error && contactSectionData) {
              setContactData(contactSectionData.content);
            }
          } catch (err) {
            console.error("Error fetching from Supabase:", err);
            // Use initial data
          }
        }
      } catch (error) {
        console.error('Error loading contact data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section?: string, field?: string) => {
    const { name, value } = e.target;
    
    if (section && field) {
      // Nested field (address, phone, email, hours)
      setContactData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value
        }
      }));
    } else {
      // Top level field
      setContactData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleButtonChange = (e: React.ChangeEvent<HTMLInputElement>, buttonKey: string) => {
    const { value } = e.target;
    setContactData(prev => ({
      ...prev,
      buttons: {
        ...prev.buttons,
        [buttonKey]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // Save to localStorage
      localStorage.setItem('contactData', JSON.stringify(contactData));
      
      // Save to Supabase
      try {
        const { error } = await supabase
          .from('content')
          .upsert(
            { section: 'contact', content: contactData },
            { onConflict: 'section' }
          );
          
        if (error) {
          console.error('Supabase save error:', error);
        }
      } catch (err) {
        console.error('Error saving to Supabase:', err);
        // Not treating this as a complete failure if localStorage worked
      }
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contact & Location Editor</CardTitle>
        <CardDescription>
          Edit the map, address, and contact information displayed on your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content Editor</TabsTrigger>
            <TabsTrigger value="preview">Content Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-6">
            <div className="space-y-4">
              {/* Section Title and Subtitle */}
              <div>
                <Label htmlFor="title">Section Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={contactData.title}
                  onChange={(e) => handleInputChange(e)}
                  className="mb-3"
                />
                
                <Label htmlFor="subtitle">Section Subtitle</Label>
                <Textarea 
                  id="subtitle" 
                  name="subtitle" 
                  value={contactData.subtitle}
                  onChange={(e) => handleInputChange(e)}
                  className="min-h-[80px]"
                />
              </div>
              
              {/* Google Maps URL */}
              <div>
                <Label htmlFor="mapEmbedUrl">Google Maps Embed URL</Label>
                <Input 
                  id="mapEmbedUrl" 
                  name="mapEmbedUrl" 
                  value={contactData.mapEmbedUrl}
                  onChange={(e) => handleInputChange(e)}
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  To get this URL, go to Google Maps, search for your location, click "Share", select "Embed a map", 
                  and copy the URL from the iframe src attribute.
                </p>
              </div>
              
              {/* Contact Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Address Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label htmlFor="address-title">Card Title</Label>
                      <Input 
                        id="address-title" 
                        value={contactData.address.title}
                        onChange={(e) => handleInputChange(e, 'address', 'title')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address-line1">Address Line 1</Label>
                      <Input 
                        id="address-line1" 
                        value={contactData.address.line1}
                        onChange={(e) => handleInputChange(e, 'address', 'line1')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address-line2">Address Line 2</Label>
                      <Input 
                        id="address-line2" 
                        value={contactData.address.line2}
                        onChange={(e) => handleInputChange(e, 'address', 'line2')}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Phone */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Phone Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label htmlFor="phone-title">Card Title</Label>
                      <Input 
                        id="phone-title" 
                        value={contactData.phone.title}
                        onChange={(e) => handleInputChange(e, 'phone', 'title')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone-number1">Primary Phone</Label>
                      <Input 
                        id="phone-number1" 
                        value={contactData.phone.number1}
                        onChange={(e) => handleInputChange(e, 'phone', 'number1')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone-number2">Secondary Phone</Label>
                      <Input 
                        id="phone-number2" 
                        value={contactData.phone.number2}
                        onChange={(e) => handleInputChange(e, 'phone', 'number2')}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Email */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Email Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label htmlFor="email-title">Card Title</Label>
                      <Input 
                        id="email-title" 
                        value={contactData.email.title}
                        onChange={(e) => handleInputChange(e, 'email', 'title')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email1">Primary Email</Label>
                      <Input 
                        id="email1" 
                        value={contactData.email.email1}
                        onChange={(e) => handleInputChange(e, 'email', 'email1')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email2">Secondary Email</Label>
                      <Input 
                        id="email2" 
                        value={contactData.email.email2}
                        onChange={(e) => handleInputChange(e, 'email', 'email2')}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Hours */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Hours Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label htmlFor="hours-title">Card Title</Label>
                      <Input 
                        id="hours-title" 
                        value={contactData.hours.title}
                        onChange={(e) => handleInputChange(e, 'hours', 'title')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hours-line1">Hours Line 1</Label>
                      <Input 
                        id="hours-line1" 
                        value={contactData.hours.line1}
                        onChange={(e) => handleInputChange(e, 'hours', 'line1')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hours-line2">Hours Line 2</Label>
                      <Input 
                        id="hours-line2" 
                        value={contactData.hours.line2}
                        onChange={(e) => handleInputChange(e, 'hours', 'line2')}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="callButton">Call Button Text</Label>
                  <Input 
                    id="callButton" 
                    value={contactData.buttons.callButton}
                    onChange={(e) => handleButtonChange(e, 'callButton')}
                  />
                </div>
                <div>
                  <Label htmlFor="directionsButton">Directions Button Text</Label>
                  <Input 
                    id="directionsButton" 
                    value={contactData.buttons.directionsButton}
                    onChange={(e) => handleButtonChange(e, 'directionsButton')}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleSave} disabled={saveStatus === 'saving'}>
                  {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
              
              {saveStatus === 'success' && (
                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800 flex items-center gap-2">
                    <Check className="h-4 w-4" /> Changes saved successfully!
                  </AlertDescription>
                </Alert>
              )}
              
              {saveStatus === 'error' && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertDescription className="text-red-800">
                    Error saving changes. Please try again.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="border rounded-lg p-6 bg-white">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{contactData.title}</h2>
                <p className="text-muted-foreground">{contactData.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="overflow-hidden rounded-lg shadow-sm mb-6">
                    <div className="aspect-video w-full bg-gray-100 relative">
                      <iframe 
                        src={contactData.mapEmbedUrl} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Institute Location"
                        className="absolute inset-0"
                      ></iframe>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{contactData.address.title}</h4>
                          <p className="text-muted-foreground text-sm">
                            {contactData.address.line1}<br />
                            {contactData.address.line2}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{contactData.phone.title}</h4>
                          <p className="text-muted-foreground text-sm mb-1">
                            {contactData.phone.number1}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {contactData.phone.number2}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{contactData.email.title}</h4>
                          <p className="text-muted-foreground text-sm mb-1">
                            {contactData.email.email1}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {contactData.email.email2}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{contactData.hours.title}</h4>
                          <p className="text-muted-foreground text-sm mb-1">
                            {contactData.hours.line1}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {contactData.hours.line2}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex mt-6 gap-4">
                    <Button className="flex-1">
                      <Phone className="mr-2 h-4 w-4" /> {contactData.buttons.callButton}
                    </Button>
                    <Button className="flex-1" variant="outline">
                      <MapIcon className="mr-2 h-4 w-4" /> {contactData.buttons.directionsButton}
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-6 shadow-sm flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Contact form preview not available</p>
                    <p className="text-sm mt-2">The lead capture form is displayed here on the website</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MapLocationEditor; 