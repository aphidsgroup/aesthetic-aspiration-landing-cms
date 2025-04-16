import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  MoreVertical,
  Trash2,
  Mail,
  Phone,
  UserCircle,
  Check,
  X,
  ArrowDownAZ,
  ArrowUpAZ,
  Download,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createClient } from '@supabase/supabase-js';

// Sample data for enquiries (will be replaced by actual API data)
const initialEnquiries = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    course: "Advanced Aesthetic Medicine",
    message: "I'm interested in the upcoming batch. When does it start?",
    status: "New",
    date: "2023-11-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 8765432109",
    course: "Facial Aesthetics & Fillers",
    message: "I'd like to know more about the course structure and certification.",
    status: "Contacted",
    date: "2023-11-14T14:45:00Z"
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "+91 7654321098",
    course: "Botox & Dermal Fillers",
    message: "Can you please send me the detailed fee structure?",
    status: "Resolved",
    date: "2023-11-10T09:15:00Z"
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+91 6543210987",
    course: "Advanced Aesthetic Medicine",
    message: "I'm a practicing dermatologist. Do you offer any special packages for professionals?",
    status: "New",
    date: "2023-11-08T16:20:00Z"
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+91 5432109876",
    course: "Laser Treatments & Safety",
    message: "What are the prerequisites for the course?",
    status: "Contacted",
    date: "2023-11-05T11:10:00Z"
  }
];

const statusColorMap: Record<string, string> = {
  New: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  Contacted: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  Resolved: "bg-green-100 text-green-800 hover:bg-green-200",
  Archived: "bg-gray-100 text-gray-800 hover:bg-gray-200"
};

