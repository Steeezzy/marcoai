
-- Function to use credits and record a transaction in one operation
CREATE OR REPLACE FUNCTION public.use_credits(
  p_user_id UUID,
  p_amount INT,
  p_description TEXT DEFAULT NULL
) RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_credits_remaining INT;
BEGIN
  -- Update the user's credits
  UPDATE public.user_credits
  SET 
    credits_remaining = credits_remaining - p_amount,
    updated_at = now()
  WHERE user_id = p_user_id
  RETURNING credits_remaining INTO v_credits_remaining;
  
  -- Insert a transaction record
  INSERT INTO public.credit_transactions (
    user_id, 
    amount, 
    transaction_type,
    description
  ) VALUES (
    p_user_id, 
    p_amount, 
    'usage',
    p_description
  );
  
  RETURN v_credits_remaining;
EXCEPTION
  WHEN others THEN
    RAISE;
END;
$$;
