"use client";

import ActionButton from "@/components/ui/ActionButton";
import BackButton from "@/components/ui/BackButton";
import ContextMenu from "@/components/ui/ContextMenu";
import WorkoutExercise from "@/components/ui/WorkoutExercise";
import { iMeasureEnum, iOrder } from "@/lib/types";
import { iExerciseType } from "@/models/exerciseTypeModel";
import { iWorkoutExercises } from "@/models/workoutExercisesModel";
import { iWorkout } from "@/models/workoutModel";
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
  const [context, setContext] = useState<boolean>(false);
  const [workout, setWorkout] = useState<iWorkout | null>(null);
  const [types, setTypes] = useState<iExerciseType[]>([]);
  const [exercises, setExercises] = useState<iWorkoutExercises[]>([]);
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
    axios.get("/api/workouts/items/" + params.id).then(({ data }) => {
      setWorkout(data?.message);
    });
  }
  function getWorkoutExercises() {
    axios.get("/api/workouts/exercises/" + params.id).then(({ data }) => {
      setExercises(
        data?.message.sort((a: any, b: any) => {
          return a.order - b.order;
        })
      );
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
  useEffect(() => {
    getWorkout();
    getTypes();
    getWorkoutExercises();
  }, []);

  //
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
            router.push(`/workouts/exercise/${params.id}`);
          }}
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-5xl w-3/4">{workout?.name}</h1>
          <p className="text-md text-gray-500">
            {new Date(workout?.date as string).toLocaleDateString("ru-RU")}
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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters" type="column" direction="vertical">
          {(provided) => (
            <ul
              className="dnd_list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {exercises.map((el, index) => {
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
