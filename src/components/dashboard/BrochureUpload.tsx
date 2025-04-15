import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Download, FileText, Trash2, Upload, Edit, CheckCircle } from 'lucide-react';

// Sample brochures data
const initialBrochures = [
  {
    id: 1,
    title: "Main Institute Brochure 2023",
    fileName: "institute-brochure-2023.pdf",
    description: "Complete details about our institute, courses, and facilities.",
    fileSize: "3.2 MB",
    uploadDate: "2023-08-15T14:30:00",
    downloads: 128,
    isActive: true,
    type: "general"
  },
  {
    id: 2,
    title: "Facial Aesthetic Surgery Course Details",
    fileName: "facial-aesthetic-course-2023.pdf",
    description: "Detailed syllabus, eligibility criteria, and career prospects for the Facial Aesthetic Surgery program.",
    fileSize: "2.1 MB",
    uploadDate: "2023-09-05T10:15:00",
    downloads: 75,
    isActive: true,
    type: "course"
  },
  {
    id: 3,
    title: "Fee Structure 2023-24",
    fileName: "fee-structure-2023-24.pdf",
    description: "Fee details for all courses including payment schedules and scholarship information.",
    fileSize: "1.5 MB",
    uploadDate: "2023-07-20T09:45:00",
    downloads: 95,
    isActive: true,
    type: "general"
  },
  {
    id: 4,
    title: "International Certification Program",
    fileName: "international-certification-program.pdf",
    description: "Information about our international certification programs and partnerships.",
    fileSize: "4.3 MB",
    uploadDate: "2023-06-10T16:20:00",
    downloads: 42,
    isActive: false,
    type: "course"
  }
];

const BrochureUpload = () => {
  const [brochures, setBrochures] = useState(initialBrochures);
  const [newBrochure, setNewBrochure] = useState({
    title: '',
    description: '',
    type: 'general',
    isActive: true
  });
  const [editingBrochure, setEditingBrochure] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filter, setFilter] = useState('all');
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBrochure(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedFile || !newBrochure.title) {
      alert('Please fill in all required fields and select a file');
      return;
    }
    
    // Simulate upload
    setIsUploading(true);
    
    const uploadTimer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadTimer);
          setIsUploading(false);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate adding the new brochure after upload is complete
    setTimeout(() => {
      const newId = Math.max(0, ...brochures.map(b => b.id)) + 1;
      
      const newBrochureItem = {
        id: newId,
        title: newBrochure.title,
        fileName: selectedFile.name,
        description: newBrochure.description,
        fileSize: (selectedFile.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploadDate: new Date().toISOString(),
        downloads: 0,
        isActive: newBrochure.isActive,
        type: newBrochure.type
      };
      
      setBrochures(prev => [...prev, newBrochureItem]);
      
      // Reset form
      setNewBrochure({
        title: '',
        description: '',
        type: 'general',
        isActive: true
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      setIsUploading(false);
      setUploadProgress(0);
    }, 3000);
  };
  
  const handleToggleActive = (id, newValue) => {
    setBrochures(brochures.map(brochure => 
      brochure.id === id ? { ...brochure, isActive: newValue } : brochure
    ));
  };
  
  const handleDeleteBrochure = (id) => {
    if (window.confirm('Are you sure you want to delete this brochure?')) {
      setBrochures(brochures.filter(brochure => brochure.id !== id));
    }
  };
  
  const startEditBrochure = (brochure) => {
    setEditingBrochure({
      id: brochure.id,
      title: brochure.title,
      description: brochure.description,
      type: brochure.type,
      isActive: brochure.isActive
    });
  };
  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBrochure(prev => ({ ...prev, [name]: value }));
  };
  
  const cancelEdit = () => {
    setEditingBrochure(null);
  };
  
  const saveEdit = () => {
    if (!editingBrochure || !editingBrochure.title) return;
    
    setBrochures(brochures.map(brochure => 
      brochure.id === editingBrochure.id 
        ? { ...brochure, 
            title: editingBrochure.title, 
            description: editingBrochure.description,
            type: editingBrochure.type,
            isActive: editingBrochure.isActive 
          } 
        : brochure
    ));
    
    setEditingBrochure(null);
  };

  const filteredBrochures = filter === 'all' 
    ? brochures 
    : brochures.filter(brochure => 
        filter === 'active' 
          ? brochure.isActive 
          : filter === 'inactive' 
            ? !brochure.isActive 
            : brochure.type === filter
      );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Brochures</CardTitle>
                <div className="flex gap-2">
                  <select 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="all">All Brochures</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                    <option value="general">General</option>
                    <option value="course">Course Specific</option>
                  </select>
                </div>
              </div>
              <CardDescription>
                Manage your downloadable brochures and materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBrochures.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No brochures found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBrochures.map(brochure => (
                      <TableRow key={brochure.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div>{brochure.title}</div>
                              <div className="text-xs text-muted-foreground">{brochure.fileName}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{brochure.type}</span>
                        </TableCell>
                        <TableCell>{brochure.fileSize}</TableCell>
                        <TableCell>{brochure.downloads}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={brochure.isActive} 
                              onCheckedChange={(checked) => handleToggleActive(brochure.id, checked)}
                            />
                            <span className={brochure.isActive ? 'text-green-600' : 'text-muted-foreground'}>
                              {brochure.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => startEditBrochure(brochure)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="icon"
                              onClick={() => handleDeleteBrochure(brochure.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          {editingBrochure ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Brochure</CardTitle>
                <CardDescription>
                  Update brochure information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      name="title"
                      value={editingBrochure.title}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Input
                      id="edit-description"
                      name="description"
                      value={editingBrochure.description}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Type</Label>
                    <select
                      id="edit-type"
                      name="type"
                      className="w-full border rounded p-2"
                      value={editingBrochure.type}
                      onChange={handleEditInputChange}
                    >
                      <option value="general">General</option>
                      <option value="course">Course Specific</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="edit-is-active"
                      checked={editingBrochure.isActive}
                      onCheckedChange={(checked) => 
                        setEditingBrochure(prev => ({ ...prev, isActive: checked }))
                      }
                    />
                    <Label htmlFor="edit-is-active">Active</Label>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={cancelEdit}>
                      Cancel
                    </Button>
                    <Button onClick={saveEdit}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Upload New Brochure</CardTitle>
                <CardDescription>
                  Add a new brochure to your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newBrochure.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Institute Brochure 2023"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={newBrochure.description}
                      onChange={handleInputChange}
                      placeholder="Brief description of the brochure"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      name="type"
                      className="w-full border rounded p-2"
                      value={newBrochure.type}
                      onChange={handleInputChange}
                    >
                      <option value="general">General</option>
                      <option value="course">Course Specific</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">File (PDF)</Label>
                    <div className="border rounded-md p-4">
                      <input
                        id="file"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                      {selectedFile ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{selectedFile.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                              </div>
                            </div>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedFile(null);
                              if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                              }
                            }}
                          >
                            Change
                          </Button>
                        </div>
                      ) : (
                        <div 
                          className="flex flex-col items-center justify-center py-4 cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <div className="text-center">
                            <p className="font-medium">Click to upload</p>
                            <p className="text-xs text-muted-foreground">PDF (max 10MB)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="isActive"
                      checked={newBrochure.isActive}
                      onCheckedChange={(checked) => 
                        setNewBrochure(prev => ({ ...prev, isActive: checked }))
                      }
                    />
                    <Label htmlFor="isActive">Make active immediately</Label>
                  </div>
                  
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <Button type="submit" className="w-full" disabled={!selectedFile}>
                      Upload Brochure
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrochureUpload; 