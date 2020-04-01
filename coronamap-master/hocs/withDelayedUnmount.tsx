import React, { useEffect, useState } from 'react';

interface WithDelayedUnmountProps {
  isVisible: boolean;
  delayTime: number;
}

const withDelayedUnmount = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithDelayedUnmountProps> => ({
  isVisible,
  delayTime,
  ...rest
}: WithDelayedUnmountProps) => {
  const [isMounted, setIsMounted] = useState(isVisible);
  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
    } else {
      setTimeout(() => {
        setIsMounted(false);
      }, delayTime);
    }
  }, [delayTime, isVisible]);
  return isMounted ? <Component {...(rest as P)} /> : null;
};

export default withDelayedUnmount;
