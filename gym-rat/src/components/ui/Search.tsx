import { FC } from "react";

type SearchProps = {};

const Search: FC<SearchProps> = () => {
  return (
    <>
      <form className="flex items-center max-w-96 w-full self-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="w-full">
          <input
            type="text"
            id="simple-search"
            className="border border-gray-500/50 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5  bg-transparent placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search workout ..."
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gray-500/50 p-2.5 ms-2 text-sm font-medium text-white  rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 "
        >
          <svg
            className="w-4 h-4"
            // aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </>
  );
};

export default Search;
