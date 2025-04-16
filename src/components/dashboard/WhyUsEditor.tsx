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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Globe, UserCheck, Award, Briefcase, Users, BookOpen, Trash2, Edit, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Default data if nothing is loaded
const defaultData = {
  title: "Why Choose Us",
  subtitle: "Our institute stands out through excellence in training, international recognition, and a commitment to producing highly skilled aesthetic medicine professionals",
  tagline: "Join over 5000+ successful alumni from 32 countries",
  features: [
    {
      icon: "Globe",
      title: 'Internationally Recognized Curriculum',
      description: 'Our curriculum meets international standards and is recognized by aesthetic medicine bodies worldwide'
    },
    {
      icon: "UserCheck",
      title: 'Hands-On Live Model Training',
      description: 'Gain practical experience through extensive hands-on training with real patients under expert supervision'
    },
    {
      icon: "Award",
      title: 'Expert Cosmetic Surgeons as Trainers',
      description: 'Learn directly from practicing cosmetic surgeons with decades of clinical and teaching experience'
    },
    {
      icon: "Briefcase",
      title: 'Career Placement Assistance',
      description: 'Receive comprehensive support for clinic placements both in India and internationally'
    },
    {
      icon: "Users",
      title: 'Limited Seats Per Batch',
      description: 'Small batch sizes ensure personalized attention and optimal learning experience for every student'
    },
    {
      icon: "BookOpen",
      title: 'Comprehensive Learning Materials',
      description: 'Access to exclusive textbooks, digital resources, and ongoing learning opportunities'
    }
  ]
};

// Icon mapping for preview
const IconMap = {
  Globe: <Globe className="h-5 w-5 text-primary" />,
  UserCheck: <UserCheck className="h-5 w-5 text-primary" />,
  Award: <Award className="h-5 w-5 text-primary" />,
  Briefcase: <Briefcase className="h-5 w-5 text-primary" />,
  Users: <Users className="h-5 w-5 text-primary" />,
  BookOpen: <BookOpen className="h-5 w-5 text-primary" />
};

export const WhyUsEditor = () => {
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<null | 'saving' | 'success' | 'error'>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Icons available for selection
  const availableIcons = [
    { name: "Globe", label: "Globe" },
    { name: "UserCheck", label: "User Check" },
    { name: "Award", label: "Award" },
    { name: "Briefcase", label: "Briefcase" },
    { name: "Users", label: "Users" },
    { name: "BookOpen", label: "Book Open" }
  ];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Try to get data from localStorage first
        const localData = localStorage.getItem('whyUsData');
        if (localData) {
          setData(JSON.parse(localData));
        } else {
          // If not in localStorage, try Supabase
          const { data: whyUsData, error } = await supabase
            .from('content')
            .select('*')
            .eq('section', 'whyus')
            .single();
            
          if (!error && whyUsData) {
            setData(whyUsData.content);
          }
        }
      } catch (error) {
        console.error('Error loading Why Choose Us data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // Save to localStorage
      localStorage.setItem('whyUsData', JSON.stringify(data));
      
      // Save to Supabase if available
      const { error } = await supabase
        .from('content')
        .upsert(
          { section: 'whyus', content: data },
          { onConflict: 'section' }
        );
          
      if (error) {
        console.error('Supabase save error:', error);
      }
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const openNewFeatureDialog = () => {
    setCurrentFeature({
      icon: "Globe",
      title: "",
      description: ""
    });
    setEditIndex(null);
    setDialogOpen(true);
  };

  const openEditFeatureDialog = (feature: any, index: number) => {
    setCurrentFeature({ ...feature });
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentFeature(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIconChange = (icon: string) => {
    setCurrentFeature(prev => ({
      ...prev,
      icon
    }));
  };

  const saveFeature = () => {
    const updatedFeatures = [...data.features];
    
    if (editIndex !== null) {
      // Edit existing feature
      updatedFeatures[editIndex] = currentFeature;
    } else {
      // Add new feature
      updatedFeatures.push(currentFeature);
    }
    
    setData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
    
    setDialogOpen(false);
  };

  const deleteFeature = (index: number) => {
    const updatedFeatures = data.features.filter((_, i) => i !== index);
    setData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Why Choose Us Section Editor</CardTitle>
        <CardDescription>
          Edit the content displayed in the Why Choose Us section of your website
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
              <div>
                <Label htmlFor="title">Section Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={data.title} 
                  onChange={handleDataChange} 
                />
              </div>
              
              <div>
                <Label htmlFor="subtitle">Section Subtitle</Label>
                <Textarea 
                  id="subtitle" 
                  name="subtitle" 
                  value={data.subtitle} 
                  onChange={handleDataChange} 
                  className="min-h-[80px]"
                />
              </div>
              
              <div>
                <Label htmlFor="tagline">Tagline (Bottom)</Label>
                <Input 
                  id="tagline" 
                  name="tagline" 
                  value={data.tagline} 
                  onChange={handleDataChange} 
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Features</Label>
                  <Button variant="outline" size="sm" onClick={openNewFeatureDialog}>
                    <Plus className="h-4 w-4 mr-1" /> Add Feature
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Icon</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.features.map((feature, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-aesthetic-lavender/30">
                            {IconMap[feature.icon as keyof typeof IconMap]}
                          </div>
                        </TableCell>
                        <TableCell>{feature.title}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{feature.description}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openEditFeatureDialog(feature, index)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => deleteFeature(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleSave} disabled={saveStatus === 'saving'}>
                  {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
              
              {saveStatus === 'success' && (
                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800">
                    Changes saved successfully!
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
            <div className="border rounded-lg p-6 bg-aesthetic-lavender/10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
                <p className="text-muted-foreground">{data.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.features.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-aesthetic-lavender/30">
                      {IconMap[feature.icon as keyof typeof IconMap]}
                    </div>
                    <div>
                      <h3 className="text-md font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                  {data.tagline}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Dialog for adding/editing features */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editIndex !== null ? "Edit Feature" : "Add New Feature"}</DialogTitle>
            <DialogDescription>
              {editIndex !== null 
                ? "Update the details of this feature" 
                : "Fill in the details for the new feature"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="feature-icon">Icon</Label>
              <Select 
                value={currentFeature?.icon || "Globe"} 
                onValueChange={handleIconChange}
              >
                <SelectTrigger id="feature-icon">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {availableIcons.map(icon => (
                    <SelectItem key={icon.name} value={icon.name}>
                      <div className="flex items-center gap-2">
                        {IconMap[icon.name as keyof typeof IconMap]}
                        <span>{icon.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="feature-title">Title</Label>
              <Input 
                id="feature-title" 
                name="title" 
                value={currentFeature?.title || ""} 
                onChange={handleFeatureChange} 
              />
            </div>
            
            <div>
              <Label htmlFor="feature-description">Description</Label>
              <Textarea 
                id="feature-description" 
                name="description" 
                value={currentFeature?.description || ""} 
                onChange={handleFeatureChange} 
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveFeature}>{editIndex !== null ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WhyUsEditor;
