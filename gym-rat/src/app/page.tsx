import CardLayout from "@/components/cardLayout/cardLayout";
import UserCard from "@/components/userCard/userCard";
// import { connectToDb } from "@/lib/mongodb";

export default function Home() {
  // connectToDb();
  return (
    <div className="flex flex-col gap-6 w-full">
      <UserCard />
      <div className="grid grid-cols-2 gap-4">
        <CardLayout>
          <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
            <div className="rounded-full bg-gray-200 w-32 h-32 flex items-center justify-center border-4 border-solid border-lime-600/50">
              <p className="text-5xl text-black">
                100<span className="text-lime-500 text-2xl">kg</span>
              </p>
            </div>
            <p>current weight</p>
          </div>
        </CardLayout>
        <CardLayout></CardLayout>
        <CardLayout></CardLayout>
        <CardLayout></CardLayout>
      </div>
    </div>
  );
}
