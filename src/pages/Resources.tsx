
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  BookOpen, 
  FileText, 
  Code, 
  Users, 
  Calendar,
  Download,
  Star,
  Clock,
  Building2,
  TrendingUp,
  Lightbulb
} from "lucide-react";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Company data for the recruiting companies grid
  const recruitingCompanies = [
    "AMERICAN CHASE", "63 MOONS", "ACCENTURE", "ACMEGRADE", "ADANI", "AIRTEL",
    "ALLEGION", "ASE International", "ASHOK LEYLAND", "BETAQUE", "CAPGEMINI", 
    "CARWALE", "CISCO", "Cogitate Technology", "CSG", "DELOITTE", "DEUTSCHE BANK",
    "ELITMUS", "EnergyGreen", "EPAM", "Equifax PEC", "EVISION", "G10X", 
    "HIKE EDUCATION", "Hoonartek", "INFOSYS", "JSW", "KARAMTARA", "LTIMindtree",
    "NEWGEN", "Quantiphi", "ZSCALER", "TCS", "Microsoft", "Google"
  ];

  // Filter companies based on search
  const filteredCompanies = recruitingCompanies.filter(company =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const previousYearQuestions = [
    {
      id: 1,
      company: "TCS",
      title: "TCS NQT 2024 Questions",
      type: "Aptitude & Coding",
      difficulty: "Medium",
      downloads: 1250,
      questions: 45,
      year: "2024"
    },
    {
      id: 2,
      company: "Infosys",
      title: "Infosys Mysore 2024 Papers",
      type: "Technical Round",
      difficulty: "Medium",
      downloads: 980,
      questions: 38,
      year: "2024"
    },
    {
      id: 3,
      company: "Amazon",
      title: "Amazon SDE Interview Questions",
      type: "DSA & System Design",
      difficulty: "Hard",
      downloads: 2100,
      questions: 52,
      year: "2024"
    },
    {
      id: 4,
      company: "Microsoft",
      title: "Microsoft Campus Placement",
      type: "Coding & Technical",
      difficulty: "Hard",
      downloads: 1850,
      questions: 41,
      year: "2024"
    },
    {
      id: 5,
      company: "Accenture",
      title: "Accenture Assessment 2024",
      type: "Aptitude & Communication",
      difficulty: "Easy",
      downloads: 890,
      questions: 35,
      year: "2024"
    },
    {
      id: 6,
      company: "Wipro",
      title: "Wipro WILP Questions",
      type: "Programming & Logic",
      difficulty: "Medium",
      downloads: 720,
      questions: 40,
      year: "2024"
    }
  ];

  const interviewTips = [
    {
      id: 1,
      title: "Technical Interview Masterclass",
      category: "Technical",
      readTime: "15 min",
      tips: 12,
      rating: 4.8
    },
    {
      id: 2,
      title: "HR Round Success Strategies",
      category: "HR",
      readTime: "10 min",
      tips: 8,
      rating: 4.6
    },
    {
      id: 3,
      title: "Group Discussion Techniques",
      category: "GD",
      readTime: "12 min",
      tips: 10,
      rating: 4.7
    },
    {
      id: 4,
      title: "Coding Interview Best Practices",
      category: "Coding",
      readTime: "20 min",
      tips: 15,
      rating: 4.9
    }
  ];

  const codingPractice = [
    {
      id: 1,
      title: "Array & String Problems",
      difficulty: "Easy to Medium",
      problems: 50,
      topic: "Data Structures"
    },
    {
      id: 2,
      title: "Dynamic Programming",
      difficulty: "Medium to Hard", 
      problems: 35,
      topic: "Algorithms"
    },
    {
      id: 3,
      title: "System Design Basics",
      difficulty: "Medium",
      problems: 20,
      topic: "System Design"
    },
    {
      id: 4,
      title: "SQL Query Practice",
      difficulty: "Easy to Medium",
      problems: 40,
      topic: "Database"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Placement Resources
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive collection of previous year questions, interview tips, and coding practice
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-blue-100 text-center">
            <CardContent className="pt-6">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600">Question Papers</div>
            </CardContent>
          </Card>
          <Card className="border-green-100 text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Interview Guides</div>
            </CardContent>
          </Card>
          <Card className="border-purple-100 text-center">
            <CardContent className="pt-6">
              <Code className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">200+</div>
              <div className="text-gray-600">Coding Problems</div>
            </CardContent>
          </Card>
          <Card className="border-orange-100 text-center">
            <CardContent className="pt-6">
              <Building2 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">35+</div>
              <div className="text-gray-600">Companies</div>
            </CardContent>
          </Card>
        </div>

        {/* Recruiting Companies Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Companies Recruiting from LNCT
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Explore resources for all major companies that actively recruit from LNCT
            </p>
            
            {/* Search for companies */}
            <div className="max-w-md mx-auto relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 mb-8">
            {filteredCompanies.map((company, index) => (
              <Card 
                key={index}
                className="border-blue-100 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
              >
                <CardContent className="p-4 text-center">
                  <div className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors">
                    {company}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tech Tip */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-100">
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">💡 Tech Tip</h3>
                <p className="text-gray-700 text-sm">
                  Each company name will soon link to a dedicated section with PYQs, notes, interview experiences, and important dates. 
                  Click on any company card above to access their specific resources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pyqs" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pyqs">Previous Year Questions</TabsTrigger>
            <TabsTrigger value="tips">Interview Tips</TabsTrigger>
            <TabsTrigger value="practice">Coding Practice</TabsTrigger>
          </TabsList>

          {/* Previous Year Questions */}
          <TabsContent value="pyqs" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousYearQuestions.map((paper) => (
                <Card key={paper.id} className="border-blue-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{paper.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{paper.company}</Badge>
                          <Badge variant="outline">{paper.year}</Badge>
                        </CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(paper.difficulty)}>
                        {paper.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{paper.type}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{paper.questions} questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{paper.downloads} downloads</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download Paper
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Interview Tips */}
          <TabsContent value="tips" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {interviewTips.map((tip) => (
                <Card key={tip.id} className="border-green-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{tip.category}</Badge>
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{tip.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{tip.readTime} read</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Lightbulb className="h-4 w-4" />
                        <span>{tip.tips} tips</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Tips
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Coding Practice */}
          <TabsContent value="practice" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {codingPractice.map((practice) => (
                <Card key={practice.id} className="border-purple-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{practice.topic}</Badge>
                        </CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(practice.difficulty.split(' ')[0])}>
                        {practice.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Code className="h-4 w-4" />
                      <span>{practice.problems} problems</span>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Start Practice
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources;
