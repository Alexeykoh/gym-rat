"use client";

import { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "./store";

interface iProviders {
  children: ReactNode | string;
}

export function Providers({ children }: iProviders) {
  //
  return <Provider store={store}>{children}</Provider>;
}
