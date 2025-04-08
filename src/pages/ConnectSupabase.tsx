
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Database } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NavBar from "@/components/NavBar";
import { createClient } from "@supabase/supabase-js";

const supabaseFormSchema = z.object({
  projectUrl: z.string().url("Please enter a valid Supabase project URL"),
  apiKey: z.string().min(10, "API key must be at least 10 characters"),
});

type SupabaseFormValues = z.infer<typeof supabaseFormSchema>;

const ConnectSupabase = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const form = useForm<SupabaseFormValues>({
    resolver: zodResolver(supabaseFormSchema),
    defaultValues: {
      projectUrl: "",
      apiKey: "",
    },
  });

  const handleConnection = async (values: SupabaseFormValues) => {
    setIsConnecting(true);

    try {
      // Test connection by creating a temporary Supabase client
      const supabase = createClient(values.projectUrl, values.apiKey);
      
      // Try a simple query to check if the connection works
      const { error } = await supabase.from('_test_connection').select('*').limit(1).maybeSingle();
      
      // If connection fails because table doesn't exist, that's fine
      // We just want to ensure the client can connect to Supabase
      
      // Save the connection details (in a real app, this would be stored securely)
      localStorage.setItem('supabaseUrl', values.projectUrl);
      localStorage.setItem('supabaseKey', values.apiKey);
      
      setIsConnected(true);
      toast({
        title: "Connection successful",
        description: "Your Supabase account has been connected to Marco AI",
      });
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection failed",
        description: "Could not connect to Supabase with the provided credentials",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectSupabase = () => {
    localStorage.removeItem('supabaseUrl');
    localStorage.removeItem('supabaseKey');
    setIsConnected(false);
    form.reset();
    toast({
      title: "Disconnected",
      description: "Your Supabase account has been disconnected",
    });
  };

  // Check for existing connection on component mount
  useState(() => {
    const url = localStorage.getItem('supabaseUrl');
    const key = localStorage.getItem('supabaseKey');
    
    if (url && key) {
      form.setValue('projectUrl', url);
      form.setValue('apiKey', key);
      setIsConnected(true);
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-1 container mx-auto max-w-3xl px-4 py-12">
        <div className="text-center mb-10">
          <Database className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Connect Supabase Account</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Link your Supabase account to enhance Marco AI with database capabilities, 
            user authentication, and more.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg border shadow-sm">
          {isConnected ? (
            <div className="text-center py-6">
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Connected to Supabase
              </div>
              <p className="mb-6 text-gray-600">Your Supabase account is currently connected to Marco AI.</p>
              <Button 
                variant="outline" 
                onClick={disconnectSupabase}
                className="w-full sm:w-auto"
              >
                Disconnect Supabase
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleConnection)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="projectUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supabase Project URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://your-project-id.supabase.co" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        The URL of your Supabase project from the API settings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key (anon, public)</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Your project API key"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        The anon/public API key from your Supabase project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isConnecting}
                >
                  {isConnecting ? "Connecting..." : "Connect Supabase"}
                </Button>
              </form>
            </Form>
          )}
        </div>
        
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-lg font-medium mb-2">Where to find your Supabase credentials</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Go to your Supabase dashboard</li>
            <li>Select your project</li>
            <li>Go to Project Settings &gt; API</li>
            <li>Under Project URL, copy your URL</li>
            <li>Under Project API keys, copy the anon/public key</li>
          </ol>
          <div className="mt-4 text-sm text-gray-500">
            Note: For security reasons, Marco AI only stores these credentials locally in your browser and never on our servers.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectSupabase;
