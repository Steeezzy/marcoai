
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ChatMessage from "@/components/ChatMessage";
import ModelSelector from "@/components/ModelSelector";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import UserCredits from "@/components/UserCredits";
import { creditService } from "@/services/creditService";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      toast({
        title: "Authentication required",
        description: "Please log in to use the chat",
      });
    }
  }, [user, loading, navigate]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mock AI response function (to be replaced with actual API call)
  const getAIResponse = async (userMessage: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to continue",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if the user has enough credits
      const hasEnoughCredits = await creditService.hasEnoughCredits(user.id, selectedModel);
      
      if (!hasEnoughCredits) {
        toast({
          title: "Not enough credits",
          description: "Please purchase more credits to continue using this model",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use credits for this request
      const creditUsageSuccess = await creditService.useCredits(user.id, selectedModel);
      
      if (!creditUsageSuccess) {
        setIsLoading(false);
        return;
      }
      
      // Mock response
      const botResponse = `This is a simulated response to: "${userMessage}"\n\nIn a real implementation, this would call an AI model API using the selected model: ${selectedModel}.`;
      
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: botResponse,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get response from AI model",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      role: "user" as const,
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Get AI response
    await getAIResponse(userMessage.content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat cleared",
      description: "All messages have been removed"
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="container mx-auto px-4 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      
      <div className="container mx-auto px-4 flex-1 flex flex-col max-w-4xl">
        {/* Model selector and credits info */}
        <div className="py-4 border-b grid gap-4 md:grid-cols-2">
          <ModelSelector
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
          />
          {user && <UserCredits user={user} />}
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto py-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8 max-w-md">
                <Bot className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Marco AI Assistant</h2>
                <p className="text-gray-600 mb-6">
                  Ask me anything, and I'll assist you using the power of AI.
                </p>
                <div className="grid gap-2">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => {
                      setInput("How can Marco AI help me with my projects?");
                      setTimeout(() => handleSubmit({ preventDefault: () => {} } as React.FormEvent), 100);
                    }}
                  >
                    How can Marco AI help me with my projects?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => {
                      setInput("What AI models are available?");
                      setTimeout(() => handleSubmit({ preventDefault: () => {} } as React.FormEvent), 100);
                    }}
                  >
                    What AI models are available?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => {
                      setInput("How do I connect my Supabase account?");
                      setTimeout(() => handleSubmit({ preventDefault: () => {} } as React.FormEvent), 100);
                    }}
                  >
                    How do I connect my Supabase account?
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage 
                  key={index} 
                  message={message} 
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Clear chat button */}
        {messages.length > 0 && (
          <div className="flex justify-center py-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearChat}
              className="text-gray-500 gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Clear chat
            </Button>
          </div>
        )}
        
        {/* Input area */}
        <div className="border-t py-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="min-h-[60px] resize-none"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !input.trim()}
              className="h-[60px] w-[60px]"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
