import { Loader } from "lucide-react";

interface iLoaderSpinner {
  size: number;
}

export default function LoaderSpinner({ size }: iLoaderSpinner) {
  return (
    <span className="w-full h-full flex items-center justify-center">
      <span className="animate-spin">
        <Loader size={size} />
      </span>
    </span>
  );
}
