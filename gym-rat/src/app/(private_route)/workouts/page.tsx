"use client";
import CardLayout from "@/components/cardLayout/cardLayout";

import WorkoutForm from "@/components/forms/workout/WorkoutForm";
import Search from "@/components/ui/Search";
import Modal from "@/components/widgets/modal/Modal";
import WorkoutCard from "@/components/workoutCard/workoutCard";
import { iWorkout } from "@/models/workoutModel";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import arm from "../../../../public/icons/arm.svg";

type pageProps = {};

const Workout: FC<pageProps> = () => {
  const { data, status }: any = useSession();
  //
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [workouts, setWorkouts] = useState<iWorkout[]>([]);
  const [latest, setLatest] = useState<iWorkout | null>(null);
  const [next, setNext] = useState<iWorkout[]>([]);
  const [isLoading, setLoading] = useState(true);

  function getWorkouts() {
    setLoading(true);
    fetch("/api/workout/all")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data?.message);
        setLoading(false);
      });
  }
  function getLatest() {
    setLoading(true);
    fetch("/api/workout/latest")
      .then((res) => res.json())
      .then((data) => {
        setLatest(data?.message);
        setLoading(false);
      });
  }
  function getNext() {
    setLoading(true);
    fetch("/api/workout/next")
      .then((res) => res.json())
      .then((data) => {
        setNext(data?.message);
        setLoading(false);
      });
  }
  function getPrevious() {
    setLoading(true);
    fetch("/api/workout/previous")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data?.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    getWorkouts();
    getLatest();
    getNext();
    getPrevious();
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
      <Search />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {isLoading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-semibold">Today</h2>
              {!latest ? null : (
                <CardLayout>
                  <WorkoutCard
                    icon={arm}
                    title={latest.name}
                    description={latest.description}
                    date={latest.date}
                    id={latest._id as string}
                  />
                </CardLayout>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-semibold">Next</h2>
              {next.map(({ date, description, name, _id }, ind) => {
                return (
                  <CardLayout key={ind}>
                    <WorkoutCard
                      icon={arm}
                      title={name}
                      description={description}
                      date={date}
                      id={_id as string}
                    />
                  </CardLayout>
                );
              })}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-semibold">Previous</h2>
              {workouts.map(({ date, description, name, _id }, ind) => {
                return (
                  <CardLayout key={ind}>
                    <WorkoutCard
                      icon={arm}
                      title={name}
                      description={description}
                      date={date}
                      id={_id as string}
                    />
                  </CardLayout>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Workout;
