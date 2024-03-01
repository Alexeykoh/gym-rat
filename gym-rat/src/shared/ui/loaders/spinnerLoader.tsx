import { Loader } from "lucide-react";

interface iSpinnerLoader {
  size: number;
}

export default function SpinnerLoader({ size }: iSpinnerLoader) {
  return (
    <span className="w-full h-full flex items-center justify-center">
      <span className="animate-spin">
        <Loader size={size} />
      </span>
    </span>
  );
}
