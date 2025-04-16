import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from '@supabase/supabase-js';
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import {
  ChevronDown,
  Users,
  MousePointerClick,
  Share2,
  Smartphone,
  MonitorSmartphone,
  BarChart3,
  TrendingUp,
  Calendar as CalendarIcon,
  Laptop,
  Phone,
  Tablet,
  Globe,
} from 'lucide-react';

// Sample analytics data - in a real app, this would come from your analytics provider API
const analyticsData = {
  summary: {
    visitors: 5283,
    pageViews: 18724,
    conversionRate: 2.34,
    formSubmissions: 124,
    averageSessionDuration: 152, // seconds
    bounceRate: 42.3,
  },
  trafficSources: [
    { source: 'Organic Search', sessions: 2341, percentage: 44.3 },
    { source: 'Direct', sessions: 1249, percentage: 23.6 },
    { source: 'Social Media', sessions: 876, percentage: 16.6 },
    { source: 'Referral', sessions: 532, percentage: 10.1 },
    { source: 'Email', sessions: 285, percentage: 5.4 },
  ],
  popularPages: [
    { page: '/', title: 'Home', views: 4231 },
    { page: '/courses', title: 'Courses', views: 3127 },
    { page: '/about', title: 'About Us', views: 1893 },
    { page: '/contact', title: 'Contact', views: 1562 },
    { page: '/courses/aesthetic-medicine', title: 'Aesthetic Medicine Course', views: 1245 },
  ],
  deviceBreakdown: {
    desktop: 62.5,
    mobile: 31.2,
    tablet: 6.3,
  },
  dailyVisitors: [
    { date: '2023-11-01', visitors: 173 },
    { date: '2023-11-02', visitors: 198 },
    { date: '2023-11-03', visitors: 187 },
    { date: '2023-11-04', visitors: 152 },
    { date: '2023-11-05', visitors: 143 },
    { date: '2023-11-06', visitors: 176 },
    { date: '2023-11-07', visitors: 191 },
    { date: '2023-11-08', visitors: 205 },
    { date: '2023-11-09', visitors: 214 },
    { date: '2023-11-10', visitors: 223 },
    { date: '2023-11-11', visitors: 198 },
    { date: '2023-11-12', visitors: 182 },
    { date: '2023-11-13', visitors: 203 },
    { date: '2023-11-14', visitors: 219 },
  ],
  topCountries: [
    { country: 'India', visitors: 3241, percentage: 61.3 },
    { country: 'United States', visitors: 572, percentage: 10.8 },
    { country: 'United Arab Emirates', visitors: 423, percentage: 8.0 },
    { country: 'United Kingdom', visitors: 321, percentage: 6.1 },
    { country: 'Singapore', visitors: 187, percentage: 3.5 },
  ],
};

const presetDateRanges = [
  { label: 'Last 7 days', value: 'last7days' },
  { label: 'Last 30 days', value: 'last30days' },
  { label: 'This month', value: 'thisMonth' },
  { label: 'Last 90 days', value: 'last90days' },
  { label: 'Year to date', value: 'yearToDate' },
];

