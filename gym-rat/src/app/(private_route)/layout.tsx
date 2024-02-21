"use client";
import Header from "@/components/header/header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../GlobalRegux/store";
import axios from "axios";

type layoutProps = {
  children: ReactNode | string;
};

/**
 * PrivateLayout component renders the layout for private/authenticated routes.
 *
 * It checks the session status and redirects to sign-in if unauthenticated.
 * Dispatches redux actions to fetch exercise data on initial load.
 * Renders the <Header/> and <main> content.
 */
export default function PrivateLayout({ children }: layoutProps) {
  const { status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  //
  if (status !== "authenticated" && status !== "loading") {
    redirect("/sign-in");
  } else {
    // dispatch(fetchTypes());
    // dispatch(fetchExerciseItems());
    // dispatch(workouts());
  }
  //
  return (
    <>
      <main className="container p-4 mx-auto flex flex-col w-full">
        <Header />
        {children}
      </main>
    </>
  );
}
