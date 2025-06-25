
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
  Filter
} from "lucide-react";
import ChatBot from "@/components/ChatBot";
import CompanyInsightsDialog from "@/components/CompanyInsightsDialog";

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  const companies = [
    {
      id: 1,
      name: "Tata Consultancy Services (TCS)",
      logo: "🏢",
      category: "Service Based",
      package: "3.5 - 7.0 LPA",
      location: "Multiple Cities",
      hiring: "500+ positions",
      difficulty: "Medium",
      description: "Leading IT services and consulting company with global presence.",
      rounds: ["Online Test", "Technical Interview", "HR Interview"],
      skills: ["Java", "Python", "SQL", "Communication"],
      tips: "Focus on basic programming concepts and communication skills."
    },
    {
      id: 2,
      name: "Infosys",
      logo: "💼",
      category: "Service Based", 
      package: "4.0 - 8.0 LPA",
      location: "Bangalore, Pune, Chennai",
      hiring: "300+ positions",
      difficulty: "Medium",
      description: "Global consulting and IT services company known for innovation.",
      rounds: ["Aptitude Test", "Technical Round", "HR Round"],
      skills: ["Java", "Python", "Problem Solving", "Analytics"],
      tips: "Practice aptitude questions and focus on logical reasoning."
    },
    {
      id: 3,
      name: "Amazon",
      logo: "📦",
      category: "Product Based",
      package: "12.0 - 25.0 LPA",
      location: "Bangalore, Hyderabad",
      hiring: "50+ positions",
      difficulty: "Hard",
      description: "World's largest e-commerce and cloud computing platform.",
      rounds: ["Online Assessment", "Technical Interview", "Bar Raiser Round"],
      skills: ["Data Structures", "Algorithms", "System Design", "Leadership"],
      tips: "Master data structures and algorithms. Practice leadership principles."
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Company Insights
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive information about companies recruiting from LNCT
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
            <Card key={company.id} className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{company.logo}</div>
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

                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Interview Rounds
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {company.rounds.map((round, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {round}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <Code className="h-4 w-4 mr-1" />
                    Key Skills
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {company.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-1 flex items-center text-blue-800">
                    <Brain className="h-4 w-4 mr-1" />
                    Pro Tip
                  </h4>
                  <p className="text-xs text-blue-700">{company.tips}</p>
                </div>

                <div className="space-y-2">
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
