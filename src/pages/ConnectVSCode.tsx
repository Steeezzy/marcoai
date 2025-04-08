
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Code, Download, Copy, CheckCircle } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ConnectVSCode = () => {
  const [copied, setCopied] = useState(false);
  const extensionId = "marco-ai-extension";
  const apiKey = "demo-" + Math.random().toString(36).substring(2, 10);

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast({
      title: "API Key copied",
      description: "The API key has been copied to your clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-1 container mx-auto max-w-3xl px-4 py-12">
        <div className="text-center mb-10">
          <Code className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Connect VS Code</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Enhance your development workflow by connecting Marco AI directly to your VS Code editor.
          </p>
        </div>

        <Tabs defaultValue="install" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="install">Installation</TabsTrigger>
            <TabsTrigger value="usage">Usage Guide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="install" className="space-y-6">
            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Install Marco AI Extension</h2>
              <p className="mb-6">
                Follow these steps to connect Marco AI with your VS Code editor:
              </p>
              
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h3 className="font-medium mb-1">Install VS Code Extension</h3>
                    <p className="text-gray-600 mb-3">
                      Install the Marco AI extension directly from the VS Code marketplace.
                    </p>
                    <Button 
                      className="gap-2" 
                      onClick={() => {
                        window.open("https://marketplace.visualstudio.com/items?itemName=" + extensionId, "_blank");
                      }}
                    >
                      <Download size={16} />
                      Get Extension
                    </Button>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h3 className="font-medium mb-1">Copy Your API Key</h3>
                    <p className="text-gray-600 mb-3">
                      Use this API key to authenticate the extension with your Marco AI account.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 px-4 py-2 rounded-l border flex-1 font-mono text-sm truncate">
                        {apiKey}
                      </div>
                      <Button 
                        variant="outline" 
                        className="rounded-l-none" 
                        onClick={handleCopyApiKey}
                      >
                        {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h3 className="font-medium mb-1">Configure Extension</h3>
                    <p className="text-gray-600">
                      Open VS Code settings, search for "Marco AI" and paste your API key in the configuration field.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-6">
            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Using Marco AI in VS Code</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Code Generation</h3>
                  <p className="text-gray-600">
                    Generate code by selecting text and using the command palette (Ctrl+Shift+P or Cmd+Shift+P) 
                    and typing "Marco AI: Generate Code". You can also use the keyboard shortcut Alt+M.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Code Explanation</h3>
                  <p className="text-gray-600">
                    Get explanations for selected code by using the command "Marco AI: Explain Code"
                    from the command palette or right-clicking on selected code.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Code Review</h3>
                  <p className="text-gray-600">
                    Have Marco AI review your code by selecting it and using the "Marco AI: Review Code"
                    command from the VS Code command palette.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Inline Chat</h3>
                  <p className="text-gray-600">
                    Use the Marco AI chat panel to ask questions about your code or get help with
                    programming tasks. Open it with "Marco AI: Open Chat" command.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-medium mb-2">Keyboard Shortcuts</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-700">Generate Code</span>
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">Alt+M G</code>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Explain Code</span>
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">Alt+M E</code>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Review Code</span>
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">Alt+M R</code>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Open Chat</span>
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">Alt+M C</code>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConnectVSCode;
