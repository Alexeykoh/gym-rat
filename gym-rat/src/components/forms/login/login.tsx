"use client";

import { FC, FormEvent, useState } from "react";

type loginProps = {};

const LoginForm: FC<loginProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      // Handle response if necessary
      const data = await response.json();
      // ...
    } catch (error: any) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-8 p-4">
        <h1 className="text-4xl font-bold">Log in</h1>
        <div className="flex flex-col w-full">
          <p className=" p-2">Email</p>
          <input
            className="rounded-xl text-black w-full p-3"
            type="text"
            name="email"
            placeholder="Email..."
          />
        </div>
        <div className="flex flex-col w-full">
          <p className=" p-2">Password</p>
          <input
            className="rounded-xl text-black w-full p-3"
            type="text"
            name="password"
            placeholder="Password..."
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-lime-400 p-3 mt-4 rounded-xl text-xl text-black"
        >
          {isLoading ? "Loading..." : "Log in"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
