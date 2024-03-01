import { Search } from "lucide-react";

export default function SearchButton() {
  return (
    <button
      type="submit"
      className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 "
    >
      <Search />
    </button>
  );
}
