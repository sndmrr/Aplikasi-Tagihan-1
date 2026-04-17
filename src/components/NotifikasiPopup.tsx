import { useState, useEffect, useCallback } from 'react';
// import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

interface Notifikasi {
  id: string;
  title: string;
  message: string;
  target_type: string;
  target_user_id: string | null;
  is_read: boolean;
}

export const NotifikasiPopup = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notifikasi[]>([]);
  const [current, setCurrent] = useState<Notifikasi | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchUnread = useCallback(async () => {
    if (!user) return;
    // Database disconnected - no notifications
    setNotifications([]);
    setCurrent(null);
  }, [user, current]);

  useEffect(() => {
    fetchUnread();
  }, [fetchUnread]);

  // Realtime subscription disabled
  useEffect(() => {
    // Database disconnected - no realtime subscription
  }, [user]);

  const handleOk = () => {
    setShowConfirm(true);
  };

  const handleSudah = async () => {
    if (!current) return;
    // Database disconnected - just remove from local state
    const remaining = notifications.filter(n => n.id !== current.id);
    setNotifications(remaining);
    setCurrent(remaining.length > 0 ? remaining[0] : null);
    setShowConfirm(false);
  };

  const handleBelum = () => {
    setShowConfirm(false);
  };

  if (!current) return null;

  return (
    <>
      <AlertDialog open={!!current && !showConfirm}>
        <AlertDialogContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">{current.title}</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70 whitespace-pre-wrap">
              {current.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              onClick={handleOk}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showConfirm}>
        <AlertDialogContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Konfirmasi</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Apakah anda sudah paham dengan informasinya?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-2 sm:gap-2">
            <Button
              onClick={handleBelum}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Belum
            </Button>
            <Button
              onClick={handleSudah}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              Sudah
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
