"use client";
import CardLayout from "@/components/cardLayout/cardLayout";

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
import arm from "../../../../public/icons/arm.svg";

type pageProps = {};

interface iLatestWorkouts {
  items: iWorkout[];
  currentPage: number;
  totalPages: number;
}

function Workout() {
  const { data, status }: any = useSession();
  // const dispatch = useDispatch<AppDispatch>();
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
  async function getNext() {
    setLoading(true);
    const res = await fetch("/api/workouts/items?type=nextOne")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        return data.message;
      });
    return res;
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
  async function getExerciseTypes() {
    const res = axios.get("/api/exercises/types").then(({ data }) => {
      return data.message;
    });
    return res;
  }
  async function getExerciseItems() {
    const res = axios.get("/api/exercises/items").then(({ data }) => {
      return data.message;
    });
    return res;
  }

  function getWorkouts() {
    axios.get("/api/workouts/items?type=all").then(({ data }) => {
      setAllWorkouts(data?.message);
    });
  }
  async function getWorkoutsByPage(page: number) {
    const res = await axios
      .get("/api/workouts/items?page=" + page)
      .then(({ data }: any) => {
        return data.message;
      });
    return res;
  }

  async function store( // todo: исправить на localStore
    name: string,
    fetchData: () => Promise<any>,
    toState: any
  ) {
    let storedData = localStorage.getItem(name);
    //
    if (!storedData) {
      // Fetch data if local storage is empty
      const data = await fetchData();
      if (toState) {
        toState(data);
      }
      localStorage.setItem(name, JSON.stringify(data));
      console.log("Data fetched and stored in local storage:", data);
    } else {
      // Fetch data again if local storage is not empty
      console.log("Data already exists in local storage. Fetching again...");
      if (toState) {
        toState(JSON.parse(storedData));
      }
      const data = await fetchData();
      console.log("name", name, data);
      if (toState) {
        toState(data);
      }
      localStorage.setItem(name, JSON.stringify(data));
      console.log("Data re-fetched and updated in local storage:", data);
    }
  }
  //
  async function loadMoreExercises() {
    const nextPage = Number(latestWorkouts?.currentPage) + 1;
    if (nextPage < Number(latestWorkouts?.totalPages as number)) {
      return axios
        .get("/api/workouts/items?page=" + nextPage)
        .then(({ data }: any) => {
          const newItems = latestWorkouts?.items.concat(data.message.items);
          const newData = { ...data.message, items: newItems };
          return newData;
        });
    }
  }
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    getLatest();
    // getNext();
    getPrevious();
    store(
      "latestWorkouts",
      async () => getWorkoutsByPage(1),
      setLatestWorkouts
    );
    store("nextWorkout", async () => getNext(), setNext); // todo: исправить на localStore
    store("exerciseTypes", async () => getExerciseTypes(), null); // todo: исправить на localStore
    store("exerciseItems", async () => getExerciseItems(), null); // todo: исправить на localStore
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
                      store(
                        "latestWorkouts",
                        async () => loadMoreExercises(),
                        setLatestWorkouts
                      );
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
