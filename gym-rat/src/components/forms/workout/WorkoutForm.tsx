"use client";
import ActionButton from "@/shared/ui/buttons/ActionButton";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";

type workoutFormProps = {
  modalAction(): void;
  getWorkouts(): void;
};

const WorkoutForm: FC<workoutFormProps> = ({ modalAction, getWorkouts }) => {
  const currentDate = new Date().toISOString().substring(0, 10);
  const [busy, setBusy] = useState(false);
  const { data, status }: any = useSession();
  const userId = data?.user?.id;
  //
  const [workoutData, setWorkoutData] = useState({
    user_id: userId,
    name: "new workout...",
    description: "",
    date: currentDate,
  });
  //
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setWorkoutData({
      ...workoutData,
      [name]: value,
    });
  };
  //
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //
    setBusy(true);
    const res = await fetch("/api/workouts/items", {
      method: "POST",
      body: JSON.stringify(workoutData),
    }).then((res) => {
      setBusy(false);
      modalAction();
      getWorkouts();
    });
  };
  //
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-96 w-full"
    >
      <h1 className="text-4xl font-bold">
        New <br /> Workout
      </h1>
      <div className="flex flex-col w-full">
        <label className="p-2">Name</label>
        <input
          className="rounded-xl text-black w-full p-3"
          type="text"
          name="name"
          placeholder="type workout name..."
          value={workoutData.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="p-2">Description</label>
        <input
          className="rounded-xl text-black w-full p-3"
          type="text"
          name="description"
          placeholder="type description..."
          value={workoutData.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="p-2">Description</label>
        <input
          className="rounded-xl text-black w-full p-3"
          type="date"
          name="date"
          value={workoutData.date}
          onChange={handleChange}
          required={true}
        />
      </div>
      <ActionButton text={"Start workout"} busy={busy} />
    </form>
  );
};

export default WorkoutForm;
