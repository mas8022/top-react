import { useState, useEffect } from "react";

function useIdle(timeout = 3000) {
  const [isIdle, setIsIdle] = useState(false);
  let timeoutId;

  const resetIdleTimer = () => {
    setIsIdle(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => setIsIdle(true), timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];

    events.forEach((event) => window.addEventListener(event, resetIdleTimer));

    timeoutId = setTimeout(() => setIsIdle(true), timeout);

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetIdleTimer)
      );
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeout]);

  return isIdle;
}

export { useIdle };
