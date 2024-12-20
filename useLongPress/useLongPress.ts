import { useState, useEffect, useCallback } from "react";

type UseLongPressHandlers = {
  onMouseDown: () => void;
  onTouchStart: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchEnd: () => void;
};

function useLongPress(callback: () => void = () => {}, ms: number = 300): UseLongPressHandlers {
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [startLongPress, setStartLongPress] = useState<boolean>(false);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);

  const stop = useCallback(() => {
    setStartLongPress(false);
    setIsPressing(false);
  }, []);

  useEffect(() => {
    let timerId: number | undefined;

    if (startLongPress) {
      timerId = window.setTimeout(() => {
        setIsPressing(true);
        callback();
      }, ms);
    } else if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    return () => {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
    };
  }, [startLongPress, ms, callback]);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
  };
}

export { useLongPress };
