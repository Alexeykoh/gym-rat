import LoaderSpinner from "@/shared/ui/loaders/loader.spinner";
import { Search } from "lucide-react";

interface iSearchButton {
  isLoading: boolean;
}
export default function SearchButton({ isLoading }: iSearchButton) {
  return (
    <button
      type="submit"
      className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 "
    >
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <Search className="text-gray-400/50 font-semibold" />
      )}
    </button>
  );
}
