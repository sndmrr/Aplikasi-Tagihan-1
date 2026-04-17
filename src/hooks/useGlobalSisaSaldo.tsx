import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface GlobalSisaSaldoData {
  totalSaldoInduk: number;
  totalTagihanAktif: number;
  totalBayar: number;
  sisaSaldoGlobal: number;
  loading: boolean;
}

export const useGlobalSisaSaldo = (): GlobalSisaSaldoData => {
  const [totalSaldoInduk, setTotalSaldoInduk] = useState(0);
  const [totalTagihanAktif, setTotalTagihanAktif] = useState(0);
  const [totalBayar, setTotalBayar] = useState(0);
  const [sisaSaldoGlobal, setSisaSaldoGlobal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchGlobalData = async () => {
    // Empty database mode - no data fetching
    setTotalSaldoInduk(0);
    setTotalTagihanAktif(0);
    setTotalBayar(0);
    setSisaSaldoGlobal(0);
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    fetchGlobalData();
  }, [user]);

  return {
    totalSaldoInduk,
    totalTagihanAktif,
    totalBayar,
    sisaSaldoGlobal,
    loading,
  };
};
