import { Loader } from "lucide-react";
import { FC } from "react";

type PreLoaderProps = {};

const PreLoader: FC<PreLoaderProps> = () => {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center fixed z-50 top-0 left-0 backdrop-blur-sm">
        <span className="animate-spin">
          <Loader size={64} />
        </span>
      </div>
    </>
  );
};

export default PreLoader;
