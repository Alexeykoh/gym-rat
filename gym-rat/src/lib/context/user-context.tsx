"use client";
import { UserEndpoints } from "@/features/endpoints/user.endpoints";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createContext } from "react";
import { iUserData } from "../interfaces/User.interface";

interface MyContextType {
  userData: iUserData | null | undefined;
}

// Create a context object with the specified type
export const UserContext = createContext<MyContextType | undefined>(undefined);

// This is a provider component
export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const { data: userData } = useQuery<iUserData | null>({
    queryKey: ["UserService.getUserByEmail"],
    enabled: status !== "loading",
    queryFn: async () =>
      await UserEndpoints.getUserByEmail(session?.user?.email as string),
  });

  const sharedState: MyContextType = {
    userData,
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
}
