
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Upload, 
  Edit, 
  Trash2, 
  FileText, 
  Building2,
  Users,
  BookOpen,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  // Mock data for demonstration
  const [companies, setCompanies] = useState([
    { id: 1, name: "TCS", category: "Service-Based", questionsCount: 25, status: "Active" },
    { id: 2, name: "Microsoft", category: "Product-Based", questionsCount: 18, status: "Active" },
    { id: 3, name: "Accenture", category: "Consulting", questionsCount: 22, status: "Active" },
  ]);

  const [questions, setQuestions] = useState([
    { id: 1, company: "TCS", type: "Technical", question: "What is polymorphism?", difficulty: "Medium" },
    { id: 2, company: "Microsoft", type: "Coding", question: "Implement binary search", difficulty: "Hard" },
    { id: 3, company: "Accenture", type: "HR", question: "Tell me about yourself", difficulty: "Easy" },
  ]);

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Company Added",
      description: "New company has been added successfully!",
    });
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Question Added",
      description: "New question has been added successfully!",
    });
  };

  const stats = [
    { label: "Total Companies", value: "32", icon: Building2, color: "text-blue-600" },
    { label: "Total Questions", value: "450", icon: FileText, color: "text-green-600" },
    { label: "Registered Students", value: "1,250", icon: Users, color: "text-purple-600" },
    { label: "Success Rate", value: "85%", icon: BarChart3, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage companies, questions, and platform content</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New question added for Microsoft</span>
                    <span className="text-xs text-gray-500">2 minutes ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Company profile updated for Amazon</span>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">25 new student registrations</span>
                    <span className="text-xs text-gray-500">3 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Companies</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Company</CardTitle>
                  <CardDescription>Add a new recruiting company to the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddCompany} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" placeholder="Enter company name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyCategory">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="service">Service-Based</SelectItem>
                          <SelectItem value="product">Product-Based</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyDescription">Description</Label>
                      <Textarea id="companyDescription" placeholder="Enter company description" />
                    </div>
                    <Button type="submit" className="w-full">Add Company</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Companies List</CardTitle>
                  <CardDescription>Manage existing companies</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Questions</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {companies.map((company) => (
                        <TableRow key={company.id}>
                          <TableCell className="font-medium">{company.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{company.category}</Badge>
                          </TableCell>
                          <TableCell>{company.questionsCount}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Questions & PYQs</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Question</CardTitle>
                  <CardDescription>Add questions and PYQs for companies</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddQuestion} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="questionCompany">Company</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tcs">TCS</SelectItem>
                          <SelectItem value="microsoft">Microsoft</SelectItem>
                          <SelectItem value="accenture">Accenture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="questionType">Question Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="coding">Coding</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                          <SelectItem value="aptitude">Aptitude</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="questionText">Question</Label>
                      <Textarea id="questionText" placeholder="Enter the question" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="questionAnswer">Answer/Solution</Label>
                      <Textarea id="questionAnswer" placeholder="Enter the answer or solution" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">Add Question</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Questions</CardTitle>
                  <CardDescription>Manage uploaded questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {questions.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell>{question.company}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{question.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={question.difficulty === 'Easy' ? 'default' : 
                                     question.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                            >
                              {question.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Student Management</h2>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Registered Students</CardTitle>
                <CardDescription>View and manage student registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>john@example.com</TableCell>
                      <TableCell>ABC Engineering College</TableCell>
                      <TableCell>2024-01-15</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>jane@example.com</TableCell>
                      <TableCell>XYZ University</TableCell>
                      <TableCell>2024-01-14</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
