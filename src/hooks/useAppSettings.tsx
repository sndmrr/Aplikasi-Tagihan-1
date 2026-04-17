import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAppSettings = () => {
  const [appName, setAppName] = useState<string>('Sistem Tagihan Digital');
  const [loading, setLoading] = useState(true);

  const fetchAppName = async () => {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'app_name')
        .single();

      if (error) {
        console.error('Error fetching app name:', error);
        return;
      }

      if (data) {
        setAppName(data.value);
      }
    } catch (error) {
      console.error('Error in fetchAppName:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppName();
  }, []);

  const updateAppName = async (newName: string) => {
    try {
      const { error } = await supabase
        .from('app_settings')
        .update({ value: newName })
        .eq('key', 'app_name');

      if (error) {
        console.error('Error updating app name:', error);
        return { error };
      }

      setAppName(newName);
      return { error: null };
    } catch (error: any) {
      console.error('Error in updateAppName:', error);
      return { error };
    }
  };

  return { appName, loading, updateAppName };
};
