import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseEditor from '@/components/dashboard/CourseEditor';
import TestimonialEditor from '@/components/dashboard/TestimonialEditor';
import FormEditor from '@/components/dashboard/FormEditor';
import BrochureUpload from '@/components/dashboard/BrochureUpload';
import { AboutEditor } from '@/components/dashboard/AboutEditor';
import { WhyUsEditor } from '@/components/dashboard/WhyUsEditor';
import { FaqEditor } from '@/components/dashboard/FaqEditor';
import FooterEditor from '@/components/dashboard/FooterEditor';
import EnquiriesTable from '@/components/dashboard/EnquiriesTable';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import MapLocationEditor from '@/components/dashboard/MapLocationEditor.tsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import Login from './Login';

// Get WordPress base URL from environment variable
const WP_BASE_URL = import.meta.env.VITE_WP_BASE_URL || 'http://localhost:10000';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [stats, setStats] = useState({
    courses: 0,
    testimonials: 0,
    forms: 3,
    brochures: 4,
    enquiries: 5
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const isAuth = api.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      if (!isAuth) {
        navigate('/dashboard/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchStats = async () => {
        try {
          const courses = await api.getCourses();
          const testimonials = await api.getTestimonials();
          
          setStats({
            courses: courses.length,
            testimonials: testimonials.length,
            forms: 3, // Placeholder count for form submissions
            brochures: 4, // Placeholder count for brochures
            enquiries: 5 // Placeholder count for enquiries
          });
        } catch (error) {
          console.error("Error fetching stats:", error);
          // Set default stats if there's an error
          setStats({
            courses: 0,
            testimonials: 0,
            forms: 0,
            brochures: 0,
            enquiries: 0
          });
        }
      };
      
      fetchStats();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    navigate('/dashboard/login');
  };

  // Show loading until we've checked authentication
  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={
        isAuthenticated ? (
          <div className="container py-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">CMS Dashboard</h1>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="/" className="inline-block">
                  <Button variant="outline">View Website</Button>
                </a>
                <a href={`${WP_BASE_URL}/wp-admin`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">WordPress Admin</Button>
                </a>
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.courses}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Testimonials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.testimonials}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Form Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.forms}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Brochures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.brochures}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Enquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.enquiries}</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="analytics" className="w-full">
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="whyus">Why Us</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="footer">Footer</TabsTrigger>
                <TabsTrigger value="forms">Form Editor</TabsTrigger>
                <TabsTrigger value="brochures">Brochures</TabsTrigger>
              </TabsList>
              <TabsContent value="analytics" className="mt-4">
                <AnalyticsDashboard />
              </TabsContent>
              <TabsContent value="enquiries" className="mt-4">
                <EnquiriesTable />
              </TabsContent>
              <TabsContent value="courses" className="mt-4">
                <CourseEditor />
              </TabsContent>
              <TabsContent value="testimonials" className="mt-4">
                <TestimonialEditor />
              </TabsContent>
              <TabsContent value="about" className="mt-4">
                <AboutEditor />
              </TabsContent>
              <TabsContent value="whyus" className="mt-4">
                <WhyUsEditor />
              </TabsContent>
              <TabsContent value="location" className="mt-4">
                <MapLocationEditor />
              </TabsContent>
              <TabsContent value="faq" className="mt-4">
                <FaqEditor />
              </TabsContent>
              <TabsContent value="footer" className="mt-4">
                <FooterEditor />
              </TabsContent>
              <TabsContent value="forms" className="mt-4">
                <FormEditor />
              </TabsContent>
              <TabsContent value="brochures" className="mt-4">
                <BrochureUpload />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            Redirecting to login...
          </div>
        )
      } />
    </Routes>
  );
};

export default Dashboard; 