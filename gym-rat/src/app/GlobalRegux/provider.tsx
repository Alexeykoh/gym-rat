"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface iProviders {
  children: ReactNode | string;
}

export function Providers({ children }: iProviders) {
  return <Provider store={store}>{children}</Provider>;
}