const EnquiriesTable = () => {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      setIsLoading(true);
      try {
        // Try to load from Supabase
        try {
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qehgflksdftpsxnqnekd.supabase.co';
          const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlaGdmbGtzZGZ0cHN4bnFuZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NDc1MzcsImV4cCI6MjAyNjQyMzUzN30.tmQE5oGHaBgWhNoGJ9RSkLoMgSeEZv0MMUXz7YDVjwQ';
          const supabase = createClient(supabaseUrl, supabaseKey);
          
          const { data: enquiriesData, error } = await supabase
            .from('enquiries')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (!error && enquiriesData && enquiriesData.length > 0) {
            setEnquiries(enquiriesData);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error("Error fetching from Supabase:", err);
        }
        
        // If Supabase failed or returned no data, use the initial data
        // In a real app, you'd want to fetch from your API here
        setEnquiries(initialEnquiries);
      } catch (error) {
        console.error("Error loading enquiries:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEnquiries();
  }, []);

  const handleViewEnquiry = (enquiry: any) => {
    setSelectedEnquiry(enquiry);
    setViewDialogOpen(true);
  };

  const handleDeleteClick = (enquiry: any) => {
    setSelectedEnquiry(enquiry);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedEnquiry) return;
    
    try {
      // Filter out the enquiry locally
      setEnquiries(enquiries.filter(e => e.id !== selectedEnquiry.id));
      
      // Try to delete from Supabase
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qehgflksdftpsxnqnekd.supabase.co';
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlaGdmbGtzZGZ0cHN4bnFuZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NDc1MzcsImV4cCI6MjAyNjQyMzUzN30.tmQE5oGHaBgWhNoGJ9RSkLoMgSeEZv0MMUXz7YDVjwQ';
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        const { error } = await supabase
          .from('enquiries')
          .delete()
          .eq('id', selectedEnquiry.id);
          
        if (error) {
          console.error("Error deleting from Supabase:", error);
        }
      } catch (err) {
        console.error("Supabase delete error:", err);
      }
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    } finally {
      setDeleteDialogOpen(false);
      setSelectedEnquiry(null);
    }
  };

  const updateEnquiryStatus = async (enquiry: any, newStatus: string) => {
    try {
      // Update locally
      setEnquiries(enquiries.map(e => 
        e.id === enquiry.id ? { ...e, status: newStatus } : e
      ));
      
      // Try to update in Supabase
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qehgflksdftpsxnqnekd.supabase.co';
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlaGdmbGtzZGZ0cHN4bnFuZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NDc1MzcsImV4cCI6MjAyNjQyMzUzN30.tmQE5oGHaBgWhNoGJ9RSkLoMgSeEZv0MMUXz7YDVjwQ';
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        const { error } = await supabase
          .from('enquiries')
          .update({ status: newStatus })
          .eq('id', enquiry.id);
          
        if (error) {
          console.error("Error updating status in Supabase:", error);
        }
      } catch (err) {
        console.error("Supabase update error:", err);
      }
    } catch (error) {
      console.error("Error updating enquiry status:", error);
    }
  };

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting, filtering, and searching
  const sortedAndFilteredEnquiries = () => {
    let result = [...enquiries];
    
    // Apply search filter if present
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(enquiry => 
        enquiry.name.toLowerCase().includes(lowerSearchTerm) ||
        enquiry.email.toLowerCase().includes(lowerSearchTerm) ||
        enquiry.phone.toLowerCase().includes(lowerSearchTerm) ||
        enquiry.course.toLowerCase().includes(lowerSearchTerm) ||
        enquiry.message.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Apply status filter if selected
    if (statusFilter) {
      result = result.filter(enquiry => enquiry.status === statusFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    return result;
  };

  const exportToCsv = () => {
    const filteredData = sortedAndFilteredEnquiries();
    const headers = ['Name', 'Email', 'Phone', 'Course', 'Message', 'Status', 'Date'];
    
    const csvRows = [
      headers.join(','),
      ...filteredData.map(enquiry => {
        const escapedMessage = enquiry.message.replace(/"/g, '""');
        return [
          enquiry.name,
          enquiry.email,
          enquiry.phone,
          enquiry.course,
          `"${escapedMessage}"`,
          enquiry.status,
          new Date(enquiry.date).toLocaleDateString()
        ].join(',');
      })
    ];
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'enquiries.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Enquiries</CardTitle>
        <CardDescription>
          Manage and respond to enquiries from potential students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search enquiries..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("New")}>
                  New
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Contacted")}>
                  Contacted
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Resolved")}>
                  Resolved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Archived")}>
                  Archived
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleSort('date')}
              className="flex gap-1 items-center"
            >
              {sortConfig.key === 'date' && sortConfig.direction === 'asc' ? 
                <ArrowUpAZ className="h-4 w-4" /> : 
                <ArrowDownAZ className="h-4 w-4" />
              }
              Sort by Date
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportToCsv}
              className="flex gap-1 items-center"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-4">Loading enquiries...</div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Course Interest</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAndFilteredEnquiries().map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell className="font-medium">{enquiry.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {enquiry.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {enquiry.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{enquiry.course}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge 
                            className={`cursor-pointer ${statusColorMap[enquiry.status] || 'bg-gray-100'}`}
                          >
                            {enquiry.status}
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => updateEnquiryStatus(enquiry, "New")}>
                            New
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateEnquiryStatus(enquiry, "Contacted")}>
                            Contacted
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateEnquiryStatus(enquiry, "Resolved")}>
                            Resolved
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateEnquiryStatus(enquiry, "Archived")}>
                            Archived
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="text-right">{formatDate(enquiry.date)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewEnquiry(enquiry)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            window.open(`mailto:${enquiry.email}`, '_blank');
                          }}>
                            <Mail className="h-4 w-4 mr-2" />
                            Email Student
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(enquiry)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Enquiry
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {sortedAndFilteredEnquiries().length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No enquiries found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      
      {/* View Enquiry Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>
              Full details of the student enquiry
            </DialogDescription>
          </DialogHeader>
          
          {selectedEnquiry && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Student Information</h4>
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex items-start gap-2 mb-2">
                      <UserCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">{selectedEnquiry.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${selectedEnquiry.email}`} className="text-sm text-primary hover:underline">
                        {selectedEnquiry.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${selectedEnquiry.phone}`} className="text-sm text-primary hover:underline">
                        {selectedEnquiry.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Enquiry Information</h4>
                  <div className="bg-muted p-3 rounded-md">
                    <div className="mb-2">
                      <div className="text-sm font-medium">Course Interest</div>
                      <div className="text-sm">{selectedEnquiry.course}</div>
                    </div>
                    <div className="mb-2">
                      <div className="text-sm font-medium">Status</div>
                      <Badge className={statusColorMap[selectedEnquiry.status] || 'bg-gray-100'}>
                        {selectedEnquiry.status}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Date Received</div>
                      <div className="text-sm">{formatDate(selectedEnquiry.date)}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Message</h4>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm whitespace-pre-line">{selectedEnquiry.message}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex sm:justify-between">
            <div className="hidden sm:flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (selectedEnquiry) {
                    window.open(`mailto:${selectedEnquiry.email}`, '_blank');
                  }
                }}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Response
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  if (selectedEnquiry) {
                    window.open(`tel:${selectedEnquiry.phone}`, '_blank');
                  }
                }}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Student
              </Button>
            </div>
            <Button 
              onClick={() => setViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this enquiry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Enquiry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EnquiriesTable; 