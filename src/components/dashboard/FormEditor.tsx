import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample form submissions data
const initialFormSubmissions = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 9876543210',
    message: 'I\'m interested in the Facial Aesthetic Surgery program. Do you offer any scholarships?',
    course: 'Diploma in Facial Aesthetic Surgery',
    date: '2023-11-15T10:30:00',
    status: 'new'
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    email: 'rahul.m@example.com',
    phone: '+91 8765432109',
    message: 'I need more information about the Advanced Cosmetology program starting dates.',
    course: 'Advanced Cosmetology Certification',
    date: '2023-11-14T14:45:00',
    status: 'contacted'
  },
  {
    id: 3,
    name: 'Aisha Khan',
    email: 'aisha.k@example.com',
    phone: '+91 7654321098',
    message: 'Do you provide accommodation for outstation students?',
    course: 'Combined Master Program',
    date: '2023-11-13T09:15:00',
    status: 'closed'
  }
];

// Updated form field configuration to match the form in the image
const initialFormFields = [
  { id: 1, label: 'Full Name', type: 'text', name: 'name', required: true, active: true, placeholder: 'Enter your full name' },
  { id: 2, label: 'Email Address', type: 'email', name: 'email', required: true, active: true, placeholder: 'Enter your email' },
  { id: 3, label: 'WhatsApp Number', type: 'tel', name: 'phone', required: true, active: true, placeholder: 'Enter your WhatsApp number' },
  { id: 4, label: 'Preferred Course', type: 'select', name: 'course', required: true, active: true, placeholder: 'Select a course' },
  { id: 5, label: 'Message', type: 'textarea', name: 'message', required: false, active: false, placeholder: 'Your message (optional)' }
];

// Sample course options for the dropdown
const courseOptions = [
  "Diploma in Facial Aesthetic Surgery",
  "Advanced Cosmetology Certification",
  "Combined Master Program",
  "International Certification Program"
];

