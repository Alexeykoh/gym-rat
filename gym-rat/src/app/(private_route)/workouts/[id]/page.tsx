"use client";

import ContextMenu from "@/components/ui/ContextMenu";
import PreLoader from "@/components/ui/PreLoader";
import WorkoutExercise from "@/components/ui/WorkoutExercise";
import { iWorkoutExercises } from "@/lib/interfaces/WorkoutExercise.interface";
import axios from "axios";
import { Settings, SquarePen, Trash2, Users } from "lucide-react";

import useWorkoutService from "@/features/services/useWorkout.service";
import { useNavContext } from "@/lib/context/nav-context";
import BentoBox from "@/shared/ui/bento-grid/bento-box";
import BentoCell from "@/shared/ui/bento-grid/bento-cell";
import {
  enumBentoCellHeight,
  enumBentoCellWidth,
} from "@/shared/ui/bento-grid/bento.interface";
import { useRouter } from "next/navigation";
import { FC, Suspense, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Loading from "../../loading";
import NavWorkout from "./_UI/_navWorkout";
import Title from "./_UI/_title";
import useGetWorkoutById from "./_useGetWorkoutById.hook";

type WorkoutPageProps = {
  params: { id: string };
};

const WorkoutPage: FC<WorkoutPageProps> = ({ params }) => {
  const router = useRouter();
  const {} = useNavContext("workoutExercise");
  const { deleteWorkout } = useWorkoutService().delete;
  const { workoutData } = useGetWorkoutById(params.id, true);
  const [exercises, setExercises] = useState<iWorkoutExercises[]>([]);

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
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-8 w-full pb-64">
        <BentoBox>
          <BentoCell
            size={{ w: enumBentoCellWidth.w3, h: enumBentoCellHeight.h1 }}
          >
            <NavWorkout date={workoutData?.date as string}>
              <ContextMenu
                icon={<Settings />}
                data={[
                  {
                    name: "Переименовать",
                    icon: <SquarePen className="text-orange-400" />,
                    action: () => {
                      // updateType(el);
                    },
                  },
                  {
                    name: "Удалить",
                    icon: <Trash2 className="text-red-400" />,
                    action: () => {
                      if (
                        !confirm("Вы уверены что хотите удалить тренировку?")
                      ) {
                        return;
                      }
                      deleteWorkout.mutate(params.id)
                      router.back();
                    },
                  },
                ]}
              />
            </NavWorkout>
          </BentoCell>
          <BentoCell
            size={{
              w: enumBentoCellWidth.w2,
              h: enumBentoCellHeight.h1,
            }}
          >
            <Title name={workoutData?.name as string} />
          </BentoCell>
          <BentoCell
            size={{ w: enumBentoCellWidth.w1, h: enumBentoCellHeight.h1 }}
          >
            <Users />
          </BentoCell>
        </BentoBox>
        <h2 className="text-4xl">Тренировка</h2>
        {!exercises && <PreLoader />}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable
            droppableId="characters"
            type="column"
            direction="vertical"
          >
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
    </Suspense>
  );
};

export default WorkoutPage;
