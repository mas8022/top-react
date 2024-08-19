import { useState, useCallback } from "react";

const useProState = (initialValue) => {
  const [optimisticValue, setOptimisticValue] = useState(initialValue);
  const [pendingAction, setPendingAction] = useState(false);
  const [lastActionValue, setLastActionValue] = useState(null);

  const executeAction = useCallback(
    async (action) => {
      if (pendingAction) return;

      const optimisticUpdate = action(optimisticValue, true);
      setOptimisticValue(optimisticUpdate);
      setLastActionValue(optimisticUpdate);
      setPendingAction(true);

      try {
        const realResult = await action(optimisticUpdate, false);
        if (lastActionValue === optimisticUpdate) {
          setOptimisticValue(realResult);
        }
      } catch (error) {
        console.error("Error during action execution:", error);
      } finally {
        setPendingAction(false);
      }
    },
    [optimisticValue, pendingAction, lastActionValue]
  );

  return [executeAction, optimisticValue];
};

export { useProState };
