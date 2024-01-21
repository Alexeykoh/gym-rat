import { FC } from "react";

type cardLayoutProps = { children?: string | JSX.Element | JSX.Element[] };

const CardLayout: FC<cardLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-600/50 px-4 py-4 rounded-2xl flex justify-between gap-4 items-center w-full h-full">
      {children}
    </div>
  );
};

export default CardLayout;
