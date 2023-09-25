import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { RefCallback } from "react";

export const useAnimatedForwardRef = <T extends HTMLElement>(
  ref: React.ForwardedRef<T>,
): [RefCallback<T>, (enabled: boolean) => void] => {
  const [animatedRef, enableAnimations] = useAutoAnimate<T>();

  const outRef: RefCallback<T> = (node) => {
    if (ref && typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
    animatedRef(node);
  }

  return [outRef, enableAnimations];
};
