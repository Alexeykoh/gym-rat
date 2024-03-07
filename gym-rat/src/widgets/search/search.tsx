"use client";
import { iSearch } from "@/lib/interfaces/Search.interface";
import { useForm } from "react-hook-form";
import CloseSearchBtn from "./_UI/_close-search-btn";
import SearchButton from "./_UI/_search-button";
import SearchList from "./_UI/_search-list";
import useSearchWidget from "./useSearchWidget";

export default function Search() {
  const {
    searchLoading,
    searchData,
    onSubmit,
    isOpen,

    handleFocus,
    handleBlur,
    searchRequest,
  } = useSearchWidget();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<iSearch>();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={
        (isOpen
          ? " fixed z-50 w-screen h-screen top-0 left-0 bg-zinc-600/50 backdrop-blur-sm p-4 "
          : " rounded-2xl ") +
        " flex flex-col items-center justify-start bg-zinc-900 gap-8  "
      }
    >
      <label
        htmlFor=""
        className="flex justify-between bg-zinc-900 w-full rounded-2xl px-4 py-2"
      >
        <input
          {...register("value")}
          type="text"
          id="simple-search"
          autoComplete="off"
          onChange={(e) => {
            searchRequest(e.target.value);
          }}
          onFocus={handleFocus}
          className="  text-lg placeholder-gray-200/50 block w-full ps-2 p-2 bg-transparent text-white focus:outline-none "
          placeholder={"Найти тренировку?"}
          required
        />
        <div className="flex flex-row gap-4">
          <SearchButton isLoading={searchLoading} />
          <CloseSearchBtn isOpen={isOpen} handleBlur={handleBlur} />
        </div>
      </label>
      <SearchList
        isOpen={isOpen}
        searchLoading={searchLoading}
        searchData={searchData}
      />
    </form>
  );
}
