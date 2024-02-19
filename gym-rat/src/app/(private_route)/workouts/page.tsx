"use client";
import CardLayout from "@/components/cardLayout/cardLayout";

import WorkoutForm from "@/components/forms/workout/WorkoutForm";
import ActionButton from "@/components/ui/ActionButton";
import PreLoader from "@/components/ui/PreLoader";
import Search from "@/components/ui/Search";
import Modal from "@/components/widgets/modal/Modal";
import WorkoutCard from "@/components/workoutCard/workoutCard";
import { iWorkout } from "@/models/workoutModel";
import axios from "axios";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import arm from "../../../../public/icons/arm.svg";

type pageProps = {};

const Workout: FC<pageProps> = () => {
  const { data, status }: any = useSession();
  //
  const [isVisible, setIsVisible] = useState(false);
  //
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [workouts, setWorkouts] = useState<iWorkout[]>([]);
  const [latest, setLatest] = useState<iWorkout | null>(null);
  const [next, setNext] = useState<iWorkout | null>(null);
  const [allWorkouts, setAllWorkouts] = useState<iWorkout[]>([]);
  const [isLoading, setLoading] = useState(true);

  function getLatest() {
    setLoading(true);
    fetch("/api/workouts/items?type=today")
      .then((res) => res.json())
      .then((data) => {
        setLatest(data?.message);
        setLoading(false);
      });
  }
  function getNext() {
    setLoading(true);
    fetch("/api/workouts/items?type=nextOne")
      .then((res) => res.json())
      .then((data) => {
        setNext(data?.message);
        setLoading(false);
      });
  }
  function getPrevious() {
    setLoading(true);
    fetch("/api/workouts/items?type=previous")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data?.message);
        setLoading(false);
      });
  }
  function getWorkouts() {
    axios.get("/api/workouts/items?type=all").then(({ data }) => {
      setAllWorkouts(data?.message);
    });
  }
  useEffect(() => {
    setIsVisible(true);
  }, []);
  useEffect(() => {
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
              getLatest();
              getNext();
              getPrevious();
            }}
            getWorkouts={getWorkouts}
          />
        </Modal>
      ) : null}
      <div className="fixed bottom-6 right-6">
        <ActionButton
          text={<Plus />}
          action={() => {
            setOpenModal(true);
          }}
        />
      </div>
      <Search />
      <div className={"grid grid-cols-1 lg:grid-cols-4 gap-8"}>
        {isLoading ? (
          <PreLoader />
        ) : (
          <>
            {!latest ? null : (
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
            )}
            {!next ? null : (
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-semibold">Next</h2>
                <CardLayout>
                  <WorkoutCard
                    icon={arm}
                    title={next?.name}
                    description={next?.description}
                    date={next?.date}
                    id={next?._id as string}
                  />
                </CardLayout>
              </div>
            )}
            {!workouts ? null : (
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-semibold">Previous</h2>
                {workouts?.map(({ date, description, name, _id }, ind) => {
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Workout;
