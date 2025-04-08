
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Database, Home, Code } from "lucide-react";

const NavBar = () => {
  const location = useLocation();
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Marco AI</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button variant={location.pathname === "/" ? "default" : "ghost"} size="sm" className="gap-1">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          <Link to="/chat">
            <Button variant={location.pathname === "/chat" ? "default" : "ghost"} size="sm" className="gap-1">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </Button>
          </Link>
          <Link to="/connect">
            <Button variant={location.pathname === "/connect" ? "default" : "ghost"} size="sm" className="gap-1">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Supabase</span>
            </Button>
          </Link>
          <Link to="/connect-vscode">
            <Button variant={location.pathname === "/connect-vscode" ? "default" : "ghost"} size="sm" className="gap-1">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">VS Code</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
