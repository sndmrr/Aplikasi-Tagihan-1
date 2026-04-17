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
  user_id: string;
}

interface Settings {
  id: string;
  saldo_awal: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  username: string;
}

export const useAdminData = () => {
  const [tagihans, setTagihans] = useState<Tagihan[]>([]);
  const [deletedTagihans, setDeletedTagihans] = useState<Tagihan[]>([]);
  const [settings, setSettings] = useState<Settings[]>([]);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userName } = useAuth();
  const { toast } = useToast();

  // Fetch all data (admin sees everything)
  const fetchData = async () => {
    if (!user) return;

    // Empty database mode - no data fetching
    setTagihans([]);
    setDeletedTagihans([]);
    setSettings([]);
    setProfiles([]);
    setLoading(false);
  };

  // Real-time subscriptions
  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user]);

  // Add tagihan
  const addTagihan = async (nama: string, jumlah: number) => {
    // Empty database mode - no operation
    return { error: { message: 'Database disconnected' } };
  };

  // Add tagihan langsung lunas (Bayar Langsung)
  const addTagihanLunas = async (nama: string, jumlah: number) => {
    // Empty database mode - no operation
    return { error: { message: 'Database disconnected' } };
  };

  // Add tagihan for a specific user (admin feature)
  const addTagihanForUser = async (nama: string, jumlah: number, targetUserId: string, targetUserName: string) => {
    // Empty database mode - no operation
    return { error: { message: 'Database disconnected' } };
  };

  // Update tagihan status to lunas
  const markAsLunas = async (id: string) => {
    // Empty database mode - no operation
    return { error: { message: 'Database disconnected' } };
  };

  // Soft delete tagihan
  const deleteTagihan = async (id: string) => {
    // Empty database mode - no operation
    return { error: { message: 'Database disconnected' } };
  };

  // Restore deleted tagihan
  const restoreTagihan = async (id: string) => {
    // Empty database mode - no operation
    return { error: { message: 'Database disconnected' } };
  };

  // Permanent delete tagihan
  const permanentDeleteTagihan = async (id: string) => {
    // Empty database mode - no operation
    return { error: { message: 'Database disconnected' } };
  };

  // Update settings
  const updateSaldoAwal = async (saldoAwal: number, userId?: string) => {
    // Empty database mode - no operation
    return { error: { message: 'Database disconnected' } };
  };

  // Update tagihan
  const updateTagihan = async (id: string, newNama: string, newJumlah: number, newStatus?: string) => {
    // Empty database mode - no operation
    return { error: { message: 'Database disconnected' } };
  };

  // Delete all lunas tagihan
  const deleteAllLunas = async () => {
    // Empty database mode - no operation
    return { error: { message: 'Database disconnected' } };
  };

  return {
    tagihans,
    deletedTagihans,
    settings,
    profiles,
    loading,
    addTagihan,
    addTagihanLunas,
    addTagihanForUser,
    markAsLunas,
    deleteTagihan,
    restoreTagihan,
    permanentDeleteTagihan,
    updateSaldoAwal,
    updateTagihan,
    deleteAllLunas,
  };
};
