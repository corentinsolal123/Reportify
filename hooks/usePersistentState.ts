"use client";

import { useEffect, useState } from "react";

/**
 * useState backed by localStorage. The stored value is read after mount to keep
 * server and client renders identical; `isHydrated` tells when it is available.
 */
export function usePersistentState<T>(key: string, createInitial: () => T) {
  const [value, setValue] = useState<T>(createInitial);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);

      if (stored) setValue(JSON.parse(stored) as T);
    } catch {
      // Corrupted or inaccessible storage: keep the initial value.
    }
    setIsHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or disabled: the draft simply isn't saved.
    }
  }, [key, value, isHydrated]);

  const reset = () => setValue(createInitial());

  return [value, setValue, { isHydrated, reset }] as const;
}
