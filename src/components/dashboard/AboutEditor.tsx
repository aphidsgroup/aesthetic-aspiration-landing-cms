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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";
import { supabase } from '@/lib/supabase';

// Extend Window interface to include supabase
declare global {
  interface Window {
    supabase: any;
  }
}

// Initial data (would come from API in production)
const initialData = {
  title: "About Our Institute",
  subtitle: "Learn about our dedication to excellence in aesthetic education",
  description: "Founded in 2005, our institute has been at the forefront of aesthetic education for nearly two decades. We combine rigorous academic standards with practical, hands-on training to prepare students for successful careers in the aesthetic industry. Our state-of-the-art facilities and expert instructors ensure that every graduate is ready to meet the demands of this growing field.",
  imageUrl: "/images/institute-building.jpg",
  credentials: [
    {
      id: 1,
      icon: "Award",
      title: "Internationally Accredited",
      description: "Our programs are recognized by leading aesthetic medicine boards worldwide"
    },
    {
      id: 2,
      icon: "GraduationCap",
      title: "Expert Faculty",
      description: "Learn from professionals with over 15 years of industry experience"
    },
    {
      id: 3,
      icon: "Users",
      title: "5000+ Graduates",
      description: "Join our network of successful alumni working across the globe"
    },
    {
      id: 4,
      icon: "Building",
      title: "Modern Campus",
      description: "Study in our purpose-built facility with the latest equipment and technology"
    }
  ]
};

// Available icon options
const iconOptions = [
  "Award", "GraduationCap", "Users", "Building", 
  "Briefcase", "Clock", "Heart", "Shield", "Star", "Zap"
];

export const AboutEditor = () => {
  const [data, setData] = useState(initialData);
  const [editingCredential, setEditingCredential] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Try to load from Supabase
        const { data: supabaseData, error } = await supabase
          .from('content')
          .select('*')
          .eq('type', 'about')
          .single();
          
        if (supabaseData?.content && !error) {
          setData(supabaseData.content);
          setIsLoading(false);
          return;
        }
        
        // Fall back to localStorage
        const savedData = localStorage.getItem('aboutData');
        if (savedData) {
          setData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Always save to localStorage as fallback
      localStorage.setItem('aboutData', JSON.stringify(data));
      
      // Try to save to Supabase
      await supabase
        .from('content')
        .upsert({
          type: 'about',
          content: data
        }, { onConflict: 'type' });
      
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Changes saved to local storage only");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, title: e.target.value });
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, subtitle: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, description: e.target.value });
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, imageUrl: e.target.value });
  };

  const handleCredentialEdit = (credential: any) => {
    setEditingCredential({ ...credential });
    setIsDialogOpen(true);
  };

  const handleCredentialAdd = () => {
    const newId = Math.max(0, ...data.credentials.map(c => c.id)) + 1;
    setEditingCredential({
      id: newId,
      icon: "Award",
      title: "",
      description: ""
    });
    setIsDialogOpen(true);
  };

  const handleCredentialDelete = (id: number) => {
    setData({
      ...data,
      credentials: data.credentials.filter(credential => credential.id !== id)
    });
  };

  const handleCredentialSave = () => {
    if (editingCredential) {
      const updatedCredentials = editingCredential.id
        ? data.credentials.map(c => c.id === editingCredential.id ? editingCredential : c)
        : [...data.credentials, editingCredential];
      
      setData({
        ...data,
        credentials: updatedCredentials
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
        <CardTitle>About Section</CardTitle>
        <CardDescription>
          Edit the content for the "About Our Institute" section of your website
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
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={data.description} 
                  onChange={handleDescriptionChange}
                  rows={5}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl" 
                  value={data.imageUrl} 
                  onChange={handleImageUrlChange}
                  placeholder="/images/your-image.jpg"
                />
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Credentials & Achievements</h3>
                  <Button onClick={handleCredentialAdd} size="sm">Add Credential</Button>
                </div>
                
                <ScrollArea className="h-[300px]">
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
                      {data.credentials.map(credential => (
                        <TableRow key={credential.id}>
                          <TableCell>
                            {renderIconOption(credential.icon)}
                          </TableCell>
                          <TableCell className="font-medium">{credential.title}</TableCell>
                          <TableCell className="max-w-[300px] truncate">{credential.description}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleCredentialEdit(credential)}>Edit</Button>
                              <Button variant="destructive" size="sm" onClick={() => handleCredentialDelete(credential.id)}>Delete</Button>
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
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">{data.title}</h2>
                <p className="text-lg text-muted-foreground">{data.subtitle}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div>
                  <p className="text-muted-foreground">{data.description}</p>
                </div>
                <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
                  {data.imageUrl && (
                    <img 
                      src={data.imageUrl} 
                      alt="About our institute" 
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/600x400?text=Institute+Image";
                      }}
                    />
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-6 text-center">Our Credentials</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {data.credentials.map(credential => {
                    const IconComponent = (Icons as any)[credential.icon];
                    return (
                      <div key={credential.id} className="flex flex-col items-center text-center p-4 border rounded-lg">
                        <div className="bg-primary h-12 w-12 rounded-full flex items-center justify-center mb-4">
                          {IconComponent && <IconComponent className="h-6 w-6 text-primary-foreground" />}
                        </div>
                        <h4 className="text-lg font-medium mb-2">{credential.title}</h4>
                        <p className="text-sm text-muted-foreground">{credential.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCredential?.id ? 'Edit Credential' : 'Add Credential'}</DialogTitle>
            </DialogHeader>
            
            {editingCredential && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="credential-icon">Icon</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {iconOptions.map(icon => (
                      <Button
                        key={icon}
                        type="button"
                        variant={editingCredential.icon === icon ? "default" : "outline"}
                        className="h-10 w-10 p-0"
                        onClick={() => setEditingCredential({ ...editingCredential, icon })}
                      >
                        {renderIconOption(icon)}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="credential-title">Title</Label>
                  <Input
                    id="credential-title"
                    value={editingCredential.title}
                    onChange={e => setEditingCredential({ ...editingCredential, title: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="credential-description">Description</Label>
                  <Textarea
                    id="credential-description"
                    value={editingCredential.description}
                    onChange={e => setEditingCredential({ ...editingCredential, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCredentialSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
