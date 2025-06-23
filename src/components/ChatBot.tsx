
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your CampusCrack AI assistant. I can help you with placement preparation, company insights, interview tips, and much more. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("interview") || input.includes("tips")) {
      return "Here are some key interview tips: 1) Research the company thoroughly 2) Practice coding problems daily 3) Prepare for behavioral questions using STAR method 4) Dress professionally 5) Ask thoughtful questions about the role. Would you like specific tips for any particular company?";
    }
    
    if (input.includes("company") || input.includes("companies")) {
      return "We have insights for 30+ top recruiters including TCS, Infosys, Wipro, Accenture, Cognizant, HCL, IBM, Amazon, Microsoft, and more. Which company would you like to know about specifically?";
    }
    
    if (input.includes("coding") || input.includes("programming")) {
      return "For coding preparation: 1) Focus on Data Structures & Algorithms 2) Practice on platforms like LeetCode, HackerRank 3) Master at least one programming language 4) Solve previous year questions 5) Time yourself during practice. Check our Resources section for coding problems!";
    }
    
    if (input.includes("resume") || input.includes("cv")) {
      return "Resume tips: 1) Keep it to 1-2 pages 2) Use action verbs 3) Quantify achievements 4) Include relevant projects 5) Proofread for errors 6) Use a clean, professional format. Would you like me to guide you through any specific section?";
    }
    
    return "That's a great question! I can help you with company insights, interview preparation, coding practice, resume building, and placement strategies. You can also check our Resources section for detailed materials. What specific area would you like to focus on?";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <span>CampusCrack AI Assistant</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex space-x-2 pt-4 border-t">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about placements..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBot;
