
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { CircleDollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UserCreditsProps {
  user: User | null;
}

export default function UserCredits({ user }: UserCreditsProps) {
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchCredits = async () => {
      try {
        const { data, error } = await supabase
          .from('user_credits')
          .select('credits_remaining')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          setCredits(data.credits_remaining);
        }
      } catch (error: any) {
        console.error('Error fetching credits:', error);
        toast({
          title: "Error fetching credits",
          description: error.message || "Could not retrieve your credits",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [user]);

  const handlePurchaseCredits = () => {
    // This would be connected to a payment processor in a real implementation
    toast({
      title: "Purchase Credits",
      description: "This would open a payment page in a real implementation.",
    });
  };

  if (!user || loading) {
    return (
      <div className="border rounded-md p-3 flex items-center justify-center h-12">
        <div className="animate-pulse h-4 w-28 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CircleDollarSign className="h-5 w-5 text-blue-500" />
        <span className="font-medium">
          {credits !== null ? `${credits} credits remaining` : "No credits information"}
        </span>
      </div>
      <Button onClick={handlePurchaseCredits} size="sm" variant="outline">
        Buy More
      </Button>
    </div>
  );
}
