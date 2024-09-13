import { useState, useEffect, useCallback } from "react";

function useLongPress(callback = () => {}, ms = 300) {
  const [isPressing, setIsPressing] = useState(false);
  const [startLongPress, setStartLongPress] = useState(false);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);

  const stop = useCallback(() => {
    setStartLongPress(false);
    setIsPressing(false);
  }, []);

  useEffect(() => {
    let timerId;

    if (startLongPress) {
      timerId = setTimeout(() => {
        setIsPressing(true);
        callback();
      }, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
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
