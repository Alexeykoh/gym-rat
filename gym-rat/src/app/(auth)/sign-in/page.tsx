import LoginForm from "@/features/forms/loginForm/login-form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
      <LoginForm />
      <Link
        className="text-gray-500 hover:text-gray-400 duration-150"
        href={"/sign-up"}
      >
        Create a new account? <span className="font-semibold">Sign up</span>
      </Link>
    </div>
  );
}
