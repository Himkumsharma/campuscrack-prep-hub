
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  companyName?: string;
  companyInfo?: any;
}

const ChatBot = ({ isOpen, onClose, companyName, companyInfo }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: companyName 
        ? `Hi! I'm your CampusCrack AI assistant. I can help you with detailed information about ${companyName}, including interview questions, preparation tips, and company-specific insights. What would you like to know?`
        : "Hi! I'm your CampusCrack AI assistant. I can help you with placement preparation, company insights, interview tips, coding problems, resume building, and much more. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Prepare messages for the AI API with company context
      let conversationMessages = [...messages, userMessage].map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      })).filter(msg => msg.content !== messages[0].content); // Remove initial greeting

      // Add company context if available
      if (companyName && companyInfo) {
        conversationMessages.unshift({
          role: 'system',
          content: `The user is asking about ${companyName}. Here's the company information: ${JSON.stringify(companyInfo)}. Provide detailed, specific information about this company including interview processes, common questions, salary ranges, and preparation tips.`
        });
      } else {
        conversationMessages.unshift({
          role: 'system',
          content: 'You are a helpful career counselor and placement preparation assistant. Help students with interview preparation, technical questions, resume building, and career guidance for companies recruiting from India colleges.'
        });
      }

      console.log('Sending messages to AI:', conversationMessages);

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { messages: conversationMessages }
      });

      console.log('AI Response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to get AI response');
      }

      if (!data || !data.response) {
        throw new Error('Invalid response from AI service');
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      let errorMessage = "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
      let fallbackContent = "";

      // Check for specific error types
      if (error.message?.includes('quota') || error.message?.includes('insufficient_quota')) {
        errorMessage = "The AI service is temporarily unavailable due to API limits. Please try again later.";
      } else if (error.message?.includes('timeout')) {
        errorMessage = "The request timed out. Please try again with a shorter question.";
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = "Network connection issue. Please check your internet and try again.";
      }

      // Provide fallback content based on context
      if (companyName && companyInfo) {
        fallbackContent = `Here's what I can tell you about ${companyName} from our database:\n\n` +
          `📍 Location: ${companyInfo.location}\n` +
          `💰 Package: ${companyInfo.package}\n` +
          `👥 Hiring: ${companyInfo.hiring}\n` +
          `📝 Interview Rounds: ${companyInfo.rounds?.join(', ')}\n` +
          `🔧 Key Skills: ${companyInfo.skills?.join(', ')}\n` +
          `💡 Pro Tip: ${companyInfo.tips}`;
      } else {
        fallbackContent = "Meanwhile, you can explore our Resources section for helpful placement materials, company-specific guides, and practice questions. Feel free to try asking me again in a few minutes!";
      }

      // Add fallback message
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessage + "\n\n" + fallbackContent,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <span>{companyName ? `${companyName} AI Assistant` : 'CampusCrack AI Assistant'}</span>
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
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex space-x-2 pt-4 border-t">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={companyName ? `Ask about ${companyName}...` : "Ask me anything about placements..."}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            size="sm"
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBot;
