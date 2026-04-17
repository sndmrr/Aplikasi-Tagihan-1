
import { useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';

export const useAutoCleanup = () => {
  useEffect(() => {
    const cleanupDeletedTagihans = async () => {
      // Empty database mode - no cleanup needed
      console.log('Auto cleanup disabled - database disconnected');
    };

    // Run cleanup immediately
    cleanupDeletedTagihans();

    // Set up interval to run every hour
    const interval = setInterval(cleanupDeletedTagihans, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
};
