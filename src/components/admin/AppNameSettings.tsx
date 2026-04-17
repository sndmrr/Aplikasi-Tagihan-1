import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppSettingsContext } from '@/contexts/AppSettingsContext';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save, Loader2 } from 'lucide-react';

export const AppNameSettings = () => {
  const { appName, updateAppName } = useAppSettingsContext();
  const [newAppName, setNewAppName] = useState(appName);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!newAppName.trim()) {
      toast({
        title: "Error",
        description: "Nama aplikasi tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    const { error } = await updateAppName(newAppName.trim());
    setIsSaving(false);

    if (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah nama aplikasi",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Nama aplikasi berhasil diubah",
      });
    }
  };

  const handleReset = () => {
    setNewAppName(appName);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Pengaturan Nama Aplikasi</h3>
      </div>
      
      <div className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.08] space-y-4">
        <div className="space-y-2">
          <Label htmlFor="app-name" className="text-white/80">Nama Aplikasi</Label>
          <Input
            id="app-name"
            value={newAppName}
            onChange={(e) => setNewAppName(e.target.value)}
            placeholder="Masukkan nama aplikasi"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
          />
          <p className="text-white/50 text-xs">
            Nama aplikasi akan ditampilkan di seluruh halaman dan invoice
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleSave}
            disabled={isSaving || newAppName === appName}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Simpan
              </>
            )}
          </Button>
          <Button
            onClick={handleReset}
            disabled={newAppName === appName}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
