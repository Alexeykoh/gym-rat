import { iUserData } from "@/lib/interfaces/User.interface";
import { iUserService } from "@/lib/interfaces/UserService.interface";
import axios, { AxiosResponse } from "axios";
import { signIn } from "next-auth/react";

export const UserService = {
  login: async ({ email, password }: iUserService) => {
    const loinResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    }).catch((err) => {
      console.error(err);
    });
    return loinResponse;
  },
  getUserByEmail: async (email: string): Promise<iUserData | null> => {
    try {
      const response: AxiosResponse<iUserData> = await axios.get(
        `/api/users/one?email=${email}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  },
};
