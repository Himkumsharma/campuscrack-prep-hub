
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar,
  Code,
  Brain,
  HelpCircle,
  BookOpen,
  Target
} from "lucide-react";

interface CompanyInsightsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  company: any;
}

const CompanyInsightsDialog = ({ isOpen, onClose, company }: CompanyInsightsDialogProps) => {
  if (!company) return null;

  const getInterviewQuestions = (companyName: string) => {
    const questionBank = {
      "Tata Consultancy Services (TCS)": [
        "Tell me about yourself and your technical background",
        "What is polymorphism? Explain with example",
        "Write a program to reverse a string",
        "What is the difference between abstract class and interface?",
        "Explain OOPS concepts with real-world examples",
        "What are your strengths and weaknesses?",
        "Why do you want to join TCS?",
        "How do you handle pressure and deadlines?"
      ],
      "Infosys": [
        "What is inheritance in Java?",
        "Explain the difference between SQL and NoSQL",
        "Write a program to find the second largest number in an array",
        "What is exception handling?",
        "Explain your final year project",
        "What motivates you to work in IT?",
        "How do you stay updated with new technologies?",
        "Describe a challenging situation you faced"
      ],
      "Amazon": [
        "Design a URL shortener like bit.ly",
        "Given an array, find two numbers that sum to a target",
        "Explain AWS services you're familiar with",
        "Tell me about a time you had to meet a tight deadline",
        "How would you handle disagreement with a team member?",
        "What's your approach to debugging complex issues?",
        "Design a parking lot system",
        "Explain the CAP theorem"
      ],
      "Microsoft": [
        "Reverse a linked list iteratively and recursively",
        "Design a chat application like WhatsApp",
        "What is your experience with cloud technologies?",
        "Tell me about a project where you showed leadership",
        "How do you prioritize features in a product?",
        "Explain object-oriented design principles",
        "What's the difference between process and thread?",
        "Design a recommendation system"
      ],
      "Wipro": [
        "What is the difference between C++ and Java?",
        "Write a program to check if a number is prime",
        "Explain database normalization",
        "What are your career goals?",
        "How do you handle multiple tasks simultaneously?",
        "What is your understanding of software testing?",
        "Explain the software development lifecycle",
        "Why should we hire you?"
      ],
      "Accenture": [
        "What is digital transformation?",
        "Explain your understanding of business analysis",
        "How would you improve a client's business process?",
        "Tell me about a time you solved a complex problem",
        "What is your approach to learning new technologies?",
        "How do you handle client expectations?",
        "Explain cloud computing benefits",
        "What interests you about consulting?"
      ]
    };

    return questionBank[companyName] || [
      "Tell me about yourself",
      "What are your technical strengths?",
      "How do you handle challenging situations?",
      "Why do you want to join our company?",
      "Where do you see yourself in 5 years?",
      "What motivates you to work in technology?",
      "Describe your problem-solving approach",
      "How do you stay updated with industry trends?"
    ];
  };

  const getTestTopics = (companyName: string) => {
    const testBank = {
      "Tata Consultancy Services (TCS)": [
        "Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", 
        "Programming Concepts", "Basic CS Fundamentals", "Email Writing"
      ],
      "Infosys": [
        "Quantitative Aptitude", "Logical Reasoning", "Verbal Ability",
        "Programming Logic", "Database Concepts", "Puzzle Solving"
      ],
      "Amazon": [
        "Data Structures & Algorithms", "System Design", "Behavioral Questions",
        "Coding Problems", "Leadership Principles", "Technical Depth"
      ],
      "Microsoft": [
        "Coding & Algorithms", "System Design", "Technical Knowledge",
        "Problem Solving", "Leadership Scenarios", "Product Sense"
      ],
      "Wipro": [
        "Quantitative Aptitude", "Logical Reasoning", "Verbal Ability",
        "Technical MCQs", "Programming Basics", "General Awareness"
      ],
      "Accenture": [
        "Cognitive Assessment", "Technical Assessment", "Communication Skills",
        "Analytical Reasoning", "Domain Knowledge", "Business Scenarios"
      ]
    };

    return testBank[companyName] || [
      "Aptitude Test", "Technical Assessment", "Logical Reasoning",
      "Communication Skills", "Domain Knowledge", "Problem Solving"
    ];
  };

  const interviewQuestions = getInterviewQuestions(company.name);
  const testTopics = getTestTopics(company.name);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-xl">
            <div className="text-2xl">{company.logo}</div>
            <div>
              <span>{company.name} - Complete Insights</span>
              <Badge className="ml-2 text-xs">{company.category}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Company Overview */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-medium">Package: {company.package}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>Location: {company.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span>Hiring: {company.hiring}</span>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <Brain className="h-4 w-4 mr-1" />
                Pro Tip
              </h4>
              <p className="text-sm text-blue-700">{company.tips}</p>
            </div>
          </div>

          <Separator />

          {/* Interview Rounds */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Interview Process
            </h3>
            <div className="flex flex-wrap gap-2">
              {company.rounds.map((round, index) => (
                <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                  {index + 1}. {round}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Required Skills */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Key Skills Required
            </h3>
            <div className="flex flex-wrap gap-2">
              {company.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Test Topics */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Test Topics & Assessment Areas
            </h3>
            <div className="grid md:grid-cols-2 gap-2">
              {testTopics.map((topic, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <Target className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Common Interview Questions */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Common Interview Questions
            </h3>
            <div className="space-y-3">
              {interviewQuestions.map((question, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
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

          {/* Preparation Strategy */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-green-800 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Preparation Strategy
            </h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Practice coding problems daily for at least 2-3 hours</li>
              <li>• Focus on the specific skills mentioned above</li>
              <li>• Prepare for behavioral questions using STAR method</li>
              <li>• Research the company's recent projects and news</li>
              <li>• Practice mock interviews with peers</li>
              <li>• Prepare questions to ask the interviewer</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyInsightsDialog;
