import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type UserRole = 'admin' | 'mitra' | null;

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  username: string;
  created_at: string;
}

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRoleAndProfile = async () => {
      if (!user) {
        setRole(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      // Empty database mode - no data fetching
      setRole(null);
      setProfile(null);
      setLoading(false);
    };

    fetchUserRoleAndProfile();
  }, [user]);

  return { role, profile, loading };
};
