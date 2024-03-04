"use client";

import { ModalContext } from "@/lib/context/modal-context";
import { UserContext } from "@/lib/context/user-context";
import { errorHandler } from "@/lib/helpers";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import { WorkoutService } from "@/services/workouts.service";
import { AxiosError } from "axios";
import { useContext, useState } from "react";

export default function UseWorkoutCreateSubmit() {
  const [reqLoad, setReqLoad] = useState<boolean>(false);
  const { closeModal } = useContext(ModalContext);
  const user = useContext(UserContext);
  const currentDate = new Date().toISOString().split("T")[0];
  const [error, setError] = useState<string>("");

  const onSubmit = async (data: iWorkout) => {
    console.log("user 243", user?.userData?._id);
    setReqLoad(true);
    try {
      await WorkoutService.postWorkout({
        ...data,
        user_id: user?.userData?._id as string,
      });
      closeModal();
      setReqLoad(false);
    } catch (error: unknown) {
      setError(errorHandler(error as AxiosError<{ error: string }>).error);
      setReqLoad(false);
    }
  };

  return { onSubmit, reqLoad, currentDate, error };
}
