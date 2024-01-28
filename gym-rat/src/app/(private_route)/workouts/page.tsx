"use client";
import CardLayout from "@/components/cardLayout/cardLayout";

import WorkoutForm from "@/components/forms/workout/WorkoutForm";
import Modal from "@/components/widgets/modal/Modal";
import WorkoutCard from "@/components/workoutCard/workoutCard";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import arm from "../../../../public/icons/arm.svg";

type pageProps = {};

const Workout: FC<pageProps> = () => {
  const { data, status }: any = useSession();
  //
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  function getWorkouts() {
    setLoading(true);
    fetch("/api/workout")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data?.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    getWorkouts();
  }, []);
  //
  return (
    <div className="flex flex-col gap-4 w-full pb-16">
      {openModal ? (
        <Modal
          close={() => {
            setOpenModal(false);
          }}
        >
          <WorkoutForm
            modalAction={() => {
              setOpenModal(false);
            }}
            getWorkouts={getWorkouts}
          />
        </Modal>
      ) : null}
      <button
        onClick={() => {
          setOpenModal(true);
        }}
        className="px-4 py-2 fixed bottom-4 left-1/2 -translate-x-1/2 bg-lime-500 rounded-2xl z-20 text-black shadow-lg"
      >
        add workout
      </button>
      <form className="flex items-center pb-4 max-w-96 w-full self-center">
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {!workouts ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <>
            {workouts.map(({ date, description, name, _id }, ind) => {
              const workoutDate = new Date(date);
              // console.log(workoutDate.toLocaleString());
              return (
                <CardLayout key={ind}>
                  <WorkoutCard
                    icon={arm}
                    title={name}
                    description={description}
                    date={date}
                    id={_id}
                  />
                </CardLayout>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Workout;
