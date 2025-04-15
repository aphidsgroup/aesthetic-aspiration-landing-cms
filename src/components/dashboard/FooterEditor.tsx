import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, X, Save, Facebook, Twitter, Instagram, Linkedin, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Initial footer data (fallback)
const initialFooterData = {
  companyName: "Institute of Aesthetic Sciences",
  copyrightText: "© 2023 Institute of Aesthetic Sciences. All rights reserved.",
  tagline: "Transforming careers in aesthetic medicine with world-class education",
  address: "123 Medical Center Boulevard, Bangalore - 560001, India",
  email: "admissions@aestheticsciences.edu",
  phone: "+91 1234567890",
  footerLogo: "/logo-white.png"
};

// Initial social media links (fallback)
const initialSocialLinks = [
  {
    id: 1,
    platform: "Facebook",
    icon: "Facebook",
    url: "https://facebook.com/institute-aesthetic-sciences"
  },
  {
    id: 2,
    platform: "Instagram",
    icon: "Instagram",
    url: "https://instagram.com/aesthetic_sciences"
  }
];

// Initial quick links (fallback)
const initialQuickLinks = [
  { id: 1, label: "Courses", url: "/courses" },
  { id: 2, label: "About Us", url: "/about" }
];

// Available social icon options
const socialIconOptions = [
  { value: "Facebook", label: "Facebook", component: <Facebook className="h-5 w-5" /> },
  { value: "Twitter", label: "Twitter", component: <Twitter className="h-5 w-5" /> },
  { value: "Instagram", label: "Instagram", component: <Instagram className="h-5 w-5" /> },
  { value: "Linkedin", label: "LinkedIn", component: <Linkedin className="h-5 w-5" /> },
  { value: "Globe", label: "Website", component: <Globe className="h-5 w-5" /> }
];

