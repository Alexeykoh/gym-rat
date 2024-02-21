"use client";
import CardLayout from "@/components/cardLayout/cardLayout";

import { AppDispatch } from "@/app/GlobalRegux/store";
import WorkoutForm from "@/components/forms/workout/WorkoutForm";
import ActionButton from "@/components/ui/ActionButton";
import AdditionalButton from "@/components/ui/AdditionalButton";
import Search from "@/components/ui/Search";
import Modal from "@/components/widgets/modal/Modal";
import WorkoutCard from "@/components/workoutCard/workoutCard";
import { iWorkout } from "@/models/workoutModel";
import axios from "axios";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import arm from "../../../../public/icons/arm.svg";

type pageProps = {};

interface iLatestWorkouts {
  items: iWorkout[];
  currentPage: number;
  totalPages: number;
}

function Workout() {
  const { data, status }: any = useSession();
  const dispatch = useDispatch<AppDispatch>();
  // const latestWorkoutsData = useSelector(
  //   (state: RootState) => state.workouts.entities
  // );
  //
  const [isVisible, setIsVisible] = useState(false);
  const [busy, setBusy] = useState<boolean>(false);
  //
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [workouts, setWorkouts] = useState<iWorkout[]>([]);
  const [latest, setLatest] = useState<iWorkout | null>(null);
  const [latestWorkouts, setLatestWorkouts] = useState<iLatestWorkouts | null>(
    null
  );
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
  function getWorkoutsByPage(page: number) {
    axios.get("/api/workouts/items?page=" + page).then(({ data }: any) => {
      setLatestWorkouts(data?.message);
      console.log("getWorkoutsByPage", data?.message);
    });
  }

  function loadMoreExercises() {
    setBusy(true);
    const nextPage = Number(latestWorkouts?.currentPage) + 1;
    if (nextPage < Number(latestWorkouts?.totalPages as number)) {
      axios
        .get("/api/workouts/items?page=" + nextPage)
        .then(({ data }: any) => {
          const newItems = latestWorkouts?.items.concat(data.message.items);
          const newData = { ...data.message, items: newItems };
          setLatestWorkouts(newData);
          setBusy(false);
        });
    }
  }
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    getLatest();
    getNext();
    getPrevious();
    getWorkoutsByPage(1);
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
      <div className={"grid grid-cols-1 gap-8"}>
        {
          <>
            {!latest ? null : (
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-semibold">Сегодня</h2>
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
                <h2 className="text-4xl font-semibold">Следующие</h2>
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
            {!latestWorkouts ? null : (
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-semibold">Предыдущие</h2>
                {/* <p>{latestWorkoutsData?.currentPage}</p> */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {latestWorkouts?.items.map(
                    ({ date, description, name, _id }, ind) => {
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
                    }
                  )}
                </div>
                {Number(latestWorkouts?.currentPage) <
                Number(latestWorkouts?.totalPages - 1) ? (
                  <AdditionalButton
                    busy={busy}
                    text={"Показать еще "}
                    action={() => {
                      loadMoreExercises();
                    }}
                  />
                ) : null}
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
}

export default Workout;
