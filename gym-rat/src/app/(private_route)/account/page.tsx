"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import infoIcon from "../../../../public/icons/Info.svg";
import logOutIcon from "../../../../public/icons/LogOut.svg";
import privacyIcon from "../../../../public/icons/Privacy.svg";
import mainIcon from "../../../../public/icons/gym-rat-icon.png";
import userIcon from "../../../../public/icons/userInfo.svg";
//
interface UserData {
  name?: string | null;
  email?: string | null;
  role?: string | null; // Add the role property here
  // Add any other properties you expect to receive
}

export default function Account() {
  const { data } = useSession();
  const { name, email, role }: UserData = data?.user || {};
  //
  return (
    <>
      <div className="w-full flex flex-col gap-8 items-center justify-between max-w-96 self-center pt-4">
        <div className="flex flex-col gap-2 items-center w-full">
          <div className="min-w-40 min-h-40 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
            <Image src={mainIcon} alt={"icon"} width={180} height={180} />
          </div>
          <p className="text-3xl max-w-2/3">{name}</p>
          <p className="text-1xl max-w-2/3 text-gray-400">{email}</p>
          {role === "admin" && (
            <Link
              className="py-2 px-4 text-black bg-lime-400 rounded-xl"
              href={"/admin/types"}
            >
              {role}
            </Link>
          )}
        </div>
        <div className="w-full bg-gray-600 rounded-2xl p-4 flex flex-col gap-4 ">
          <div className="flex gap-2 items-center">
            <Image className="fill-white" src={userIcon} alt={"userIcon"} />
            <p>Personal info</p>
          </div>
        </div>
        <div className="w-full bg-gray-600 rounded-2xl p-4 flex flex-col gap-4 ">
          <div className="flex gap-2 items-center">
            <Image className="fill-white" src={privacyIcon} alt={"userIcon"} />
            <p>Privacy</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="fill-white" src={infoIcon} alt={"userIcon"} />
            <p>About</p>
          </div>
        </div>

        <div className="w-full bg-gray-600 rounded-2xl p-4 flex flex-col gap-4 ">
          <button
            onClick={() => {
              signOut();
              redirect("/sign-in");
            }}
            className="flex gap-2 items-center"
          >
            <Image className="fill-white" src={logOutIcon} alt={"userIcon"} />
            <p className="">Log out</p>
          </button>
        </div>
      </div>
    </>
  );
}
