"use client";
import { useForm } from "react-hook-form";
import SearchButton from "./_UI/search-button";
import SearchInput from "./_UI/search-input";

export default function Search() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    console.log("onSubmit search", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center max-w-96 w-full self-center bg-zinc-900 rounded-2xl px-4 py-2"
    >
      <SearchInput placeholder={"Найти тренировку?"} register={register} />
      <SearchButton />
    </form>
  );
}