const FooterEditor = () => {
  const [footerData, setFooterData] = useState(initialFooterData);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [quickLinks, setQuickLinks] = useState(initialQuickLinks);
  const [newSocialLink, setNewSocialLink] = useState({
    platform: "",
    icon: "Facebook",
    url: ""
  });
  const [newQuickLink, setNewQuickLink] = useState({
    label: "",
    url: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchFooterData() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('footer_content')
          .select('content')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching footer data:', error);
          return;
        }

        if (data && data.content) {
          const content = data.content;
          setFooterData({
            companyName: content.companyName || initialFooterData.companyName,
            copyrightText: content.copyrightText || initialFooterData.copyrightText,
            tagline: content.tagline || initialFooterData.tagline,
            address: content.address || initialFooterData.address,
            email: content.email || initialFooterData.email,
            phone: content.phone || initialFooterData.phone,
            footerLogo: content.footerLogo || initialFooterData.footerLogo
          });
          
          if (content.socialLinks && Array.isArray(content.socialLinks)) {
            setSocialLinks(content.socialLinks);
          }
          
          if (content.quickLinks && Array.isArray(content.quickLinks)) {
            setQuickLinks(content.quickLinks);
          }
        }
      } catch (error) {
        console.error('Error in fetchFooterData:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFooterData();
  }, []);

  const handleFooterDataChange = (e) => {
    const { name, value } = e.target;
    setFooterData({
      ...footerData,
      [name]: value
    });
  };

  const handleSocialLinkChange = (e, id = null) => {
    const { name, value } = e.target;
    
    if (id) {
      // Edit existing social link
      setSocialLinks(socialLinks.map(link => 
        link.id === id ? { ...link, [name]: value } : link
      ));
    } else {
      // New social link
      setNewSocialLink({
        ...newSocialLink,
        [name]: value
      });
    }
  };

  const handleQuickLinkChange = (e, id = null) => {
    const { name, value } = e.target;
    
    if (id) {
      // Edit existing quick link
      setQuickLinks(quickLinks.map(link => 
        link.id === id ? { ...link, [name]: value } : link
      ));
    } else {
      // New quick link
      setNewQuickLink({
        ...newQuickLink,
        [name]: value
      });
    }
  };

  const addSocialLink = () => {
    if (!newSocialLink.platform || !newSocialLink.url) return;
    
    const newId = Math.max(0, ...socialLinks.map(link => link.id)) + 1;
    
    setSocialLinks([
      ...socialLinks,
      {
        id: newId,
        ...newSocialLink
      }
    ]);
    
    // Reset form
    setNewSocialLink({
      platform: "",
      icon: "Facebook",
      url: ""
    });
  };

  const addQuickLink = () => {
    if (!newQuickLink.label || !newQuickLink.url) return;
    
    const newId = Math.max(0, ...quickLinks.map(link => link.id)) + 1;
    
    setQuickLinks([
      ...quickLinks,
      {
        id: newId,
        ...newQuickLink
      }
    ]);
    
    // Reset form
    setNewQuickLink({
      label: "",
      url: ""
    });
  };

  const removeSocialLink = (id) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const removeQuickLink = (id) => {
    setQuickLinks(quickLinks.filter(link => link.id !== id));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    
    try {
      const footerContent = {
        ...footerData,
        socialLinks,
        quickLinks
      };
      
      // Save to Supabase
      const { error } = await supabase
        .from('footer_content')
        .insert([{ content: footerContent }]);
      
      if (error) throw error;
      
      setIsEditing(false);
      alert("Footer changes saved successfully!");
    } catch (error) {
      console.error('Error saving footer content:', error);
      alert("Error saving changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const getSocialIconComponent = (iconName) => {
    const icon = socialIconOptions.find(option => option.value === iconName);
    return icon ? icon.component : <Globe className="h-5 w-5" />;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Footer Content</CardTitle>
          <CardDescription>
            Edit the content that appears in your website footer
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Contact Information</h3>
                <div className="mt-2 p-4 bg-gray-50 rounded-md space-y-2">
                  <div className="text-lg font-bold">{footerData.companyName}</div>
                  <div className="text-sm text-gray-600">{footerData.tagline}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {footerData.address}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    {footerData.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {footerData.phone}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Social Media Links</h3>
                <div className="mt-2 flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-2 p-2 border rounded-md">
                      {getSocialIconComponent(link.icon)}
                      <span>{link.platform}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Quick Links</h3>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {quickLinks.map((link) => (
                    <div key={link.id} className="p-2 border rounded-md">
                      <span>{link.label}</span>
                      <div className="text-xs text-gray-500 truncate">{link.url}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Copyright Text</h3>
                <div className="mt-2 p-2 bg-gray-100 rounded-md text-sm">
                  {footerData.copyrightText}
                </div>
              </div>
              
              <Button onClick={() => setIsEditing(true)}>Edit Footer Content</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName" 
                    name="companyName" 
                    value={footerData.companyName} 
                    onChange={handleFooterDataChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input 
                    id="tagline" 
                    name="tagline" 
                    value={footerData.tagline} 
                    onChange={handleFooterDataChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    value={footerData.address} 
                    onChange={handleFooterDataChange}
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      value={footerData.email} 
                      onChange={handleFooterDataChange}
                      type="email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={footerData.phone} 
                      onChange={handleFooterDataChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="footerLogo">Footer Logo URL</Label>
                  <Input 
                    id="footerLogo" 
                    name="footerLogo" 
                    value={footerData.footerLogo} 
                    onChange={handleFooterDataChange}
                    placeholder="/logo-white.png"
                  />
                </div>
                
                <div>
                  <Label htmlFor="copyrightText">Copyright Text</Label>
                  <Input 
                    id="copyrightText" 
                    name="copyrightText" 
                    value={footerData.copyrightText} 
                    onChange={handleFooterDataChange}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Social Media Links</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Platform</TableHead>
                      <TableHead className="w-[100px]">Icon</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {socialLinks.map((link) => (
                      <TableRow key={link.id}>
                        <TableCell>
                          <Input 
                            value={link.platform} 
                            name="platform" 
                            onChange={(e) => handleSocialLinkChange(e, link.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <select 
                            value={link.icon} 
                            name="icon" 
                            onChange={(e) => handleSocialLinkChange(e, link.id)}
                            className="w-full p-2 border rounded"
                          >
                            {socialIconOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={link.url} 
                            name="url" 
                            onChange={(e) => handleSocialLinkChange(e, link.id)}
                            placeholder="https://..."
                          />
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => removeSocialLink(link.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Add New Social Link</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <Label htmlFor="new-platform">Platform</Label>
                      <Input 
                        id="new-platform"
                        value={newSocialLink.platform} 
                        name="platform" 
                        onChange={(e) => handleSocialLinkChange(e)}
                        placeholder="e.g. LinkedIn"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-icon">Icon</Label>
                      <select 
                        id="new-icon"
                        value={newSocialLink.icon} 
                        name="icon" 
                        onChange={(e) => handleSocialLinkChange(e)}
                        className="w-full p-2 border rounded"
                      >
                        {socialIconOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="new-url">URL</Label>
                      <Input 
                        id="new-url"
                        value={newSocialLink.url} 
                        name="url" 
                        onChange={(e) => handleSocialLinkChange(e)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <Button 
                    className="mt-2" 
                    size="sm" 
                    onClick={addSocialLink}
                    disabled={!newSocialLink.platform || !newSocialLink.url}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Social Link
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Quick Links</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Label</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quickLinks.map((link) => (
                      <TableRow key={link.id}>
                        <TableCell>
                          <Input 
                            value={link.label} 
                            name="label" 
                            onChange={(e) => handleQuickLinkChange(e, link.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={link.url} 
                            name="url" 
                            onChange={(e) => handleQuickLinkChange(e, link.id)}
                            placeholder="/page-url"
                          />
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => removeQuickLink(link.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Add New Quick Link</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="new-label">Label</Label>
                      <Input 
                        id="new-label"
                        value={newQuickLink.label} 
                        name="label" 
                        onChange={(e) => handleQuickLinkChange(e)}
                        placeholder="e.g. Privacy Policy"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-quick-url">URL</Label>
                      <Input 
                        id="new-quick-url"
                        value={newQuickLink.url} 
                        name="url" 
                        onChange={(e) => handleQuickLinkChange(e)}
                        placeholder="/privacy-policy"
                      />
                    </div>
                  </div>
                  <Button 
                    className="mt-2" 
                    size="sm" 
                    onClick={addQuickLink}
                    disabled={!newQuickLink.label || !newQuickLink.url}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Quick Link
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

export default FooterEditor;
