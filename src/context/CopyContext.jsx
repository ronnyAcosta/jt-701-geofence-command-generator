import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const CopyContext = createContext(null);

export const CopyProvider = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const notifyCopied = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }, []);

  const value = useMemo(() => ({ copied, notifyCopied }), [copied, notifyCopied]);

  return <CopyContext.Provider value={value}>{children}</CopyContext.Provider>;
};

export const useCopyNotification = () => {
  const ctx = useContext(CopyContext);
  if (!ctx) {
    throw new Error('useCopyNotification debe usarse dentro de un CopyProvider');
  }
  return ctx;
};
