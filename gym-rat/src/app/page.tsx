import connectMongoDB from "@/lib/mongodb";
import Link from "next/link";

export default function Home() {
  connectMongoDB();
  return (
    <div className="flex flex-col gap-6 w-full justify-center items-center">
      <Link
        className="bg-lime-400 p-3 mt-4 rounded-xl text-xl text-black w-fit text-center max-w-96 min-w-40"
        href={"/sign-in"}
      >
        Log in
      </Link>
      <Link
        className="bg-lime-400 p-3 mt-4 rounded-xl text-xl text-black w-fit text-center max-w-96 min-w-40"
        href={"/sign-up"}
      >
        Registration
      </Link>
    </div>
  );
}
