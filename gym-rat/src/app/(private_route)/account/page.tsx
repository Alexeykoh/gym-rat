"use client";
import { useNavContext } from "@/lib/context/nav-context";
import BentoBox from "@/shared/ui/bento-grid/bento-box";
import BentoCell from "@/shared/ui/bento-grid/bento-cell";
import {
  enumBentoCellHeight,
  enumBentoCellWidth,
} from "@/shared/ui/bento-grid/bento.interface";
import { Gauge, PersonStanding } from "lucide-react";
//

export default function Account() {
  const {} = useNavContext("account");
  return (
    <>
      <BentoBox>
        <BentoCell
          size={{ w: enumBentoCellWidth.w1, h: enumBentoCellHeight.h1 }}
        >
          <div className="flex flex-col gap-2">
            <p>Вес</p>
            <Gauge />
          </div>
        </BentoCell>
        <BentoCell
          size={{ w: enumBentoCellWidth.w2, h: enumBentoCellHeight.h1 }}
        >
          <div className="flex flex-col gap-2 items-center">
            <p>Норма ккал.</p>
            <PersonStanding />
          </div>
        </BentoCell>
        <BentoCell
          size={{ w: enumBentoCellWidth.w2, h: enumBentoCellHeight.h1 }}
        >
          <div className="flex flex-col gap-2">
            <p>Вес</p>
            <Gauge />
          </div>
        </BentoCell>
        <BentoCell
          size={{ w: enumBentoCellWidth.w1, h: enumBentoCellHeight.h1 }}
        >
          <div className="flex flex-col gap-2">
            <p>Вес</p>
            <Gauge />
          </div>
        </BentoCell>
      </BentoBox>

      {/* <div className="w-full flex flex-col gap-8 items-center justify-between max-w-96 self-center pt-4">
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
      </div> */}
    </>
  );
}
