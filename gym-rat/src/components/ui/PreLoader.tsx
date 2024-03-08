import { Loader } from "lucide-react";

export default function PreLoader() {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center fixed z-50 top-0 left-0 backdrop-blur-sm duration-700">
        <span className="animate-spin">
          <Loader size={64} />
        </span>
      </div>
    </>
  );
}
