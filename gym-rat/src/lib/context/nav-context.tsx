"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const NavContext = createContext<any>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [navState, setNavState] = useState<any | undefined>(undefined);
  console.log("NavProvider", navState);
  return (
    <NavContext.Provider value={{ navState, setNavState }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNavContext(value: string) {
  const { navState, setNavState } = useContext(NavContext);
  useEffect(() => {
    setNavState(value);
  }, []);
  return { navState, setNavState };
}
