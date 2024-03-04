import { MutableRefObject, useEffect, useState } from "react";
interface iUseIntersection {
  element: MutableRefObject<HTMLButtonElement | null> | undefined;
  rootMargin: string;
}
export function useIntersection({ element, rootMargin }: iUseIntersection) {
  const [isVisible, setState] = useState<boolean>(false);

  useEffect(() => {
    const current = element?.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );
    current && observer?.observe(current);

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [element, rootMargin]);

  return isVisible;
}
