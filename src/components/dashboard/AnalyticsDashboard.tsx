import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { 
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  Download, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  MousePointerClick, 
  Clock 
} from "lucide-react";

// Sample analytics data for charts
const websiteTrafficData = [
  { name: 'Jan', Visitors: 730, PageViews: 1700 },
  { name: 'Feb', Visitors: 890, PageViews: 2200 },
  { name: 'Mar', Visitors: 950, PageViews: 2400 },
  { name: 'Apr', Visitors: 1200, PageViews: 3000 },
  { name: 'May', Visitors: 1100, PageViews: 2700 },
  { name: 'Jun', Visitors: 1300, PageViews: 3400 },
  { name: 'Jul', Visitors: 1500, PageViews: 3800 },
  { name: 'Aug', Visitors: 1700, PageViews: 4200 },
  { name: 'Sep', Visitors: 1600, PageViews: 4000 }
];

const conversionData = [
  { name: 'Jan', ConversionRate: 2.1 },
  { name: 'Feb', ConversionRate: 2.3 },
  { name: 'Mar', ConversionRate: 2.5 },
  { name: 'Apr', ConversionRate: 3.2 },
  { name: 'May', ConversionRate: 3.1 },
  { name: 'Jun', ConversionRate: 3.5 },
  { name: 'Jul', ConversionRate: 4.1 },
  { name: 'Aug', ConversionRate: 4.7 },
  { name: 'Sep', ConversionRate: 4.5 }
];

const trafficSourceData = [
  { name: 'Google', value: 60 },
  { name: 'Direct', value: 20 },
  { name: 'Social', value: 12 },
  { name: 'Referral', value: 5 },
  { name: 'Email', value: 3 }
];

const courseInterestData = [
  { name: 'Botox & Fillers', value: 35 },
  { name: 'Comprehensive', value: 25 },
  { name: 'Thread Lift', value: 15 },
  { name: 'Laser Course', value: 10 },
  { name: 'PRP Training', value: 8 },
  { name: 'Other', value: 7 }
];

const AnalyticsDashboard = () => {
  // Calculate summary metrics
  const totalVisitors = websiteTrafficData.reduce((sum, item) => sum + item.Visitors, 0);
  const totalPageViews = websiteTrafficData.reduce((sum, item) => sum + item.PageViews, 0);
  const averageConversion = conversionData.reduce((sum, item) => sum + item.ConversionRate, 0) / conversionData.length;
  
  // Previous month comparisons
  const lastMonthVisitors = websiteTrafficData[websiteTrafficData.length - 2].Visitors;
  const currentMonthVisitors = websiteTrafficData[websiteTrafficData.length - 1].Visitors;
  const visitorGrowth = ((currentMonthVisitors - lastMonthVisitors) / lastMonthVisitors) * 100;
  
  const lastMonthConversion = conversionData[conversionData.length - 2].ConversionRate;
  const currentMonthConversion = conversionData[conversionData.length - 1].ConversionRate;
  const conversionGrowth = ((currentMonthConversion - lastMonthConversion) / lastMonthConversion) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex gap-1">
            <Calendar className="mr-1 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Top Cards - Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {visitorGrowth >= 0 ? (
                <>
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">{visitorGrowth.toFixed(1)}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500">{Math.abs(visitorGrowth).toFixed(1)}%</span>
                </>
              )}
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Page Views
            </CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Avg. {(totalPageViews / totalVisitors).toFixed(1)} pages per visitor
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageConversion.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {conversionGrowth >= 0 ? (
                <>
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">{conversionGrowth.toFixed(1)}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500">{Math.abs(conversionGrowth).toFixed(1)}%</span>
                </>
              )}
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Time on Site
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 48s</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Website Traffic</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Rate</TabsTrigger>
          <TabsTrigger value="interest">Course Interest</TabsTrigger>
        </TabsList>
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Traffic</CardTitle>
              <CardDescription>
                Website visitors and page views over the last 9 months
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={websiteTrafficData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Visitors" fill="#8884d8" />
                    <Bar dataKey="PageViews" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div>Updated 1 day ago</div>
              <div>Total visitors this year: {totalVisitors.toLocaleString()}</div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>
                Percentage of visitors who submit an enquiry form
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={conversionData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ConversionRate" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div>Updated 1 day ago</div>
              <div>Average conversion rate: {averageConversion.toFixed(1)}%</div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="interest" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>
                  How visitors are finding your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSourceData.map(source => (
                    <div key={source.name} className="flex items-center">
                      <div className="w-[30%] font-medium">{source.name}</div>
                      <div className="w-[70%] flex items-center gap-2">
                        <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full" 
                            style={{ width: `${source.value}%` }}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground w-[30px]">
                          {source.value}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Course Interest</CardTitle>
                <CardDescription>
                  Most popular courses by enquiry volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseInterestData.map(course => (
                    <div key={course.name} className="flex items-center">
                      <div className="w-[40%] font-medium">{course.name}</div>
                      <div className="w-[60%] flex items-center gap-2">
                        <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full" 
                            style={{ width: `${course.value}%` }}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground w-[30px]">
                          {course.value}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Popular Pages</CardTitle>
            <CardDescription>
              Most visited pages on your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium">
                <div>Page</div>
                <div>Views</div>
                <div>Conversion</div>
              </div>
              <div className="space-y-2">
                {[
                  { page: "Homepage", views: 4380, conversion: "3.2%" },
                  { page: "Courses Overview", views: 2740, conversion: "4.3%" },
                  { page: "Botox & Fillers Course", views: 1830, conversion: "7.1%" },
                  { page: "About Us", views: 1580, conversion: "2.5%" },
                  { page: "Contact Page", views: 1320, conversion: "5.8%" }
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 items-center p-2 rounded-lg bg-slate-50">
                    <div className="font-medium">{item.page}</div>
                    <div>{item.views.toLocaleString()}</div>
                    <div>{item.conversion}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Lead Attribution</CardTitle>
            <CardDescription>
              How leads discover your courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: "Google Search", percentage: 42, count: 67 },
                { source: "Direct / Referral", percentage: 28, count: 45 },
                { source: "Social Media", percentage: 16, count: 26 },
                { source: "Email Campaigns", percentage: 9, count: 14 },
                { source: "Other", percentage: 5, count: 8 }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{item.source}</p>
                      <div className="text-xs text-muted-foreground">{item.count} leads</div>
                    </div>
                  </div>
                  <div className="font-medium">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 