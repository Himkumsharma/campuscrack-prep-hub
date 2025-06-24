
import { useState, useEffect } from "react";
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
  BarChart3,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const [companies, setCompanies] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [companyForm, setCompanyForm] = useState({
    name: "",
    category: "",
    description: ""
  });

  const [questionForm, setQuestionForm] = useState({
    company_id: "",
    question_type: "",
    question: "",
    answer: "",
    difficulty: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch companies
      const { data: companiesData } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Fetch questions with company names
      const { data: questionsData } = await supabase
        .from('questions')
        .select(`
          *,
          companies (name)
        `)
        .order('created_at', { ascending: false });

      // Fetch student profiles
      const { data: studentsData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      setCompanies(companiesData || []);
      setQuestions(questionsData || []);
      setStudents(studentsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('companies')
        .insert([companyForm])
        .select();

      if (error) throw error;

      toast({
        title: "Company Added",
        description: "New company has been added successfully!",
      });

      setCompanyForm({ name: "", category: "", description: "" });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([{
          ...questionForm,
          created_by: user?.id
        }])
        .select();

      if (error) throw error;

      toast({
        title: "Question Added",
        description: "New question has been added successfully!",
      });

      setQuestionForm({
        company_id: "",
        question_type: "",
        question: "",
        answer: "",
        difficulty: ""
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const stats = [
    { label: "Total Companies", value: companies.length.toString(), icon: Building2, color: "text-blue-600" },
    { label: "Total Questions", value: questions.length.toString(), icon: FileText, color: "text-green-600" },
    { label: "Registered Students", value: students.length.toString(), icon: Users, color: "text-purple-600" },
    { label: "Success Rate", value: "85%", icon: BarChart3, color: "text-orange-600" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage companies, questions, and platform content</p>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="border-red-200 text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
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
                    <span className="text-sm">New question added for {companies[0]?.name || 'Company'}</span>
                    <span className="text-xs text-gray-500">2 minutes ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Company profile updated</span>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">{students.length} student registrations</span>
                    <span className="text-xs text-gray-500">3 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Companies</h2>
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
                      <Input 
                        id="companyName" 
                        placeholder="Enter company name" 
                        value={companyForm.name}
                        onChange={(e) => setCompanyForm({...companyForm, name: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyCategory">Category</Label>
                      <Select value={companyForm.category} onValueChange={(value) => setCompanyForm({...companyForm, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Service-Based">Service-Based</SelectItem>
                          <SelectItem value="Product-Based">Product-Based</SelectItem>
                          <SelectItem value="Consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyDescription">Description</Label>
                      <Textarea 
                        id="companyDescription" 
                        placeholder="Enter company description" 
                        value={companyForm.description}
                        onChange={(e) => setCompanyForm({...companyForm, description: e.target.value})}
                      />
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {companies.map((company) => (
                        <TableRow key={company.id}>
                          <TableCell className="font-medium">{company.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{company.category}</Badge>
                          </TableCell>
                          <TableCell>{questions.filter(q => q.company_id === company.id).length}</TableCell>
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
                      <Select value={questionForm.company_id} onValueChange={(value) => setQuestionForm({...questionForm, company_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                        <SelectContent>
                          {companies.map((company) => (
                            <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="questionType">Question Type</Label>
                      <Select value={questionForm.question_type} onValueChange={(value) => setQuestionForm({...questionForm, question_type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Coding">Coding</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Aptitude">Aptitude</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="questionText">Question</Label>
                      <Textarea 
                        id="questionText" 
                        placeholder="Enter the question" 
                        value={questionForm.question}
                        onChange={(e) => setQuestionForm({...questionForm, question: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="questionAnswer">Answer/Solution</Label>
                      <Textarea 
                        id="questionAnswer" 
                        placeholder="Enter the answer or solution" 
                        value={questionForm.answer}
                        onChange={(e) => setQuestionForm({...questionForm, answer: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select value={questionForm.difficulty} onValueChange={(value) => setQuestionForm({...questionForm, difficulty: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {questions.slice(0, 5).map((question) => (
                        <TableRow key={question.id}>
                          <TableCell>{question.companies?.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{question.question_type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={question.difficulty === 'Easy' ? 'default' : 
                                     question.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                            >
                              {question.difficulty}
                            </Badge>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.first_name} {student.last_name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.college}</TableCell>
                        <TableCell>{new Date(student.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
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
