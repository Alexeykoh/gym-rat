import { FieldValues, UseFormRegister } from "react-hook-form";

interface iSearchInput {
  placeholder: string;
  register: UseFormRegister<FieldValues>;
}

export default function SearchInput({ placeholder, register }: iSearchInput) {
  return (
    <input
      {...register("searchData")}
      type="text"
      id="simple-search"
      className=" text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2 bg-transparent placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      required
    />
  );
}
