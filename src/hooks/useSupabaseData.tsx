import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
interface Tagihan {
  id: string;
  nama: string;
  jumlah: number;
  status: 'belum_lunas' | 'lunas';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  nama_input?: string;
  nama_lunas?: string;
}

interface Settings {
  id: string;
  saldo_awal: number;
  created_at: string;
  updated_at: string;
}

export const useSupabaseData = () => {
  const [tagihans, setTagihans] = useState<Tagihan[]>([]);
  const [deletedTagihans, setDeletedTagihans] = useState<Tagihan[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, userName } = useAuth();
  const { toast } = useToast();

  // Empty database mode - no actual data fetching
  const fetchData = async () => {
    // No database connection - return empty data
    setLoading(false);
  };

  // No real-time subscriptions in empty database mode
  useEffect(() => {
    setLoading(false);
  }, []);

  // Mock functions that do nothing (empty database mode)
  const addTagihan = async (nama: string, jumlah: number) => {
    // Database disconnected - no operation
    return { error: { message: 'Database disconnected' } };
  };

  const addTagihanLunas = async (nama: string, jumlah: number) => {
    // Database disconnected - no operation
    return { error: { message: 'Database disconnected' } };
  };

  const markAsLunas = async (id: string) => {
    // Database disconnected - no operation
    return { error: { message: 'Database disconnected' } };
  };

  const deleteTagihan = async (id: string) => {
    // Database disconnected - no operation
    return { error: { message: 'Database disconnected' } };
  };

  const restoreTagihan = async (id: string) => {
    // Database disconnected - no operation
    return { error: { message: 'Database disconnected' } };
  };

  const permanentDeleteTagihan = async (id: string) => {
    // Database disconnected - no operation
    return { error: { message: 'Database disconnected' } };
  };

  const updateSaldoAwal = async (saldoAwal: number) => {
    // Database disconnected - no operation
    return { error: { message: 'Database disconnected' } };
  };

  const updateTagihan = async (id: string, newNama: string, newJumlah: number, newStatus?: string) => {
    // Database disconnected - no operation
    return { error: { message: 'Database disconnected' } };
  };

  const deleteAllLunas = async () => {
    // Database disconnected - no operation
    return { error: { message: 'Database disconnected' } };
  };

  return {
    tagihans,
    deletedTagihans,
    settings,
    loading,
    addTagihan,
    addTagihanLunas,
    markAsLunas,
    deleteTagihan,
    restoreTagihan,
    permanentDeleteTagihan,
    updateSaldoAwal,
    updateTagihan,
    deleteAllLunas,
  };
};
