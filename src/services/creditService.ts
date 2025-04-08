
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface CreditTransaction {
  amount: number;
  transaction_type: 'usage' | 'purchase' | 'bonus';
  description: string;
}

interface UserCredits {
  credits_remaining: number;
}

interface CreditTransactionRecord {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: string;
  created_at: string;
  description: string | null;
}

export const creditService = {
  // Check if user has enough credits for a specific model
  async hasEnoughCredits(userId: string, modelName: string): Promise<boolean> {
    try {
      // Get the credit cost for the model
      const creditCost = getCreditCostForModel(modelName);
      
      // Get current credit balance
      const { data, error } = await supabase
        .from('user_credits')
        .select('credits_remaining')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) throw error;
      
      // If no record or not enough credits
      if (!data || data.credits_remaining < creditCost) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error checking credits:', error);
      return false;
    }
  },
  
  // Deduct credits for using a model
  async useCredits(userId: string, modelName: string): Promise<boolean> {
    try {
      const creditCost = getCreditCostForModel(modelName);
      
      // First check if user has enough credits
      const hasCredits = await this.hasEnoughCredits(userId, modelName);
      if (!hasCredits) {
        toast({
          title: "Not enough credits",
          description: `You need ${creditCost} credits to use ${modelName}`,
          variant: "destructive"
        });
        return false;
      }
      
      // Begin transaction to update credits and record usage
      const { error: updateError } = await supabase.rpc('use_credits', { 
        p_user_id: userId, 
        p_amount: creditCost,
        p_description: `Used ${modelName}`
      });
      
      if (updateError) throw updateError;
      
      return true;
    } catch (error: any) {
      console.error('Error using credits:', error);
      toast({
        title: "Error processing credits",
        description: error.message || "An error occurred while processing your credits",
        variant: "destructive"
      });
      return false;
    }
  },
  
  // Get transaction history
  async getTransactionHistory(userId: string): Promise<CreditTransactionRecord[]> {
    const { data, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
    
    return data || [];
  }
};

// Helper function to get credit cost for a model
function getCreditCostForModel(modelName: string): number {
  const models: Record<string, number> = {
    'gpt-4o-mini': 1,
    'gpt-4o': 2,
    'gpt-4.5-preview': 3,
    'claude-3-haiku': 1,
    'claude-3-sonnet': 2,
    'claude-3-opus': 3,
    'gemini-1.5-pro': 2,
    'mistral-large': 2
  };
  
  return models[modelName] || 1; // Default to 1 if not found
}