const FormEditor = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [formSubmissions, setFormSubmissions] = useState(initialFormSubmissions);
  const [formFields, setFormFields] = useState(initialFormFields);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [newField, setNewField] = useState({
    label: '',
    type: 'text',
    name: '',
    required: false,
    active: true,
    placeholder: ''
  });
  const [formButtonText, setFormButtonText] = useState('Get Brochure & Course Fee');

  const handleStatusChange = (id, newStatus) => {
    setFormSubmissions(submissions => 
      submissions.map(sub => 
        sub.id === id ? { ...sub, status: newStatus } : sub
      )
    );
  };

  const handleDeleteSubmission = (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      setFormSubmissions(submissions => 
        submissions.filter(sub => sub.id !== id)
      );
    }
  };

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
  };

  const handleCloseView = () => {
    setSelectedSubmission(null);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    if (!newField.label || !newField.name) return;
    
    const fieldId = Math.max(0, ...formFields.map(f => f.id)) + 1;
    
    setFormFields([
      ...formFields,
      {
        ...newField,
        id: fieldId
      }
    ]);
    
    // Reset form
    setNewField({
      label: '',
      type: 'text',
      name: '',
      required: false,
      active: true,
      placeholder: ''
    });
  };

  const handleFieldChange = (id, field, value) => {
    setFormFields(fields => 
      fields.map(f => 
        f.id === id ? { ...f, [field]: value } : f
      )
    );
  };

  const handleRemoveField = (id) => {
    if (window.confirm('Are you sure you want to remove this field?')) {
      setFormFields(fields => fields.filter(f => f.id !== id));
    }
  };
  
  const startEditField = (field) => {
    setEditingField({...field});
  };
  
  const cancelEditField = () => {
    setEditingField(null);
  };
  
  const saveEditField = () => {
    if (!editingField) return;
    
    setFormFields(fields => 
      fields.map(f => 
        f.id === editingField.id ? { ...editingField } : f
      )
    );
    
    setEditingField(null);
  };

  // Function to render preview of a form field
  const renderFieldPreview = (field) => {
    if (!field.active) return null;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <div key={field.id} className="mb-4">
            <label className="block mb-2 text-sm font-medium">{field.label}</label>
            <input 
              type={field.type} 
              className="w-full p-3 border border-gray-200 rounded-md bg-gray-50" 
              placeholder={field.placeholder}
              disabled
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.id} className="mb-4">
            <label className="block mb-2 text-sm font-medium">{field.label}</label>
            <select className="w-full p-3 border border-gray-200 rounded-md bg-gray-50 appearance-none" disabled>
              <option value="">{field.placeholder}</option>
              {courseOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case 'textarea':
        return (
          <div key={field.id} className="mb-4">
            <label className="block mb-2 text-sm font-medium">{field.label}</label>
            <textarea 
              className="w-full p-3 border border-gray-200 rounded-md bg-gray-50" 
              placeholder={field.placeholder}
              rows={4}
              disabled
            ></textarea>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
          <TabsTrigger value="configuration">Form Configuration</TabsTrigger>
          <TabsTrigger value="preview">Form Preview</TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === 'submissions' && (
        <div>
          {selectedSubmission ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Submission Details</span>
                  <Button variant="ghost" size="sm" onClick={handleCloseView}>Close</Button>
                </CardTitle>
                <CardDescription>
                  Submitted on {new Date(selectedSubmission.date).toLocaleDateString()} at {new Date(selectedSubmission.date).toLocaleTimeString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                    <p className="text-base">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p className="text-base">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <p className="text-base">{selectedSubmission.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Course</h3>
                    <p className="text-base">{selectedSubmission.course}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Message</h3>
                  <p className="text-base">{selectedSubmission.message}</p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <select 
                        value={selectedSubmission.status}
                        onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value)}
                        className="border p-1 rounded text-sm"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      handleDeleteSubmission(selectedSubmission.id);
                      handleCloseView();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Form Submissions</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No form submissions yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    formSubmissions.map(submission => (
                      <TableRow key={submission.id}>
                        <TableCell>{new Date(submission.date).toLocaleDateString()}</TableCell>
                        <TableCell>{submission.name}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.course}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            submission.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                            submission.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewSubmission(submission)}
                            >
                              View
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteSubmission(submission.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'configuration' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Form Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Form Fields</CardTitle>
                  <CardDescription>
                    Configure the fields shown in your contact form
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Label</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Required</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formFields.map(field => (
                        <TableRow key={field.id}>
                          <TableCell>{field.label}</TableCell>
                          <TableCell>{field.type}</TableCell>
                          <TableCell>
                            <Switch 
                              checked={field.required} 
                              onCheckedChange={(checked) => handleFieldChange(field.id, 'required', checked)}
                            />
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={field.active} 
                              onCheckedChange={(checked) => handleFieldChange(field.id, 'active', checked)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => startEditField(field)}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleRemoveField(field.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Submit Button Text</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-3">
                          <Input 
                            value={formButtonText} 
                            onChange={(e) => setFormButtonText(e.target.value)}
                            placeholder="Submit button text"
                          />
                          <Button variant="secondary">Update</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              {editingField ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Field</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-label">Field Label</Label>
                        <Input
                          id="edit-label"
                          value={editingField.label}
                          onChange={(e) => setEditingField({...editingField, label: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-type">Field Type</Label>
                        <select
                          id="edit-type"
                          value={editingField.type}
                          onChange={(e) => setEditingField({...editingField, type: e.target.value})}
                          className="w-full border p-2 rounded"
                        >
                          <option value="text">Text</option>
                          <option value="email">Email</option>
                          <option value="tel">Phone</option>
                          <option value="select">Dropdown</option>
                          <option value="textarea">Text Area</option>
                          <option value="checkbox">Checkbox</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Field Name</Label>
                        <Input
                          id="edit-name"
                          value={editingField.name}
                          onChange={(e) => setEditingField({...editingField, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-placeholder">Placeholder Text</Label>
                        <Input
                          id="edit-placeholder"
                          value={editingField.placeholder || ''}
                          onChange={(e) => setEditingField({...editingField, placeholder: e.target.value})}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="edit-required"
                          checked={editingField.required}
                          onCheckedChange={(checked) => setEditingField({...editingField, required: checked})}
                        />
                        <Label htmlFor="edit-required">Required</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="edit-active"
                          checked={editingField.active}
                          onCheckedChange={(checked) => setEditingField({...editingField, active: checked})}
                        />
                        <Label htmlFor="edit-active">Active</Label>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={cancelEditField}>
                          Cancel
                        </Button>
                        <Button type="button" onClick={saveEditField}>
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Field</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddField} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="label">Field Label</Label>
                        <Input
                          id="label"
                          value={newField.label}
                          onChange={(e) => setNewField({...newField, label: e.target.value})}
                          placeholder="e.g. Full Name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Field Type</Label>
                        <select
                          id="type"
                          value={newField.type}
                          onChange={(e) => setNewField({...newField, type: e.target.value})}
                          className="w-full border p-2 rounded"
                        >
                          <option value="text">Text</option>
                          <option value="email">Email</option>
                          <option value="tel">Phone</option>
                          <option value="select">Dropdown</option>
                          <option value="textarea">Text Area</option>
                          <option value="checkbox">Checkbox</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Field Name</Label>
                        <Input
                          id="name"
                          value={newField.name}
                          onChange={(e) => setNewField({...newField, name: e.target.value})}
                          placeholder="e.g. fullName"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="placeholder">Placeholder Text</Label>
                        <Input
                          id="placeholder"
                          value={newField.placeholder}
                          onChange={(e) => setNewField({...newField, placeholder: e.target.value})}
                          placeholder="e.g. Enter your full name"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="required"
                          checked={newField.required}
                          onCheckedChange={(checked) => setNewField({...newField, required: checked})}
                        />
                        <Label htmlFor="required">Required</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="active"
                          checked={newField.active}
                          onCheckedChange={(checked) => setNewField({...newField, active: checked})}
                        />
                        <Label htmlFor="active">Active</Label>
                      </div>
                      <Button type="submit" className="w-full">
                        Add Field
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
              <CardDescription>
                This is how your form will appear on the website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-md border">
                <div className="max-w-lg mx-auto">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Information</h2>
                  <p className="text-gray-600 mb-6">Fill the form to receive our brochure and detailed course information</p>
                  
                  <div className="space-y-4">
                    {formFields.filter(field => field.active).map(renderFieldPreview)}
                    
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-md">
                      {formButtonText}
                    </Button>
                    
                    <div className="flex justify-center items-center gap-6 mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-gray-400 rounded-sm"></div>
                        <span>100% Privacy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-gray-400 rounded-sm"></div>
                        <span>No Spam</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-gray-400 rounded-sm"></div>
                        <span>Quick Response</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FormEditor; 