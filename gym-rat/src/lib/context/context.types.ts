import { ReactNode } from "react";

export type authContextType = {
  user: string | null;
  login: () => void;
  logout: () => void;
};

export type Props = {
  children: ReactNode;
};
