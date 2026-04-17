import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';

export const useAppSettings = () => {
  const [appName, setAppName] = useState<string>('Sistem Tagihan Digital');
  const [loading, setLoading] = useState(true);

  const fetchAppName = async () => {
    // Empty database mode - use default app name
    setAppName('Sistem Tagihan Digital');
    setLoading(false);
  };

  useEffect(() => {
    fetchAppName();
  }, []);

  const updateAppName = async (newName: string) => {
    // Empty database mode - no operation
    return { error: { message: 'Database disconnected' } };
  };

  return { appName, loading, updateAppName };
};
