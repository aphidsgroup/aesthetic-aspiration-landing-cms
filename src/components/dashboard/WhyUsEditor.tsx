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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";

// Initial data (would come from API in production)
const initialData = {
  title: "Why Choose Us",
  subtitle: "Features that make our institute stand out",
  features: [
    {
      id: 1,
      icon: "GraduationCap",
      title: "Internationally Recognized Curriculum",
      description: "Our curriculum is designed in line with global industry standards, ensuring our graduates are recognized worldwide."
    },
    {
      id: 2,
      icon: "Briefcase",
      title: "Hands-on Training",
      description: "Practical experience is at the core of our teaching methodology, with 70% of course time dedicated to hands-on training."
    },
    {
      id: 3,
      icon: "Users",
      title: "Expert Trainers",
      description: "Learn from industry professionals with over 15 years of experience in leading aesthetic clinics and medical centers."
    },
    {
      id: 4,
      icon: "Headphones",
      title: "Career Placement Assistance",
      description: "Our dedicated placement cell connects students with top clinics and medical centers across the country."
    },
    {
      id: 5,
      icon: "Users",
      title: "Limited Batch Size",
      description: "Small batch sizes ensure personalized attention and a focused learning environment for each student."
    },
    {
      id: 6,
      icon: "BookOpen",
      title: "Comprehensive Learning Materials",
      description: "Receive detailed course manuals, digital resources, and lifetime access to our online learning portal."
    }
  ]
};

// Available icon options
const iconOptions = [
  "GraduationCap", "Briefcase", "Users", "Headphones", "BookOpen", 
  "Award", "Clock", "Heart", "Shield", "Star", "Zap"
];

const WhyUsEditor = () => {
  const [data, setData] = useState(initialData);
  const [editingFeature, setEditingFeature] = useState<any>(null);
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

  const handleFeatureEdit = (feature: any) => {
    setEditingFeature({ ...feature });
    setIsDialogOpen(true);
  };

  const handleFeatureAdd = () => {
    const newId = Math.max(0, ...data.features.map(f => f.id)) + 1;
    setEditingFeature({
      id: newId,
      icon: "Star",
      title: "",
      description: ""
    });
    setIsDialogOpen(true);
  };

  const handleFeatureDelete = (id: number) => {
    setData({
      ...data,
      features: data.features.filter(feature => feature.id !== id)
    });
  };

  const handleFeatureSave = () => {
    if (editingFeature) {
      const updatedFeatures = editingFeature.id
        ? data.features.map(f => f.id === editingFeature.id ? editingFeature : f)
        : [...data.features, editingFeature];
      
      setData({
        ...data,
        features: updatedFeatures
      });
    }
    setIsDialogOpen(false);
  };

  const renderIconOption = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : <div className="h-5 w-5" />;
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Why Choose Us Section</CardTitle>
        <CardDescription>
          Edit the content for the "Why Choose Us" section of your website
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
                  <h3 className="text-lg font-medium">Features</h3>
                  <Button onClick={handleFeatureAdd} size="sm">Add Feature</Button>
                </div>
                
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Icon</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.features.map(feature => (
                        <TableRow key={feature.id}>
                          <TableCell>
                            {renderIconOption(feature.icon)}
                          </TableCell>
                          <TableCell className="font-medium">{feature.title}</TableCell>
                          <TableCell className="max-w-[300px] truncate">{feature.description}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleFeatureEdit(feature)}>Edit</Button>
                              <Button variant="destructive" size="sm" onClick={() => handleFeatureDelete(feature.id)}>Delete</Button>
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
            <h2 className="text-3xl font-bold text-center mb-2">{data.title}</h2>
            <p className="text-lg text-muted-foreground text-center mb-8">{data.subtitle}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.features.map(feature => {
                const IconComponent = (Icons as any)[feature.icon];
                return (
                  <div key={feature.id} className="border rounded-lg p-6 space-y-4">
                    <div className="bg-primary h-12 w-12 rounded-full flex items-center justify-center">
                      {IconComponent && <IconComponent className="h-6 w-6 text-primary-foreground" />}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFeature?.id ? 'Edit Feature' : 'Add Feature'}</DialogTitle>
            </DialogHeader>
            
            {editingFeature && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="feature-icon">Icon</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {iconOptions.map(icon => (
                      <Button
                        key={icon}
                        type="button"
                        variant={editingFeature.icon === icon ? "default" : "outline"}
                        className="h-10 w-10 p-0"
                        onClick={() => setEditingFeature({ ...editingFeature, icon })}
                      >
                        {renderIconOption(icon)}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="feature-title">Title</Label>
                  <Input
                    id="feature-title"
                    value={editingFeature.title}
                    onChange={e => setEditingFeature({ ...editingFeature, title: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="feature-description">Description</Label>
                  <Textarea
                    id="feature-description"
                    value={editingFeature.description}
                    onChange={e => setEditingFeature({ ...editingFeature, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleFeatureSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const WhyUsEditorComponent = WhyUsEditor;
export default WhyUsEditorComponent;
