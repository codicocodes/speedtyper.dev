import { useCallback, useEffect, useState } from "react";

export function useFocusRef<T extends HTMLElement>(): [
  (node: T) => void,
  () => void
] {
  const [node, setNode] = useState<T>();
  const triggerFocus = useCallback(() => {
    if (!node) return;
    node?.focus();
  }, [node]);

  useEffect(() => {
    triggerFocus();
  }, [triggerFocus]);

  return [setNode, triggerFocus];
}
