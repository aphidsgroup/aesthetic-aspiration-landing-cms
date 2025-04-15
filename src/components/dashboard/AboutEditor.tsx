import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Medal, Building, Users, GraduationCap, PlusCircle, X, Save } from 'lucide-react';
import { supabase } from "@/lib/supabase";

// Initial about section data
const initialAboutData = {
  title: "About the Institute",
  subtitle: "Established in 2005, the Institute of Aesthetic Sciences is a premier center for aesthetic education, combining modern infrastructure with world-class faculty to deliver exceptional training programs. Our international certification and state-of-the-art facilities ensure students receive the best education to excel in the growing field of aesthetic medicine.",
  imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

// Initial credentials data
const initialCredentials = [
  {
    id: 1,
    icon: "Medal",
    title: "ISO Certified",
    description: "9001:2015 certified institution for quality management systems"
  },
  {
    id: 2,
    icon: "Building",
    title: "15+ Years of Excellence",
    description: "Pioneering aesthetic medicine education since 2005"
  },
  {
    id: 3,
    icon: "Users",
    title: "5000+ Alumni Network",
    description: "Professionals thriving in clinics across 32 countries"
  },
  {
    id: 4,
    icon: "GraduationCap",
    title: "Expert Faculty",
    description: "Learn from renowned cosmetic surgeons and practitioners"
  }
];

// Available icon options
const iconOptions = [
  { value: "Medal", label: "Medal", component: <Medal className="h-5 w-5" /> },
  { value: "Building", label: "Building", component: <Building className="h-5 w-5" /> },
  { value: "Users", label: "Users", component: <Users className="h-5 w-5" /> },
  { value: "GraduationCap", label: "Graduation Cap", component: <GraduationCap className="h-5 w-5" /> }
];

const AboutEditor = () => {
  const [aboutData, setAboutData] = useState(initialAboutData);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [editingCredential, setEditingCredential] = useState(null);
  const [newCredential, setNewCredential] = useState({
    icon: "Medal",
    title: "",
    description: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch about data from Supabase
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('about_content')
          .select('content')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching about data:', error);
          return;
        }

        if (data && data.content) {
          const content = data.content;
          setAboutData({
            title: content.title || initialAboutData.title,
            subtitle: content.subtitle || initialAboutData.subtitle,
            imageUrl: content.imageUrl || initialAboutData.imageUrl
          });
          
          if (content.credentials && Array.isArray(content.credentials)) {
            setCredentials(content.credentials);
          }
        }
      } catch (error) {
        console.error('Error in fetchAboutData:', error);
        // Fallback to initial data
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const handleAboutDataChange = (e) => {
    const { name, value } = e.target;
    setAboutData({
      ...aboutData,
      [name]: value
    });
  };

  const handleCredentialChange = (e, id = null) => {
    const { name, value } = e.target;
    
    if (id) {
      // Edit existing credential
      setCredentials(credentials.map(cred => 
        cred.id === id ? { ...cred, [name]: value } : cred
      ));
    } else {
      // New credential
      setNewCredential({
        ...newCredential,
        [name]: value
      });
    }
  };

  const addCredential = () => {
    if (!newCredential.title || !newCredential.description) return;
    
    const newId = Math.max(0, ...credentials.map(c => c.id)) + 1;
    
    setCredentials([
      ...credentials,
      {
        id: newId,
        ...newCredential
      }
    ]);
    
    // Reset form
    setNewCredential({
      icon: "Medal",
      title: "",
      description: ""
    });
  };

  const removeCredential = (id) => {
    if (credentials.length <= 1) {
      alert("You must have at least one credential");
      return;
    }
    
    setCredentials(credentials.filter(cred => cred.id !== id));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    
    try {
      // Prepare the data to save
      const aboutContent = {
        ...aboutData,
        credentials
      };
      
      // Save to Supabase
      const { error } = await supabase
        .from('about_content')
        .insert([
          { content: aboutContent }
        ]);
      
      if (error) throw error;
      
      setIsEditing(false);
      alert("About section changes saved successfully!");
    } catch (error) {
      console.error('Error saving about section data:', error);
      alert("Error saving changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const getIconComponent = (iconName) => {
    const icon = iconOptions.find(option => option.value === iconName);
    return icon ? icon.component : <Medal className="h-5 w-5" />;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Rest of component with existing JSX from the original file
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>
            Edit the content of the About section that appears on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Current Content</h3>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-bold text-xl">{aboutData.title}</h4>
                  <p className="mt-2 text-gray-600">{aboutData.subtitle}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">About Image</h3>
                <div className="mt-2 relative w-full h-48 overflow-hidden rounded-md">
                  <img 
                    src={aboutData.imageUrl} 
                    alt="About Section" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Credentials</h3>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {credentials.map((credential) => (
                    <Card key={credential.id} className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {getIconComponent(credential.icon)}
                        </div>
                        <div>
                          <h4 className="font-medium">{credential.title}</h4>
                          <p className="text-sm text-gray-500">{credential.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Button onClick={() => setIsEditing(true)}>Edit Content</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Section Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={aboutData.title} 
                    onChange={handleAboutDataChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="subtitle">Section Subtitle</Label>
                  <Textarea 
                    id="subtitle" 
                    name="subtitle" 
                    value={aboutData.subtitle} 
                    onChange={handleAboutDataChange}
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input 
                    id="imageUrl" 
                    name="imageUrl" 
                    value={aboutData.imageUrl} 
                    onChange={handleAboutDataChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  <div className="mt-2 relative w-full h-40 overflow-hidden rounded-md">
                    <img 
                      src={aboutData.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Credentials</h3>
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
                    {credentials.map((credential) => (
                      <TableRow key={credential.id}>
                        <TableCell>
                          <select 
                            value={credential.icon} 
                            name="icon" 
                            onChange={(e) => handleCredentialChange(e, credential.id)}
                            className="w-full p-2 border rounded"
                          >
                            {iconOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={credential.title} 
                            name="title" 
                            onChange={(e) => handleCredentialChange(e, credential.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={credential.description} 
                            name="description" 
                            onChange={(e) => handleCredentialChange(e, credential.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => removeCredential(credential.id)}
                            disabled={credentials.length <= 1}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Add New Credential</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label htmlFor="new-icon">Icon</Label>
                      <select 
                        id="new-icon"
                        value={newCredential.icon} 
                        name="icon" 
                        onChange={(e) => handleCredentialChange(e)}
                        className="w-full p-2 border rounded"
                      >
                        {iconOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="new-title">Title</Label>
                      <Input 
                        id="new-title"
                        value={newCredential.title} 
                        name="title" 
                        onChange={(e) => handleCredentialChange(e)}
                        placeholder="e.g. ISO Certified"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-description">Description</Label>
                      <Input 
                        id="new-description"
                        value={newCredential.description} 
                        name="description" 
                        onChange={(e) => handleCredentialChange(e)}
                        placeholder="e.g. 9001:2015 certified institution"
                      />
                    </div>
                  </div>
                  <Button 
                    className="mt-2" 
                    size="sm" 
                    onClick={addCredential}
                    disabled={!newCredential.title || !newCredential.description}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Credential
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

export default AboutEditor;
