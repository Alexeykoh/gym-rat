"use client";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import ActionButton from "@/shared/ui/buttons/ActionButton";
import { useForm } from "react-hook-form";
import UseWorkoutCreateSubmit from "./_useWorkoutCreateSubmit";

interface iWorkoutCreateForm {}

export default function WorkoutCreateForm({}: iWorkoutCreateForm) {
  const { onSubmit, reqLoad, currentDate, error } = UseWorkoutCreateSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iWorkout>();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-96 w-full flex flex-col gap-8 p-4"
    >
      <h2 className="text-4xl font-bold flex gap-4 items-center">
        Добавить новую тренировку
      </h2>
      <div className="flex flex-col w-full">
        <label>Название</label>
        <input
          defaultValue="Новая тренировка"
          type="text"
          className="rounded-xl text-black w-full p-3"
          {...register("name", {
            required: "Обязательное поле",
          })}
        />
        {errors.name && (
          <span className="text-red-400">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col w-full">
        <label>Описание</label>
        <input
          type="text"
          className="rounded-xl text-black w-full p-3"
          {...register("description")}
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Дата</label>
        <input
          defaultValue={currentDate}
          type="date"
          className="rounded-xl text-black w-full p-3"
          {...register("date")}
        />
        {errors.date && (
          <span className="text-red-400">{errors.date.message}</span>
        )}
      </div>
      <ActionButton
        busy={reqLoad}
        text={"Добавить"}
        color=" bg-zinc-800 text-rose-400 "
        type="submit"
      />
      {error && <span className="text-red-400">{error}</span>}
    </form>
  );
}
