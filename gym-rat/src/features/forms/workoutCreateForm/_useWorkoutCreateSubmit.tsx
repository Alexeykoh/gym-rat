"use client";

import { WorkoutService } from "@/features/services/workouts.service";
import { ModalContext } from "@/lib/context/modal-context";
import { UserContext } from "@/lib/context/user-context";
import { errorHandler } from "@/lib/helpers";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext, useState } from "react";

export default function UseWorkoutCreateSubmit() {
  const queryClient = useQueryClient();
  const [reqLoad, setReqLoad] = useState<boolean>(false);
  const { closeModal } = useContext(ModalContext);
  const user = useContext(UserContext);
  const currentDate = new Date().toISOString().split("T")[0];
  const [error, setError] = useState<string>("");

  const putWorkout = useMutation({
    mutationKey: ["useLoadMoreWorkouts"],
    mutationFn: async (data: iWorkout) => {
      await WorkoutService.postWorkout({
        ...data,
        user_id: user?.userData?._id as string,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries([
        "useLoadMoreWorkouts",
      ] as InvalidateQueryFilters);
    },
  });

  const onSubmit = async (data: iWorkout) => {
    setReqLoad(true);
    try {
      putWorkout.mutate(data);
      closeModal();
      setReqLoad(false);
    } catch (error: unknown) {
      setError(errorHandler(error as AxiosError<{ error: string }>).error);
      setReqLoad(false);
    }
  };

  return { onSubmit, reqLoad, currentDate, error };
}
