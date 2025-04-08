
import { Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { role, content, timestamp } = message;
  
  return (
    <div className={`flex ${role === "assistant" ? "bg-gray-50" : ""} p-4 rounded-lg`}>
      <div className="flex-shrink-0 mr-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          role === "assistant" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
        }`}>
          {role === "assistant" ? <Bot size={16} /> : <User size={16} />}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-medium">
            {role === "assistant" ? "Marco AI" : "You"}
          </span>
          <span className="text-xs text-gray-500 ml-2">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
