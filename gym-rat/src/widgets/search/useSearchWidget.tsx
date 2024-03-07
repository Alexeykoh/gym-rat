"use client";
import { WorkoutEndpoints } from "@/features/endpoints/workout.endpoints";
import { iSearch } from "@/lib/interfaces/Search.interface";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export default function useSearchWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const {
    data: searchData,
    refetch,
    isFetching: searchLoading,
  } = useQuery<iWorkout[]>({
    queryKey: ["useSearchWidget", value],
    queryFn: () => {
      return WorkoutEndpoints.find(value as string);
    },
  });

  const handleFocus = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };
  const handleBlur = () => {
    document.body.style.overflow = "visible";
    setIsOpen(false);
  };
  function searchRequest(value: string) {
    setValue(value);
    refetch();
  }
  const onSubmit: SubmitHandler<iSearch> = (data) => {
    // searchRequest(data);
  };
  return {
    setValue,
    refetch,
    searchLoading,
    searchData,
    onSubmit,
    isOpen,
    setIsOpen,
    handleFocus,
    handleBlur,
    searchRequest,
  };
}
