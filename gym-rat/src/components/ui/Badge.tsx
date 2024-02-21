import { FC } from "react";

export enum BadgeType {
  Info = " bg-blue-300 text-blue-800 border-blue-400 ",
  Error = " bg-red-300 text-red-800 border-red-400 ",
  Access = " bg-green-300 text-green-800 border-green-400 ",
  Warn = " bg-yellow-300 text-yellow-800 border-yellow-400 ",
  Normal = " bg-gray-300 text-gray-800 border-gray-400 ",
  Admin = " bg-lime-300 text-lime-800 border-lime-400 ",
}
type BadgeProps = {
  value: any;
  type: BadgeType;
};

const Badge: FC<BadgeProps> = ({ value, type }) => {
  return (
    <>
      <span className={type + " text-md font-medium me-2 px-2 py-1 rounded-xl w-fit"}>
        {value}
      </span>
    </>
  );
};

export default Badge;
