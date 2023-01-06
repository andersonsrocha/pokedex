import React from "react";

export function useMountEffect(cb: () => void, condition = true) {
  const mountRef = React.useRef(false);

  React.useEffect(() => {
    if (condition && !mountRef.current) {
      mountRef.current = true;
      cb();
    }
  }, [cb, condition]);
}
