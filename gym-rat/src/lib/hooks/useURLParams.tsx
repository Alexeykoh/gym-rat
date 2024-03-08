"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useURLParams(parameter: string) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(parameter, value);
      return params.toString();
    },
    [searchParams]
  );

  function get() {
    return searchParams.get(parameter);
  }
  function set(value: string) {
    router.push(pathname + "?" + createQueryString(value));
  }
  function del() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(parameter);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    router.push(newUrl);
  }
  function includes(value: string) {
    return searchParams.has(value);
  }
  return { get, set, includes, del };
}
