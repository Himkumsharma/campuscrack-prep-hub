import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Building2, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar,
  TrendingUp,
  Code,
  Brain,
  MessageSquare,
  Filter,
  ArrowLeft,
  Target,
  BookOpen,
  HelpCircle
} from "lucide-react";
import ChatBot from "@/components/ChatBot";
import CompanyInsightsDialog from "@/components/CompanyInsightsDialog";

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [showCompanyDetail, setShowCompanyDetail] = useState(false);

  const companies = [
    {
      id: 1,
      name: "Tata Consultancy Services (TCS)",
      logo: "https://logo.clearbit.com/tcs.com",
      category: "Service Based",
      package: "3.5 - 7.0 LPA",
      location: "Multiple Cities",
      hiring: "500+ positions",
      difficulty: "Medium",
      description: "Leading IT services and consulting company with global presence.",
      rounds: ["Online Test", "Technical Interview", "HR Interview"],
      skills: ["Java", "Python", "SQL", "Communication"],
      tips: "Focus on basic programming concepts and communication skills.",
      hiringProcess: [
        "Online Registration on TCS Portal",
        "Aptitude Test (90 minutes)",
        "Technical Interview (45 minutes)",
        "HR Interview (30 minutes)",
        "Document Verification"
      ],
      previousYearQuestions: [
        "What is polymorphism? Explain with example",
        "Write a program to reverse a string",
        "Difference between abstract class and interface",
        "Explain OOPS concepts with real-world examples",
        "Tell me about yourself",
        "Why TCS?"
      ],
      crackingStrategy: [
        "Practice basic programming concepts daily",
        "Focus on communication skills",
        "Prepare for behavioral questions",
        "Study company values and culture",
        "Practice aptitude questions regularly"
      ]
    },
    {
      id: 2,
      name: "Infosys",
      logo: "https://logo.clearbit.com/infosys.com",
      category: "Service Based", 
      package: "4.0 - 8.0 LPA",
      location: "Bangalore, Pune, Chennai",
      hiring: "300+ positions",
      difficulty: "Medium",
      description: "Global consulting and IT services company known for innovation.",
      rounds: ["Aptitude Test", "Technical Round", "HR Round"],
      skills: ["Java", "Python", "Problem Solving", "Analytics"],
      tips: "Practice aptitude questions and focus on logical reasoning.",
      hiringProcess: [
        "Online Registration",
        "InfyTQ Assessment",
        "Technical Interview",
        "HR Interview",
        "Final Selection"
      ],
      previousYearQuestions: [
        "What is inheritance in Java?",
        "Explain SQL vs NoSQL",
        "Find second largest number in array",
        "Exception handling in Java",
        "Your final year project details"
      ],
      crackingStrategy: [
        "Complete InfyTQ certification",
        "Practice coding problems",
        "Prepare project explanation",
        "Study database concepts",
        "Work on communication skills"
      ]
    },
    {
      id: 3,
      name: "Amazon",
      logo: "https://logo.clearbit.com/amazon.com",
      category: "Product Based",
      package: "12.0 - 25.0 LPA",
      location: "Bangalore, Hyderabad",
      hiring: "50+ positions",
      difficulty: "Hard",
      description: "World's largest e-commerce and cloud computing platform.",
      rounds: ["Online Assessment", "Technical Interview", "Bar Raiser Round"],
      skills: ["Data Structures", "Algorithms", "System Design", "Leadership"],
      tips: "Master data structures and algorithms. Practice leadership principles.",
      hiringProcess: [
        "Online Application",
        "Online Assessment (3 hours)",
        "Phone/Video Interview",
        "Onsite Interviews (4-5 rounds)",
        "Bar Raiser Interview"
      ],
      previousYearQuestions: [
        "Design URL shortener like bit.ly",
        "Two sum problem variations",
        "AWS services explanation",
        "Leadership principle examples",
        "System design questions"
      ],
      crackingStrategy: [
        "Master DSA fundamentals",
        "Practice system design",
        "Study AWS services",
        "Prepare STAR method stories",
        "Practice coding interviews daily"
      ]
    },
    {
      id: 4,
      name: "Microsoft",
      logo: "🪟",
      category: "Product Based",
      package: "15.0 - 35.0 LPA", 
      location: "Bangalore, Hyderabad",
      hiring: "30+ positions",
      difficulty: "Hard",
      description: "Technology giant known for Windows, Office, and Azure cloud services.",
      rounds: ["Coding Round", "Technical Interviews", "AA Interview"],
      skills: ["C++", "C#", "System Design", "Problem Solving"],
      tips: "Focus on clean code and system design concepts."
    },
    {
      id: 5,
      name: "Wipro",
      logo: "🌐",
      category: "Service Based",
      package: "3.2 - 6.0 LPA",
      location: "Multiple Cities",
      hiring: "400+ positions", 
      difficulty: "Easy",
      description: "Global IT consulting and business process services company.",
      rounds: ["Written Test", "Technical Interview", "HR Interview"],
      skills: ["Java", "SQL", "Communication", "Basic Programming"],
      tips: "Focus on fundamental programming concepts and verbal skills."
    },
    {
      id: 6,
      name: "Accenture",
      logo: "⚡",
      category: "Consulting",
      package: "4.5 - 9.0 LPA",
      location: "Multiple Cities",
      hiring: "250+ positions",
      difficulty: "Medium", 
      description: "Global professional services company with consulting expertise.",
      rounds: ["Cognitive Assessment", "Technical Round", "Communication Round"],
      skills: ["Analytics", "Communication", "Problem Solving", "Domain Knowledge"],
      tips: "Develop strong analytical and communication skills."
    },
    {
      id: 7,
      name: "Capgemini",
      logo: "💻",
      category: "Consulting",
      package: "4.0 - 8.5 LPA",
      location: "Multiple Cities",
      hiring: "200+ positions",
      difficulty: "Medium",
      description: "Global consulting, technology services and digital transformation company.",
      rounds: ["Online Test", "Technical Interview", "HR Round"],
      skills: ["Java", "Communication", "Problem Solving", "Business Analysis"],
      tips: "Focus on both technical and business communication skills."
    },
    {
      id: 8,
      name: "Deloitte",
      logo: "🏢",
      category: "Consulting",
      package: "6.0 - 12.0 LPA",
      location: "Multiple Cities",
      hiring: "150+ positions",
      difficulty: "Medium",
      description: "Global professional services network providing audit, consulting, and advisory services.",
      rounds: ["Online Assessment", "Case Study", "Partner Interview"],
      skills: ["Analytics", "Business Acumen", "Communication", "Leadership"],
      tips: "Prepare for case studies and demonstrate business thinking."
    }
  ];

  // Filter companies based on search and category
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
      (selectedFilter === "service" && company.category === "Service Based") ||
      (selectedFilter === "product" && company.category === "Product Based") ||
      (selectedFilter === "consulting" && company.category === "Consulting");
    return matchesSearch && matchesFilter;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleGetAIInsights = (company) => {
    setSelectedCompany(company);
    setIsInsightsOpen(true);
  };

  const handleOpenAIChat = (company) => {
    setSelectedCompany(company);
    setIsChatOpen(true);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setShowCompanyDetail(true);
  };

  const handleBackToList = () => {
    setShowCompanyDetail(false);
    setSelectedCompany(null);
  };

  if (showCompanyDetail && selectedCompany) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={handleBackToList}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Companies
          </Button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={selectedCompany.logo} 
                alt={selectedCompany.name}
                className="w-16 h-16 rounded-lg object-contain"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${selectedCompany.name}&background=random`;
                }}
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{selectedCompany.name}</h1>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline">{selectedCompany.category}</Badge>
                  <Badge className={getDifficultyColor(selectedCompany.difficulty)}>
                    {selectedCompany.difficulty}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-8">{selectedCompany.description}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Package: {selectedCompany.package}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Location: {selectedCompany.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Hiring: {selectedCompany.hiring}</span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                  <Brain className="h-4 w-4 mr-1" />
                  Pro Tip
                </h4>
                <p className="text-sm text-blue-700">{selectedCompany.tips}</p>
              </div>
            </div>

            <Tabs defaultValue="process" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="process">Hiring Process</TabsTrigger>
                <TabsTrigger value="questions">Previous Questions</TabsTrigger>
                <TabsTrigger value="strategy">Cracking Strategy</TabsTrigger>
                <TabsTrigger value="skills">Skills Required</TabsTrigger>
              </TabsList>

              <TabsContent value="process" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Hiring Process
                  </h3>
                  <div className="space-y-3">
                    {selectedCompany.hiringProcess?.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="questions" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Previous Year Questions
                  </h3>
                  <div className="space-y-3">
                    {selectedCompany.previousYearQuestions?.map((question, index) => (
                      <div key={index} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                        <div className="flex items-start space-x-2">
                          <Badge variant="outline" className="text-xs mt-1">
                            Q{index + 1}
                          </Badge>
                          <p className="text-sm text-gray-800">{question}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="strategy" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Cracking Strategy
                  </h3>
                  <div className="space-y-3">
                    {selectedCompany.crackingStrategy?.map((strategy, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-green-800">{strategy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Code className="h-5 w-5 mr-2" />
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.skills?.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2 mt-4">
                    <h4 className="font-medium">Interview Rounds:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.rounds?.map((round, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {round}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex space-x-4">
              <Button 
                className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                onClick={() => handleGetAIInsights(selectedCompany)}
              >
                <Brain className="h-4 w-4 mr-2" />
                Get AI Insights
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleOpenAIChat(selectedCompany)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Company Insights
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive information about companies recruiting from India colleges
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search companies or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="service">Service Based</option>
                <option value="product">Product Based</option>
                <option value="consulting">Consulting</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-blue-100 text-center">
            <CardContent className="pt-6">
              <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{companies.length}+</div>
              <div className="text-gray-600">Companies</div>
            </CardContent>
          </Card>
          <Card className="border-green-100 text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2000+</div>
              <div className="text-gray-600">Job Openings</div>
            </CardContent>
          </Card>
          <Card className="border-purple-100 text-center">
            <CardContent className="pt-6">
              <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">35 LPA</div>
              <div className="text-gray-600">Highest Package</div>
            </CardContent>
          </Card>
          <Card className="border-orange-100 text-center">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-gray-600">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Companies</TabsTrigger>
            <TabsTrigger value="service">Service Based</TabsTrigger>
            <TabsTrigger value="product">Product Based</TabsTrigger>
            <TabsTrigger value="consulting">Consulting</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card 
              key={company.id} 
              className="border-blue-100 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCompanyClick(company)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="w-12 h-12 rounded-lg object-contain"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=random`;
                      }}
                    />
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {company.category}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(company.difficulty)}>
                    {company.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{company.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Package: {company.package}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>{company.hiring}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-1 flex items-center text-blue-800">
                    <Brain className="h-4 w-4 mr-1" />
                    Pro Tip
                  </h4>
                  <p className="text-xs text-blue-700">{company.tips}</p>
                </div>

                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    onClick={() => handleGetAIInsights(company)}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Get AI Insights
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleOpenAIChat(company)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat with AI
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Chat Dialog */}
      <ChatBot 
        isOpen={isChatOpen} 
        onClose={() => {
          setIsChatOpen(false);
          setSelectedCompany(null);
        }}
        companyName={selectedCompany?.name}
        companyInfo={selectedCompany}
      />

      {/* Company Insights Dialog */}
      <CompanyInsightsDialog 
        isOpen={isInsightsOpen}
        onClose={() => {
          setIsInsightsOpen(false);
          setSelectedCompany(null);
        }}
        company={selectedCompany}
      />
    </div>
  );
};

export default Companies;
