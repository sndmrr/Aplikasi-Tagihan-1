import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UserPermissions {
  canEditData: boolean;
  canDeleteData: boolean;
  canLunasData: boolean;
  loading: boolean;
}

export const useUserPermissions = (): UserPermissions => {
  const [canEditData, setCanEditData] = useState(true);
  const [canDeleteData, setCanDeleteData] = useState(true);
  const [canLunasData, setCanLunasData] = useState(true);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      // Empty database mode - default permissions
      setCanEditData(true);
      setCanDeleteData(true);
      setCanLunasData(true);
      setLoading(false);
    };

    fetchPermissions();
  }, [user]);

  return {
    canEditData,
    canDeleteData,
    canLunasData,
    loading,
  };
};
