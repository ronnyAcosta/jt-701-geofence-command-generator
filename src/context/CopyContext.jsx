import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Reemplaza a `copyContent()` de helpers.js, que usaba
 * document.getElementById("copied") + classList.add/remove directamente.
 *
 * GetCommand ya no toca el DOM: solo copia al portapapeles y llama a
 * notifyCopied(), que vive en el mismo Provider que <CopiedToast />.
 */
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
