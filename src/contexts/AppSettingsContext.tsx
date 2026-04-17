import { createContext, useContext, ReactNode } from 'react';
import { useAppSettings } from '@/hooks/useAppSettings';

interface AppSettingsContextType {
  appName: string;
  loading: boolean;
  updateAppName: (name: string) => Promise<{ error: any }>;
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const { appName, loading, updateAppName } = useAppSettings();

  return (
    <AppSettingsContext.Provider value={{ appName, loading, updateAppName }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettingsContext = () => {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error('useAppSettingsContext must be used within an AppSettingsProvider');
  }
  return context;
};
