import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, X, Save, Facebook, Twitter, Instagram, Linkedin, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Rest of your component code...
// Include the existing JSX but update the saveChanges function

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
      .insert([
        { content: footerContent }
      ]);
    
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

// Include useEffect to fetch data:
useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('footer_content')
        .select('content')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      
      if (data && data.length > 0) {
        const content = data[0].content;
        setFooterData(content);
        if (content.socialLinks) setSocialLinks(content.socialLinks);
        if (content.quickLinks) setQuickLinks(content.quickLinks);
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);

