import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, UserCheck, Award, Briefcase, Users, BookOpen, PlusCircle, X, Save, Edit } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Rest of component with Supabase integration...
// Add Supabase fetch in useEffect and update saveChanges to use supabase.from('whyus_content').insert()
