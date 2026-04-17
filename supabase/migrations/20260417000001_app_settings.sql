-- Create table for app settings
CREATE TABLE public.app_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies - allow public read for app settings
CREATE POLICY "Anyone can view app settings" 
  ON public.app_settings 
  FOR SELECT 
  USING (true);

-- Only allow updates (no inserts/deletes for now)
CREATE POLICY "Only authenticated users can update app settings" 
  ON public.app_settings 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Insert default app name
INSERT INTO public.app_settings (key, value) 
VALUES ('app_name', 'Sistem Tagihan Digital');

-- Create trigger for updated_at
CREATE TRIGGER app_settings_updated_at
  BEFORE UPDATE ON public.app_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
