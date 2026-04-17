import React, { useState, useEffect } from 'react';
import { Calendar, Save, Loader2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MitraProfile {
  id: string;
  user_id: string;
  full_name: string;
  username: string;
  tanggal_setor: string | null;
}

export const TanggalSetorMitra = () => {
  const [mitraList, setMitraList] = useState<MitraProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMitraProfiles();
  }, []);

  const fetchMitraProfiles = async () => {
    // Database disconnected - no mitra profiles
    setMitraList([]);
    setLoading(false);
  };

  const handleSave = async (profileId: string) => {
    // Database disconnected - show error
    toast({ title: 'Error', description: 'Database tidak tersedia. Fitur dinonaktifkan.', variant: 'destructive' });
  };

  const formatDateDisplay = (d: string | null) => {
    if (!d) return 'Belum diatur';
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-base">
            <Calendar className="h-5 w-5" />
            Tanggal Setor Mitra
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mitraList.length === 0 ? (
            <p className="text-sm text-white/60">Belum ada mitra terdaftar.</p>
          ) : (
            mitraList.map((mitra) => (
              <div
                key={mitra.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-slate-700/40 border border-white/5"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{mitra.full_name}</p>
                  <p className="text-xs text-white/50">@{mitra.username}</p>
                  <p className="text-xs text-white/70 mt-1">
                    Tanggal Setor: <span className="font-medium text-white">{formatDateDisplay(mitra.tanggal_setor)}</span>
                  </p>
                </div>

                {editingId === mitra.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="w-40 bg-slate-600/50 border-white/20 text-white text-xs h-8"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSave(mitra.id)}
                      disabled={saving}
                      className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700"
                    >
                      {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => { setEditingId(null); setEditDate(''); }}
                      className="h-8 text-xs text-white/60"
                    >
                      Batal
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => { setEditingId(mitra.id); setEditDate(mitra.tanggal_setor || ''); }}
                    className="h-8 text-xs bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 border border-emerald-500"
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
