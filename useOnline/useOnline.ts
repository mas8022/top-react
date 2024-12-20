"use client";

import { useState, useEffect, useRef } from "react";

const useOnline = (): boolean => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const isOnlineRef = useRef<boolean>(isOnline);

  useEffect(() => {
    const handleOnline = () => {
      if (!isOnlineRef.current) {
        setIsOnline(true);
        isOnlineRef.current = true;
      }
    };

    const handleOffline = () => {
      if (isOnlineRef.current) {
        setIsOnline(false);
        isOnlineRef.current = false;
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

export { useOnline };
