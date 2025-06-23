
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  BookOpen, 
  Download, 
  Eye, 
  Clock,
  Star,
  Code,
  MessageSquare,
  FileText,
  Video,
  Brain,
  Target
} from "lucide-react";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const previousYearQuestions = [
    {
      id: 1,
      company: "TCS",
      year: "2024",
      type: "Coding Questions",
      difficulty: "Medium",
      questions: 15,
      downloads: 2400,
      rating: 4.8,
      topics: ["Arrays", "Strings", "Basic Math", "Pattern Printing"]
    },
    {
      id: 2,
      company: "Infosys",
      year: "2024", 
      type: "Aptitude + Coding",
      difficulty: "Medium",
      questions: 25,
      downloads: 1800,
      rating: 4.6,
      topics: ["Logical Reasoning", "Quantitative", "Programming Logic"]
    },
    {
      id: 3,
      company: "Amazon",
      year: "2024",
      type: "DSA Questions",
      difficulty: "Hard",
      questions: 20,
      downloads: 3200,
      rating: 4.9,
      topics: ["Trees", "Graphs", "Dynamic Programming", "System Design"]
    },
    {
      id: 4,
      company: "Microsoft",
      year: "2024",
      type: "Technical Interview",
      difficulty: "Hard", 
      questions: 18,
      downloads: 2800,
      rating: 4.7,
      topics: ["Algorithms", "Data Structures", "System Design", "Behavioral"]
    },
    {
      id: 5,
      company: "Wipro",
      year: "2024",
      type: "Online Assessment",
      difficulty: "Easy",
      questions: 30,
      downloads: 1500,
      rating: 4.4,
      topics: ["Basic Programming", "English", "Logical Reasoning"]
    },
    {
      id: 6,
      company: "Accenture",
      year: "2024",
      type: "Cognitive Test",
      difficulty: "Medium",
      questions: 22,
      downloads: 1900,
      rating: 4.5,
      topics: ["Abstract Reasoning", "Verbal Ability", "Numerical Ability"]
    }
  ];

  const interviewTips = [
    {
      id: 1,
      title: "Technical Interview Mastery",
      category: "Technical",
      duration: "45 min read",
      rating: 4.9,
      views: 5200,
      description: "Complete guide to ace technical interviews with coding strategies and problem-solving approaches."
    },
    {
      id: 2,
      title: "HR Interview Success Guide", 
      category: "HR",
      duration: "30 min read",
      rating: 4.7,
      views: 4100,
      description: "Master common HR questions and behavioral interview techniques with real examples."
    },
    {
      id: 3,
      title: "System Design for Beginners",
      category: "System Design",
      duration: "60 min read", 
      rating: 4.8,
      views: 3800,
      description: "Learn system design fundamentals with practical examples and scalability concepts."
    },
    {
      id: 4,
      title: "Resume Building Workshop",
      category: "Resume",
      duration: "25 min read",
      rating: 4.6,
      views: 6200,
      description: "Create compelling resumes that get noticed by recruiters with templates and examples."
    }
  ];

  const codingPractice = [
    {
      id: 1,
      title: "Array and String Problems",
      level: "Beginner",
      problems: 50,
      solved: 1200,
      topics: ["Two Pointers", "Sliding Window", "Basic Operations"]
    },
    {
      id: 2,
      title: "Data Structures Deep Dive",
      level: "Intermediate", 
      problems: 75,
      solved: 890,
      topics: ["Trees", "Graphs", "Hash Tables", "Heaps"]
    },
    {
      id: 3,
      title: "Dynamic Programming Mastery",
      level: "Advanced",
      problems: 40,
      solved: 520,
      topics: ["Memoization", "Tabulation", "Optimization"]
    },
    {
      id: 4,
      title: "System Design Practice",
      level: "Advanced",
      problems: 25,
      solved: 380,
      topics: ["Scalability", "Database Design", "API Design"]
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

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-blue-100 text-blue-800";
      case "Intermediate": return "bg-purple-100 text-purple-800";
      case "Advanced": return "bg-red-100 text-red-800";
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
            Everything you need to prepare for campus placements
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Resource Categories */}
        <Tabs defaultValue="questions" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="questions">Previous Questions</TabsTrigger>
            <TabsTrigger value="tips">Interview Tips</TabsTrigger>
            <TabsTrigger value="coding">Coding Practice</TabsTrigger>
            <TabsTrigger value="mock">Mock Tests</TabsTrigger>
          </TabsList>

          {/* Previous Year Questions */}
          <TabsContent value="questions" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Previous Year Questions</h2>
              <p className="text-gray-600">Company-wise question papers from recent placement drives</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousYearQuestions.map((resource) => (
                <Card key={resource.id} className="border-blue-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{resource.company} - {resource.year}</CardTitle>
                        <CardDescription>{resource.type}</CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{resource.questions} Questions</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{resource.downloads}</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Topics Covered</h4>
                      <div className="flex flex-wrap gap-1">
                        {resource.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Interview Tips */}
          <TabsContent value="tips" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Tips & Guides</h2>
              <p className="text-gray-600">Expert advice to help you excel in interviews</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {interviewTips.map((tip) => (
                <Card key={tip.id} className="border-green-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <Badge variant="outline">{tip.category}</Badge>
                          <span className="flex items-center space-x-1 text-xs">
                            <Clock className="h-3 w-3" />
                            {tip.duration}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{tip.rating}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{tip.views} views</span>
                      </span>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Coding Practice */}
          <TabsContent value="coding" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Coding Practice</h2>
              <p className="text-gray-600">Structured practice sets to improve your programming skills</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {codingPractice.map((practice) => (
                <Card key={practice.id} className="border-purple-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <Badge className={getLevelColor(practice.level)}>
                            {practice.level}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        <Code className="h-4 w-4" />
                        <span>{practice.problems} Problems</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Target className="h-4 w-4" />
                        <span>{practice.solved} Solved</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Topics</h4>
                      <div className="flex flex-wrap gap-1">
                        {practice.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Code className="h-4 w-4 mr-2" />
                      Start Practice
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mock Tests */}
          <TabsContent value="mock" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mock Tests</h2>
              <p className="text-gray-600">Practice with real-time mock tests and assessments</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Full Stack Assessment",
                  duration: "90 minutes",
                  questions: 60,
                  type: "Mixed",
                  attempts: 1250
                },
                {
                  title: "Technical Aptitude", 
                  duration: "60 minutes",
                  questions: 40,
                  type: "Aptitude",
                  attempts: 2100
                },
                {
                  title: "Coding Challenge",
                  duration: "120 minutes", 
                  questions: 5,
                  type: "Coding",
                  attempts: 890
                },
                {
                  title: "HR Simulation",
                  duration: "45 minutes",
                  questions: 25,
                  type: "Behavioral",
                  attempts: 1600
                },
                {
                  title: "System Design Round",
                  duration: "90 minutes",
                  questions: 3,
                  type: "Design",
                  attempts: 340
                },
                {
                  title: "Company Specific - TCS",
                  duration: "75 minutes",
                  questions: 45,
                  type: "Company",
                  attempts: 950
                }
              ].map((test, index) => (
                <Card key={index} className="border-orange-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription>
                      <Badge variant="outline">{test.type}</Badge>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{test.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Questions:</span>
                        <span className="font-medium">{test.questions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attempts:</span>
                        <span className="font-medium">{test.attempts}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                      <Brain className="h-4 w-4 mr-2" />
                      Start Test
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
