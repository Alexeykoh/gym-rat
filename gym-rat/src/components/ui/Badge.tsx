import { FC } from "react";

export enum BadgeType {
  Info = " bg-blue-100 text-blue-800 border-blue-400 ",
  Error = " bg-red-100 text-red-800 border-red-400 ",
  Access = " bg-green-100 text-green-800 border-green-400 ",
  Warn = " bg-yellow-100 text-yellow-800 border-yellow-400 ",
  Normal = " bg-gray-100 text-gray-800 border-gray-400 ",
}
type BadgeProps = {
  value: any;
  type: BadgeType;
};

const Badge: FC<BadgeProps> = ({ value, type }) => {
  return (
    <>
      <span
        className={type + " text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl w-fit"}
      >
        {value}
      </span>
    </>
  );
};

export default Badge;
