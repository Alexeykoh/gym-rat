import { ArrowLeft } from "lucide-react";
import { FC } from "react";

type BackButtonProps = { busy?: boolean; action?: any };

const BackButton: FC<BackButtonProps> = ({ busy, action }) => {
  return (
    <>
      <button
        onClick={() => {
          if (action) {
            action();
          }
        }}
        className="p-4 rounded-2xl bg-slate-600 w-fit h-fit"
      >
        <ArrowLeft />
      </button>
    </>
  );
};

export default BackButton;
