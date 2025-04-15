import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Check, 
  Mail, 
  MoreHorizontal, 
  Phone, 
  Star, 
  Trash, 
  User, 
  Clock,
  CheckCircle2,
  XCircle,
  Archive
} from 'lucide-react';

// Sample enquiry data
const mockEnquiries = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    phone: "+91 9845678901",
    timestamp: "2023-09-15T09:30:00",
    message: "I'm interested in the Advanced Botox and Fillers course. Can you provide more details about the upcoming batches?",
    course: "Advanced Botox & Fillers",
    status: "new"
  },
  {
    id: 2,
    name: "Dr. Ravi Kumar",
    email: "ravik@cosmetic.med",
    phone: "+91 8761234567",
    timestamp: "2023-09-14T15:45:00",
    message: "Looking for information on international certification process and validity in the UK.",
    course: "Comprehensive Aesthetic Medicine",
    status: "contacted"
  },
  {
    id: 3,
    name: "Dr. Mira Patel",
    email: "mira.patel@dermatology.org",
    phone: "+91 9912345678",
    timestamp: "2023-09-13T11:15:00",
    message: "I'm a practicing dermatologist with 5 years of experience. Interested in Thread Lift and PRP training.",
    course: "Thread Lift Masterclass",
    status: "converted"
  },
  {
    id: 4,
    name: "Dr. Thomas Williams",
    email: "t.williams@medemail.com",
    phone: "+44 7700123456",
    timestamp: "2023-09-12T08:20:00",
    message: "Visiting from London next month. Do you have any workshops scheduled in October?",
    course: "International Workshop",
    status: "new"
  },
  {
    id: 5,
    name: "Dr. Lisa Chen",
    email: "lisa.chen@aestomed.com",
    phone: "+65 91234567",
    timestamp: "2023-09-10T14:05:00",
    message: "Need details about accommodation options for international students during the 3-month course.",
    course: "Comprehensive Aesthetic Medicine",
    status: "archived"
  }
];

// Status options for filtering
const statusOptions = [
  { label: "All Enquiries", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Converted", value: "converted" },
  { label: "Archived", value: "archived" }
];

const EnquiriesTable = () => {
  const [enquiries, setEnquiries] = useState(mockEnquiries);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");

  // Filter enquiries based on status and search term
  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesStatus = selectedStatus === "all" || enquiry.status === selectedStatus;
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Sort enquiries
  const sortedEnquiries = [...filteredEnquiries].sort((a, b) => {
    if (sortField === "timestamp") {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      const valueA = a[sortField].toString().toLowerCase();
      const valueB = b[sortField].toString().toLowerCase();
      
      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }
  });

  // Handle status change for an enquiry
  const handleStatusChange = (id, newStatus) => {
    setEnquiries(
      enquiries.map(enquiry => 
        enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
      )
    );
  };

  // Delete an enquiry
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry? This action cannot be undone.")) {
      setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <Badge variant="default" className="bg-blue-500">New</Badge>;
      case "contacted":
        return <Badge variant="default" className="bg-yellow-500">Contacted</Badge>;
      case "converted":
        return <Badge variant="default" className="bg-green-500">Converted</Badge>;
      case "archived":
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Set sort field and toggle direction if same field is clicked
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Enquiries</CardTitle>
          <CardDescription>
            Manage and track all leads and enquiries from your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="mb-1 block">Search</Label>
              <Input
                id="search"
                placeholder="Search by name, email, course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="status-filter" className="mb-1 block">Filter by Status</Label>
              <select
                id="status-filter"
                className="w-full p-2 border rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Contact
                      {sortField === "name" && (
                        <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[150px] cursor-pointer" onClick={() => handleSort("course")}>
                    <div className="flex items-center">
                      Course
                      {sortField === "course" && (
                        <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Message</TableHead>
                  <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("timestamp")}>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Date
                      {sortField === "timestamp" && (
                        <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[60px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEnquiries.length > 0 ? (
                  sortedEnquiries.map(enquiry => (
                    <TableRow key={enquiry.id}>
                      <TableCell>
                        <div className="font-medium">{enquiry.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {enquiry.email}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {enquiry.phone}
                        </div>
                      </TableCell>
                      <TableCell>{enquiry.course}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="max-w-xs truncate">{enquiry.message}</div>
                      </TableCell>
                      <TableCell>{formatDate(enquiry.timestamp)}</TableCell>
                      <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.open(`mailto:${enquiry.email}`)}>
                              <Mail className="mr-2 h-4 w-4" />
                              <span>Email</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(`tel:${enquiry.phone}`)}>
                              <Phone className="mr-2 h-4 w-4" />
                              <span>Call</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(enquiry.id, "new")}>
                              <Star className="mr-2 h-4 w-4" />
                              <span>Mark as New</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(enquiry.id, "contacted")}>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              <span>Mark as Contacted</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(enquiry.id, "converted")}>
                              <Check className="mr-2 h-4 w-4" />
                              <span>Mark as Converted</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(enquiry.id, "archived")}>
                              <Archive className="mr-2 h-4 w-4" />
                              <span>Archive</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600" 
                              onClick={() => handleDelete(enquiry.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No enquiries found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {sortedEnquiries.length} of {enquiries.length} enquiries
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnquiriesTable; 