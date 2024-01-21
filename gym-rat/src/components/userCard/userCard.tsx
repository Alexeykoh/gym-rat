import { FC } from "react";

type userCardProps = {};

const UserCard: FC<userCardProps> = () => {
  return (
    <>
      <div className="bg-gray-600/50 px-4 py-4 rounded-3xl flex justify-between gap-4 items-center w-full">
        <div className="icon min-w-16 min-h-16 rounded-full bg-gray-300"></div>
        <div className="flex flex-col gap-1 w-full">
          <p className="text-xl">First_name</p>
          <p className="opacity-45">Second_name</p>
        </div>
      </div>
    </>
  );
};

export default UserCard;
