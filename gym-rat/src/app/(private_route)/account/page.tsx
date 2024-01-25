"use client";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";

type pageProps = {};

const Account: FC<pageProps> = () => {
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  //
  if (isAuth) {
    return (
      <>
        <button
          onClick={() => {
            signOut();
          }}
        >
          log out
        </button>
      </>
    );
  }
};

export default Account;
