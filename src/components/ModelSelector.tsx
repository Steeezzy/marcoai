
import { Check, ChevronsUpDown } from "lucide-react";
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
    description: "Fastest model with good capabilities"
  },
  {
    value: "gpt-4o",
    label: "GPT-4o",
    description: "Powerful model with vision capabilities"
  },
  {
    value: "gpt-4.5-preview",
    label: "GPT-4.5 Preview",
    description: "Most advanced model (preview)"
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
                  <div>
                    <div>{model.label}</div>
                    <div className="text-xs text-gray-500">{model.description}</div>
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
