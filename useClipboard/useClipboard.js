import { useState, useCallback } from "react";

function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(
    (text) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
      });
    },
    [timeout]
  );

  return { copied, copyToClipboard };
}

export { useClipboard };
