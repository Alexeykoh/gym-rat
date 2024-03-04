"use client";

import ContextMenu from "@/components/ui/ContextMenu";
import PreLoader from "@/components/ui/PreLoader";
import WorkoutExercise from "@/components/ui/WorkoutExercise";
import { iWorkoutExercises } from "@/lib/interfaces/WorkoutExercise.interface";
import ActionButton from "@/shared/ui/buttons/ActionButton";
import BackButton from "@/shared/ui/buttons/BackButton";
import axios from "axios";
import { Plus, Settings, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { FC, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Title from "./_UI/_title";
import useGetWorkoutById from "./_useGetWorkoutById";

type WorkoutPageProps = {
  params: { id: string };
};

const WorkoutPage: FC<WorkoutPageProps> = ({ params }) => {
  const { workoutData } = useGetWorkoutById(params.id, true);
  // const { exercisesData } = useGetExercises(params.id, true);
  const [exercises, setExercises] = useState<iWorkoutExercises[]>([]);
  //
  const router = useRouter();
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
    newItems.forEach((el) => {
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
  return (
    <div className="flex flex-col gap-4 w-full pb-64">
      
      <div className="flex flex-row justify-between items-center lg:w-fit">
        <Title
          name={workoutData?.name as string}
          date={workoutData?.date as string}
        />
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
                // removeWorkout(params.id);
              },
            },
          ]}
        />
      </div>
      <p className="text-md text-gray-400">{workoutData?.description}</p>
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
                                // removeExercise(el._id);
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
