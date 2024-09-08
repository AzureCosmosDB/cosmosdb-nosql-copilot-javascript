import { useEffect, RefObject } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useScrollToBottom(ref: RefObject<HTMLDivElement>, dependency: any[]) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dependency]);
}

export default useScrollToBottom;
