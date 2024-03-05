"use client";
import { iSearch } from "@/lib/interfaces/Search.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchButton from "./_UI/search-button";

export default function Search() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<iSearch>();

  const onSubmit: SubmitHandler<iSearch> = (data) => {
    console.log("onSubmit search", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center max-w-96 w-full self-center bg-zinc-900 rounded-2xl px-4 py-2"
    >
      <input
        {...register("value")}
        type="text"
        id="simple-search"
        className=" text-2xl placeholder-rose-200/50 block w-full ps-2 p-2 bg-transparent text-white "
        placeholder={"Найти тренировку?"}
        required
      />

      <SearchButton />
    </form>
  );
}
