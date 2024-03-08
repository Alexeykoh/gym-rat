import { Props } from "next/script";
import { createContext, useContext, useState } from "react";
import { authContextType } from "./context.types";

const authContextDefaultValues: authContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<boolean | null>(null);

  const login = () => {
    setUser(true);
  };

  const logout = () => {
    setUser(false);
  };

  const value = {
    user,
    login,
    logout,
  };
  return (
    <>
      <AuthContext.Provider value={value as authContextType}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
