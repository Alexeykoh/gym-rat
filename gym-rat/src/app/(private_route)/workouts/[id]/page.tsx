"use client";

import CardLayout from "@/components/cardLayout/cardLayout";
import ActionButton from "@/components/ui/ActionButton";
import ContextMenu from "@/components/ui/ContextMenu";
import { iExerciseType } from "@/models/exerciseTypeModel";
import { iWorkoutExercises } from "@/models/workoutExercisesModel";
import { iWorkout } from "@/models/workoutModel";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";
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

  const router = useRouter();
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
      // cannot be 0, but make it super tiny
      transitionDuration: `0.001s`,
    };
  }
  //
  useEffect(() => {
    getWorkout();
    getTypes();
    getWorkoutExercises();
  }, []);

  //
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        {" "}
        <ActionButton
          text="Добавить упражнение"
          action={() => {
            router.push(`/exercise/${params.id}`);
          }}
        />
      </div>
      <h1 className="text-7xl">{workout?.name}</h1>
      <p className="text-xs text-gray-400">
        {new Date(workout?.date as string).toLocaleDateString("ru-RU")}
      </p>
      <p className="text-md text-gray-400">{workout?.description}</p>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters" type="column" direction="vertical">
          {(provided, snapshot) => (
            <ul
              className=""
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
                        className={
                          (snapshot.draggingOver ? " p-2 " : "") +
                          " duration-150 mb-4 "
                        }
                        style={getStyle(
                          provided.draggableProps.style,
                          snapshot
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CardLayout key={index}>
                          <div className="flex flex-col w-full gap-4">
                            <div className="flex items-center justify-between w-full">
                              <p className="text-3xl w-3/4">
                                <span className="">#{el.order + 1}</span>{" "}
                                {el.name}
                              </p>
                              <ContextMenu
                                data={[
                                  {
                                    name: "Подход",
                                    icon: <Plus />,
                                    action: () => {
                                      // updateType(el);
                                    },
                                  },
                                  {
                                    name: "Удалить",
                                    icon: <Trash2 />,
                                    action: () => {
                                      removeExercise(el._id);
                                    },
                                  },
                                ]}
                              />
                            </div>
                            <div className="w-full">
                              <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                              </ul>
                            </div>
                          </div>
                        </CardLayout>
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
