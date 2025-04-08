
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Database, Home, Code, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const NavBar = () => {
  const location = useLocation();
  const { user, signOut, loading } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
  };
  
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
          
          {!loading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm" className="gap-1">
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
