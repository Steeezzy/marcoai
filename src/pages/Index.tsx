
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Database, Code } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Marco AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/chat">
              <Button variant="ghost">Chat</Button>
            </Link>
            <Link to="/connect">
              <Button variant="ghost">Connect Supabase</Button>
            </Link>
            <Link to="/connect-vscode">
              <Button variant="ghost">VS Code</Button>
            </Link>
            <Link to="/chat">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-5xl md:text-6xl font-bold max-w-3xl mb-6">
          No-Code AI Tool with <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Powerful Capabilities</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          Build, create, and interact with AI models without writing code. 
          Connect your Supabase account and VS Code for enhanced functionality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/chat">
            <Button size="lg" className="gap-2">
              Try AI Chat <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/connect">
            <Button size="lg" variant="outline" className="gap-2">
              Connect Supabase <Database className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/connect-vscode">
            <Button size="lg" variant="outline" className="gap-2">
              Connect VS Code <Code className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Chat Assistant</h3>
              <p className="text-gray-600">Interact with advanced GPT models to get answers, generate content, and more.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-indigo-100 p-3 rounded-full w-fit mb-4">
                <Database className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Supabase Integration</h3>
              <p className="text-gray-600">Connect your Supabase account to store data and enhance AI capabilities.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                <Code className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">VS Code Integration</h3>
              <p className="text-gray-600">Connect directly to VS Code for a seamless development experience with AI assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© 2025 Marco AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
