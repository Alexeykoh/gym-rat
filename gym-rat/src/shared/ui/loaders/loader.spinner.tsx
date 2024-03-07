import { Loader } from "lucide-react";

interface iLoaderSpinner {
  size?: number;
}

export default function LoaderSpinner({ size = 24 }: iLoaderSpinner) {
  return (
    <span className="w-fit h-full flex items-center justify-center">
      <span className="animate-spin">
        <Loader size={size} />
      </span>
    </span>
  );
}
