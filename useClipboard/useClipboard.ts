import { useState, useCallback } from "react";

function useClipboard(timeout: number = 2000) {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback(
    (text: string) => {
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
