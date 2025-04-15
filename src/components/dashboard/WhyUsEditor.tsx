import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, UserCheck, Award, Briefcase, Users, BookOpen, PlusCircle, X, Save, Edit } from 'lucide-react';

// Initial Why Us section data
const initialWhyUsData = {
  title: "Why Choose Us",
  subtitle: "Our institute stands out through excellence in training, international recognition, and a commitment to producing highly skilled aesthetic medicine professionals",
  footerText: "Join over 5000+ successful alumni from 32 countries"
};

// Initial features data
const initialFeatures = [
  {
    id: 1,
    icon: "Globe",
    title: "Internationally Recognized Curriculum",
    description: "Our curriculum meets international standards and is recognized by aesthetic medicine bodies worldwide"
  },
  {
    id: 2,
    icon: "UserCheck",
    title: "Hands-On Live Model Training",
    description: "Gain practical experience through extensive hands-on training with real patients under expert supervision"
  },
  {
    id: 3,
    icon: "Award",
    title: "Expert Cosmetic Surgeons as Trainers",
    description: "Learn directly from practicing cosmetic surgeons with decades of clinical and teaching experience"
  },
  {
    id: 4,
    icon: "Briefcase",
    title: "Career Placement Assistance",
    description: "Receive comprehensive support for clinic placements both in India and internationally"
  },
  {
    id: 5,
    icon: "Users",
    title: "Limited Seats Per Batch",
    description: "Small batch sizes ensure personalized attention and optimal learning experience for every student"
  },
  {
    id: 6,
    icon: "BookOpen",
    title: "Comprehensive Learning Materials",
    description: "Access to exclusive textbooks, digital resources, and ongoing learning opportunities"
  }
];

// Available icon options
const iconOptions = [
  { value: "Globe", label: "Globe", component: <Globe className="h-5 w-5" /> },
  { value: "UserCheck", label: "User Check", component: <UserCheck className="h-5 w-5" /> },
  { value: "Award", label: "Award", component: <Award className="h-5 w-5" /> },
  { value: "Briefcase", label: "Briefcase", component: <Briefcase className="h-5 w-5" /> },
  { value: "Users", label: "Users", component: <Users className="h-5 w-5" /> },
  { value: "BookOpen", label: "Book Open", component: <BookOpen className="h-5 w-5" /> }
];

const WhyUsEditor = () => {
  const [whyUsData, setWhyUsData] = useState(initialWhyUsData);
  const [features, setFeatures] = useState(initialFeatures);
  const [newFeature, setNewFeature] = useState({
    icon: "Globe",
    title: "",
    description: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingFeatureId, setEditingFeatureId] = useState(null);

  const handleWhyUsDataChange = (e) => {
    const { name, value } = e.target;
    setWhyUsData({
      ...whyUsData,
      [name]: value
    });
  };

  const handleFeatureChange = (e, id) => {
    const { name, value } = e.target;
    
    if (id) {
      // Edit existing feature
      setFeatures(features.map(feature => 
        feature.id === id ? { ...feature, [name]: value } : feature
      ));
    } else {
      // New feature
      setNewFeature({
        ...newFeature,
        [name]: value
      });
    }
  };

  const addFeature = () => {
    if (!newFeature.title || !newFeature.description) return;
    
    const newId = Math.max(0, ...features.map(f => f.id)) + 1;
    
    setFeatures([
      ...features,
      {
        id: newId,
        ...newFeature
      }
    ]);
    
    // Reset form
    setNewFeature({
      icon: "Globe",
      title: "",
      description: ""
    });
  };

  const removeFeature = (id) => {
    if (features.length <= 1) {
      alert("You must have at least one feature");
      return;
    }
    
    setFeatures(features.filter(feature => feature.id !== id));
  };

  const startEditFeature = (feature) => {
    setEditingFeatureId(feature.id);
  };

  const cancelEditFeature = () => {
    setEditingFeatureId(null);
  };

  const saveChanges = () => {
    setIsSaving(true);
    
    // Simulate API call to save changes
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      alert("Changes saved successfully!");
    }, 1000);
  };

  const getIconComponent = (iconName) => {
    const icon = iconOptions.find(option => option.value === iconName);
    return icon ? icon.component : <Globe className="h-5 w-5" />;
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Why Choose Us Section</CardTitle>
          <CardDescription>
            Edit the content of the Why Choose Us section that appears on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Current Content</h3>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-bold text-xl">{whyUsData.title}</h4>
                  <p className="mt-2 text-gray-600">{whyUsData.subtitle}</p>
                </div>
                <div className="mt-2 p-2 bg-gray-100 rounded-md text-center text-sm">
                  <p>{whyUsData.footerText}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Features</h3>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature) => (
                    <Card key={feature.id} className="p-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {getIconComponent(feature.icon)}
                        </div>
                        <div>
                          <h4 className="font-medium">{feature.title}</h4>
                          <p className="text-sm text-gray-500">{feature.description}</p>
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
                    value={whyUsData.title} 
                    onChange={handleWhyUsDataChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="subtitle">Section Subtitle</Label>
                  <Textarea 
                    id="subtitle" 
                    name="subtitle" 
                    value={whyUsData.subtitle} 
                    onChange={handleWhyUsDataChange}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="footerText">Footer Text</Label>
                  <Input 
                    id="footerText" 
                    name="footerText" 
                    value={whyUsData.footerText} 
                    onChange={handleWhyUsDataChange}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Features</h3>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Icon</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {features.map((feature) => (
                      <TableRow key={feature.id}>
                        <TableCell>
                          <select 
                            value={feature.icon} 
                            name="icon" 
                            onChange={(e) => handleFeatureChange(e, feature.id)}
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
                            value={feature.title} 
                            name="title" 
                            onChange={(e) => handleFeatureChange(e, feature.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={feature.description} 
                            name="description" 
                            onChange={(e) => handleFeatureChange(e, feature.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => removeFeature(feature.id)}
                              disabled={features.length <= 1}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Add New Feature</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="new-icon">Icon</Label>
                        <select 
                          id="new-icon"
                          value={newFeature.icon} 
                          name="icon" 
                          onChange={(e) => handleFeatureChange(e)}
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
                          value={newFeature.title} 
                          name="title" 
                          onChange={(e) => handleFeatureChange(e)}
                          placeholder="e.g. Internationally Recognized Curriculum"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new-description">Description</Label>
                      <Textarea 
                        id="new-description"
                        value={newFeature.description} 
                        name="description" 
                        onChange={(e) => handleFeatureChange(e)}
                        placeholder="e.g. Our curriculum meets international standards..."
                        rows={2}
                      />
                    </div>
                  </div>
                  <Button 
                    className="mt-2" 
                    size="sm" 
                    onClick={addFeature}
                    disabled={!newFeature.title || !newFeature.description}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Feature
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

export default WhyUsEditor; 