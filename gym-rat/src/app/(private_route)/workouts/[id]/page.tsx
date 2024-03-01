"use client";

import BackButton from "@/components/ui/BackButton";
import ContextMenu from "@/components/ui/ContextMenu";
import PreLoader from "@/components/ui/PreLoader";
import WorkoutExercise from "@/components/ui/WorkoutExercise";
import { iMeasureEnum } from "@/lib/interfaces/ExerciseOrder.interface";
import { iWorkoutExercises } from "@/lib/interfaces/WorkoutExercise.interface";
import { iWorkoutExerciseType } from "@/lib/interfaces/WorkoutExerciseType.interface";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import ActionButton from "@/shared/ui/buttons/ActionButton";
import axios from "axios";
import { Plus, Settings, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { FC, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

type WorkoutPageProps = {
  params: { id: string };
};

const WorkoutPage: FC<WorkoutPageProps> = ({ params }) => {
  //
  const [loading, setLoading] = useState<boolean>(false);
  const [context, setContext] = useState<boolean>(false);
  const [workout, setWorkout] = useState<iWorkout | null>(null);
  const [types, setTypes] = useState<iWorkoutExerciseType[]>([]);
  const [exercises, setExercises] = useState<iWorkoutExercises[]>(
    JSON.parse(
      localStorage.getItem("localWorkouts") as any
    )?.storeObject?.exercises.filter(
      (el: any) => el.workout_id === params.id
    ) || []
  );
  //
  const router = useRouter();
  const currentDate = new Date().toISOString();
  //

  async function getTypes() {
    fetch("/api/exercises/types")
      .then((res) => res.json())
      .then((data) => {
        setTypes(data?.message);
      });
  }
  async function getWorkout() {
    return axios.get("/api/workouts/items/" + params.id).then(({ data }) => {
      return data?.message;
    });
  }
  function getWorkoutExercises() {
    return axios
      .get("/api/workouts/exercises/" + params.id)
      .then(({ data }) => {
        return data?.message.sort((a: any, b: any) => {
          return a.order - b.order;
        });
      });
  }
  async function editWorkout(el: iWorkout) {
    const data: iWorkout = {
      name: (prompt("Enter new name:", el.name) as string) || el.name,
      description:
        (prompt("Enter new description:", el.description) as string) ||
        el.description,
      user_id: "",
      date: currentDate,
    };
    const update = await fetch("/api/exercises/items/" + el._id, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((data: any) => data.json())
      .then((res) => {
        // getExercise();
        // setLoading(false);
      });
  }
  function removeWorkout(id: string) {
    const answer = window.confirm("are you sure?");
    if (!answer) {
      return;
    }
    axios.delete("/api/workouts/items/" + id).then(({ data }) => {
      router.push(`/workouts`);
    });
  }
  function removeExercise(id: any) {
    const answer = window.confirm("are you sure?");
    if (!answer) {
      return;
    }
    axios.delete("/api/workouts/exercises/" + id).then(({ data }) => {
      console.log(data);
      getWorkoutExercises();
    });
  }

  //
  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(exercises);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const newItems = items.map((el, index) => {
      return { ...el, order: index };
    });
    //
    newItems.forEach((el, index) => {
      axios
        .put("/api/workouts/exercises/" + el._id + "/order", { ...el })
        .then(({ data }) => {});
    });
    //
    setExercises(newItems);
  }
  //
  function getStyle(style: any, snapshot: any) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: `1.500s`,
    };
  }
  //
  function createNewOrder(id: string) {
    const orderData: iOrder = {
      exercise_id: id,
      amount: 0,
      order: 0,
      measure: iMeasureEnum.kg,
    };
    console.log("api/workouts/exercises/" + id + "/order");
    axios
      .post("/api/workouts/exercises/order/" + id, { ...orderData })
      .then((data) => {
        console.log("data", data);
      });
  }
  //

  async function storeWorkouts() {
    const storeName = "workout";
    let storedData = localStorage.getItem(storeName);
    if (!storedData) {
    }
  }
  //
  useEffect(() => {
    //
    // // getWorkout();
    // getTypes();
    // // getWorkoutExercises();
    // localStore({
    //   name: "workout",
    //   fetchData: getWorkout,
    //   toState: setWorkout,
    // });
    // localStore({
    //   name: "exercises",
    //   fetchData: getWorkoutExercises,
    //   toState: setExercises,
    //   loading: setLoading,
    // });
  }, []);

  //
  if (loading) {
    return <PreLoader />;
  }
  return (
    <div className="flex flex-col gap-4 w-full pb-64">
      <div className="fixed bottom-8 left-8 z-40">
        <BackButton
          action={() => {
            router.push(`/workouts`);
          }}
        />
      </div>
      <div className="fixed bottom-8 right-8 z-40">
        <ActionButton
          text={<Plus />}
          action={() => {
            router.push(`/workouts/select/${params.id}`);
          }}
        />
      </div>
      <div className="flex flex-row justify-between items-center lg:w-fit">
        <div className="flex flex-col gap-1">
          <h1 className="text-5xl w-3/4">{workout?.name}</h1>
          <p className="text-md text-gray-500">
            {workout?.date
              ? new Date(workout?.date as string).toLocaleDateString("ru-RU")
              : null}
          </p>
        </div>
        <ContextMenu
          icon={<Settings />}
          data={[
            {
              name: "Переименовать",
              icon: <SquarePen />,
              action: () => {
                // updateType(el);
              },
            },
            {
              name: "Удалить",
              icon: <Trash2 />,
              action: () => {
                removeWorkout(params.id);
              },
            },
          ]}
        />
      </div>
      <p className="text-md text-gray-400">{workout?.description}</p>
      {!exercises && <PreLoader />}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters" type="column" direction="vertical">
          {(provided) => (
            <ul
              className="dnd_list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {!exercises.length
                ? null
                : exercises?.map((el, index) => {
                    return (
                      <Draggable
                        key={el._id as string}
                        draggableId={el._id as string}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <li
                            style={getStyle(
                              provided.draggableProps.style,
                              snapshot
                            )}
                            className={"dnd_item"}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <WorkoutExercise
                              order={index + 1}
                              isSelected={snapshot.isDragging}
                              exercise={el}
                              removeExercise={() => {
                                removeExercise(el._id);
                              }}
                            />
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default WorkoutPage;
