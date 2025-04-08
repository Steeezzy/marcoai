
import { Check, ChevronsUpDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ModelSelectorProps {
  selectedModel: string;
  onSelectModel: (model: string) => void;
}

const models = [
  {
    value: "gpt-4o-mini",
    label: "GPT-4o Mini",
    description: "Fastest model with good capabilities",
    credits: 1
  },
  {
    value: "gpt-4o",
    label: "GPT-4o",
    description: "Powerful model with vision capabilities",
    credits: 2
  },
  {
    value: "gpt-4.5-preview",
    label: "GPT-4.5 Preview",
    description: "Most advanced model (preview)",
    credits: 3
  },
  {
    value: "claude-3-haiku",
    label: "Claude 3 Haiku",
    description: "Fast and cost-effective for common tasks",
    credits: 1
  },
  {
    value: "claude-3-sonnet",
    label: "Claude 3 Sonnet",
    description: "Balanced performance and intelligence",
    credits: 2
  },
  {
    value: "claude-3-opus",
    label: "Claude 3 Opus",
    description: "Most intelligent and capable Claude model",
    credits: 3
  },
  {
    value: "gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    description: "Google's advanced multimodal model",
    credits: 2
  },
  {
    value: "mistral-large",
    label: "Mistral Large",
    description: "Powerful Mistral AI flagship model",
    credits: 2
  }
];

const ModelSelector = ({ selectedModel, onSelectModel }: ModelSelectorProps) => {
  const [open, setOpen] = useState(false);
  
  // Find the selected model object
  const currentModel = models.find(model => model.value === selectedModel);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {currentModel?.label || "Select model..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search AI models..." />
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  onSelect={(currentValue) => {
                    onSelectModel(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedModel === model.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      {model.label}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0">
                              <Info className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{model.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center justify-between">
                      <span>{model.description}</span>
                      <span className="ml-2 font-semibold text-blue-600">{model.credits} credit{model.credits > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ModelSelector;
