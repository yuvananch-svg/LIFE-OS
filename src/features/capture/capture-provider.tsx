'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { CaptureCleanupRegistry, type CaptureAvailability } from './capture-controller';

type Cleanup = () => void | Promise<void>;
interface CaptureContextValue {
  availability: CaptureAvailability;
  registerSessionCleanup: (cleanup: Cleanup) => () => void;
  cancelAndCleanup: () => Promise<void>;
}

const CaptureContext = createContext<CaptureContextValue | null>(null);

/** Shared lifecycle boundary; no recorder/session implementation is installed. */
export function CaptureProvider({ userId, children }: { userId: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const registry = useRef<CaptureCleanupRegistry | null>(null);
  if (registry.current === null) registry.current = new CaptureCleanupRegistry();
  const cleanAll = useCallback(() => registry.current!.disposeAll(), []);
  const registerSessionCleanup = useCallback((cleanup: Cleanup) => registry.current!.register(cleanup), []);
  const value = useMemo<CaptureContextValue>(() => ({
    availability: 'unavailable',
    registerSessionCleanup,
    cancelAndCleanup: cleanAll,
  }), [registerSessionCleanup, cleanAll]);

  useEffect(() => {
    return () => { void cleanAll(); };
  }, [userId, pathname, cleanAll]);

  return <CaptureContext.Provider value={value}>{children}</CaptureContext.Provider>;
}

export function useCaptureController() {
  const value = useContext(CaptureContext);
  if (!value) throw new Error('useCaptureController must be used within CaptureProvider');
  return value;
}
