
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Building2, 
  BookOpen, 
  MessageSquare, 
  Target, 
  Users, 
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Building2,
      title: "30+ Company Insights",
      description: "Detailed insights for top recruiters including TCS, Infosys, Amazon, Microsoft, and more."
    },
    {
      icon: BookOpen,
      title: "Previous Year Questions",
      description: "Comprehensive collection of placement questions from past years organized by company."
    },
    {
      icon: MessageSquare,
      title: "AI-Powered Assistance",
      description: "Get instant help with interview prep, coding problems, and placement strategies."
    },
    {
      icon: Target,
      title: "Interview Tips",
      description: "Expert tips and strategies to ace technical and HR rounds of your dream companies."
    }
  ];

  const stats = [
    { label: "Students Helped", value: "10,000+", icon: Users },
    { label: "Success Rate", value: "85%", icon: TrendingUp },
    { label: "Company Partners", value: "30+", icon: Building2 },
    { label: "Resources", value: "500+", icon: BookOpen }
  ];

  const topCompanies = [
    "TCS", "Infosys", "Wipro", "Accenture", "Cognizant", "HCL", 
    "IBM", "Amazon", "Microsoft", "Google", "Adobe", "Flipkart"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 border-blue-200 text-blue-700">
            🎯 Your Ultimate Placement Companion
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Crack Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Campus Placements
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master placement preparation with company-wise insights, previous year questions, 
            interview tips, and AI-powered assistance designed specifically for LNCT students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/companies">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Explore Companies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/resources">
              <Button size="lg" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and resources designed to help LNCT students excel in campus placements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-blue-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Recruiting Companies
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Get insights for leading companies that actively recruit from LNCT
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {topCompanies.map((company, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-gray-800">{company}</div>
              </div>
            ))}
          </div>
          
          <Link to="/companies">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              View All Companies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how CampusCrack helped students achieve their placement goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                company: "TCS",
                package: "3.5 LPA",
                quote: "CampusCrack's company insights helped me understand exactly what TCS was looking for. The previous year questions were spot on!"
              },
              {
                name: "Rahul Kumar", 
                company: "Infosys",
                package: "4.2 LPA",
                quote: "The AI assistant guided me through my preparation strategy. I felt confident going into the interview."
              },
              {
                name: "Sneha Patel",
                company: "Accenture", 
                package: "5.0 LPA",
                quote: "The interview tips and coding practice resources made all the difference. Highly recommend CampusCrack!"
              }
            ].map((story, index) => (
              <Card key={index} className="border-blue-100">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{story.name}</CardTitle>
                  <CardDescription>
                    Placed at {story.company} • {story.package}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{story.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Crack Your Campus Placements?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of LNCT students who have successfully landed their dream jobs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/companies">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Your Journey
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
