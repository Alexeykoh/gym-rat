import { FC } from "react";

type cardLayoutProps = { children?: string | JSX.Element | JSX.Element[] };

const CardLayout: FC<cardLayoutProps> = ({ children }) => {
  return (
    <div className="bg-zinc-900 px-4 py-4 rounded-2xl flex justify-between gap-4 items-center w-full max-w-96">
      {children}
    </div>
  );
};

export default CardLayout;