// Mock chart component - in a real app, use a proper chart library like recharts or chart.js
const MockChart = ({ title, height = 250 }: { title: string; height?: number }) => (
  <div 
    className="w-full mt-2 bg-muted rounded-md" 
    style={{ height: `${height}px` }}
  >
    <div className="h-full flex items-center justify-center p-4">
      <div className="text-center">
        <BarChart3 className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="mt-2 text-muted-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">
          (Chart visualization would appear here in the actual implementation)
        </p>
      </div>
    </div>
  </div>
);

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsState, setAnalyticsState] = useState(analyticsData);
  const [chartType, setChartType] = useState('visitors');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch data from an analytics API based on the dateRange
        // For this demo, we're just using the sample data and adding a delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Try to get data from Supabase if available
        try {
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qehgflksdftpsxnqnekd.supabase.co';
          const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlaGdmbGtzZGZ0cHN4bnFuZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NDc1MzcsImV4cCI6MjAyNjQyMzUzN30.tmQE5oGHaBgWhNoGJ9RSkLoMgSeEZv0MMUXz7YDVjwQ';
          const supabase = createClient(supabaseUrl, supabaseKey);
          
          const { data: analyticsData, error } = await supabase
            .from('analytics')
            .select('*')
            .eq('date_range', dateRange)
            .single();
            
          if (!error && analyticsData?.data) {
            setAnalyticsState(analyticsData.data);
          }
        } catch (err) {
          console.error("Error fetching from Supabase:", err);
          // Use the sample data if Supabase fails
        }
      } catch (error) {
        console.error("Error loading analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [dateRange]);

  // Get formatted date range for display
  const getFormattedDateRange = () => {
    const today = new Date();
    
    switch (dateRange) {
      case 'last7days':
        return `${format(subDays(today, 7), 'MMM d, yyyy')} - ${format(today, 'MMM d, yyyy')}`;
      case 'last30days':
        return `${format(subDays(today, 30), 'MMM d, yyyy')} - ${format(today, 'MMM d, yyyy')}`;
      case 'thisMonth':
        return `${format(startOfMonth(today), 'MMM d, yyyy')} - ${format(endOfMonth(today), 'MMM d, yyyy')}`;
      case 'last90days':
        return `${format(subDays(today, 90), 'MMM d, yyyy')} - ${format(today, 'MMM d, yyyy')}`;
      case 'yearToDate':
        return `${format(startOfYear(today), 'MMM d, yyyy')} - ${format(today, 'MMM d, yyyy')}`;
      default:
        return 'Custom Date Range';
    }
  };

  // Format session duration to readable format
  const formatSessionDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>
              View your website performance and visitor statistics
            </CardDescription>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {getFormattedDateRange()}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Select
                  onValueChange={(value) => setDateRange(value)}
                  defaultValue={dateRange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    {presetDateRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="p-3 border-t">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date > new Date()}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[500px] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading analytics data...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Key Metrics Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <Users className="h-8 w-8 text-primary opacity-75" />
                    <p className="text-sm font-medium text-muted-foreground">Visitors</p>
                    <p className="text-2xl font-bold">{analyticsState.summary.visitors.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <MousePointerClick className="h-8 w-8 text-primary opacity-75" />
                    <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                    <p className="text-2xl font-bold">{analyticsState.summary.pageViews.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <TrendingUp className="h-8 w-8 text-primary opacity-75" />
                    <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">{analyticsState.summary.conversionRate.toFixed(1)}%</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <Share2 className="h-8 w-8 text-primary opacity-75" />
                    <p className="text-sm font-medium text-muted-foreground">Form Submissions</p>
                    <p className="text-2xl font-bold">{analyticsState.summary.formSubmissions}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <MonitorSmartphone className="h-8 w-8 text-primary opacity-75" />
                    <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                    <p className="text-2xl font-bold">{formatSessionDuration(analyticsState.summary.averageSessionDuration)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <Smartphone className="h-8 w-8 text-primary opacity-75" />
                    <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">{analyticsState.summary.bounceRate.toFixed(1)}%</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visitor Trends & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Visitor Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Select
                      value={chartType}
                      onValueChange={setChartType}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visitors">Visitors</SelectItem>
                        <SelectItem value="pageViews">Page Views</SelectItem>
                        <SelectItem value="conversions">Conversions</SelectItem>
                        <SelectItem value="bounceRate">Bounce Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <MockChart title="Visitor Trends Over Time" height={300} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Device Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Laptop className="h-4 w-4 text-muted-foreground" />
                        <span>Desktop</span>
                      </div>
                      <div className="font-medium">{analyticsState.deviceBreakdown.desktop}%</div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-primary rounded-full h-2.5" 
                        style={{ width: `${analyticsState.deviceBreakdown.desktop}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>Mobile</span>
                      </div>
                      <div className="font-medium">{analyticsState.deviceBreakdown.mobile}%</div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-primary rounded-full h-2.5" 
                        style={{ width: `${analyticsState.deviceBreakdown.mobile}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tablet className="h-4 w-4 text-muted-foreground" />
                        <span>Tablet</span>
                      </div>
                      <div className="font-medium">{analyticsState.deviceBreakdown.tablet}%</div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-primary rounded-full h-2.5" 
                        style={{ width: `${analyticsState.deviceBreakdown.tablet}%` }}
                      ></div>
                    </div>
                    
                    <MockChart title="Device Distribution" height={160} />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Traffic sources & Popular pages */}
            <Tabs defaultValue="traffic">
              <TabsList>
                <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
                <TabsTrigger value="pages">Popular Pages</TabsTrigger>
                <TabsTrigger value="geography">Geography</TabsTrigger>
              </TabsList>
              
              <TabsContent value="traffic" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-sm font-medium mb-4">Top Traffic Sources</h4>
                        <div className="space-y-6">
                          {analyticsState.trafficSources.map((source, i) => (
                            <div key={i}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">{source.source}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{source.sessions.toLocaleString()}</span>
                                  <span className="text-xs text-muted-foreground">{source.percentage}%</span>
                                </div>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1.5">
                                <div 
                                  className="bg-primary rounded-full h-1.5" 
                                  style={{ width: `${source.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-4">Traffic Sources Breakdown</h4>
                        <MockChart title="Traffic Sources Distribution" height={240} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pages" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-sm font-medium mb-4">Most Viewed Pages</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium p-2">Page</th>
                            <th className="text-left font-medium p-2">URL</th>
                            <th className="text-right font-medium p-2">Views</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analyticsState.popularPages.map((page, i) => (
                            <tr key={i} className="border-b">
                              <td className="p-2">{page.title}</td>
                              <td className="p-2 text-primary">{page.page}</td>
                              <td className="p-2 text-right font-medium">{page.views.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="geography" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-sm font-medium mb-4">Top Countries</h4>
                        <div className="space-y-6">
                          {analyticsState.topCountries.map((country, i) => (
                            <div key={i}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{country.country}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{country.visitors.toLocaleString()}</span>
                                  <span className="text-xs text-muted-foreground">{country.percentage}%</span>
                                </div>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1.5">
                                <div 
                                  className="bg-primary rounded-full h-1.5" 
                                  style={{ width: `${country.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-4">Global Visitor Distribution</h4>
                        <MockChart title="Country Distribution Map" height={240} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsDashboard; 