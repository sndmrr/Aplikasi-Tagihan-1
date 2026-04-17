import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useDepositDate = () => {
  const { user } = useAuth();
  const [depositDate, setDepositDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchDepositDate();
  }, [user]);

  const fetchDepositDate = async () => {
    if (!user) return;
    // Empty database mode - no data fetching
    setDepositDate(null);
    setLoading(false);
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Belum diatur';
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return { depositDate, loading, formatDate, refetch: fetchDepositDate };
};
