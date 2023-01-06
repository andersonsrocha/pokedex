import React from "react";

import { useIsFirstRender } from ".";

export function useUpdateEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
  const isFirst = useIsFirstRender();

  React.useEffect(() => {
    if (!isFirst) return effect();
  }, deps);
}
