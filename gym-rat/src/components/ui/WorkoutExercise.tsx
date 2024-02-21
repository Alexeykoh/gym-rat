"use client";

import { iMeasureEnum, iOrder } from "@/lib/types";
import { iWorkoutExercises } from "@/models/workoutExercisesModel";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import CardLayout from "../cardLayout/cardLayout";
import ContextMenu from "./ContextMenu";

type WorkoutExerciseProps = {
  isSelected: boolean;
  exercise: iWorkoutExercises;
  removeExercise: () => void;
};

const WorkoutExercise: FC<WorkoutExerciseProps> = ({
  isSelected,
  exercise,
  removeExercise,
}) => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const [orderItems, setOrderItems] = useState<iOrder[]>([]);
  //
  function getOrderItems(id: string) {
    axios.get("/api/workouts/exercises/" + id + "/items").then(({ data }) => {
      setOrderItems(data?.message);
    });
  }
  //
  function deleteOrderItem(id: string) {
    const answer = confirm("Удалить подход?");
    if (!answer) {
      return;
    }
    axios.delete("/api/workouts/exercises/order_item/" + id).then((data) => {
      getOrderItems(exercise._id as string);
    });
  }
  //
  function createNewOrder() {
    const answer = confirm("Добавить новый подход?");
    if (!answer) {
      return;
    }
    const orderData: iOrder = {
      exercise_id: exercise._id as string,
      amount: 0,
      order: orderItems.length,
      measure: iMeasureEnum.kg,
    };
    axios
      .post("/api/workouts/exercises/order_item/" + exercise._id, {
        ...orderData,
      })
      .then((data) => {
        getOrderItems(exercise._id as string);
      });
  }
  useEffect(() => {
    getOrderItems(exercise._id as string);
  }, []);
  //
  return (
    <>
      <CardLayout isSelected={isSelected}>
        <div
          onClick={() => {
            router.push(`exercise/` + exercise?._id);
          }}
          className="flex flex-col w-full gap-4 relative"
        >
          <div className="flex items-center justify-between w-full">
            <p className="text-3xl w-3/4">
              <span className="">#{exercise.order + 1}</span> {exercise.name}
            </p>
            {/* <ContextMenu
              data={[
                {
                  name: "Подход",
                  icon: <Plus />,
                  action: () => {
                    createNewOrder();
                  },
                },
                {
                  name: "Удалить",
                  icon: <Trash2 />,
                  action: () => {
                    removeExercise();
                  },
                },
              ]}
            /> */}
          </div>
          <div className="w-full">
            {/* <ul
              className={
                (orderItems.length ? " max-h-[1200px] " : " max-h-0 ") +
                " flex flex-col gap-4 duration-500 overflow-y-hidden "
              }
            >
              {!orderItems.length
                ? null
                : orderItems
                    ?.sort((a: any, b: any) => {
                      return a.order - b.order;
                    })
                    ?.map((el, ind) => {
                      return (
                        <OrderItem
                          key={el._id}
                          _id={el._id as string}
                          exercise_id={el.exercise_id as string}
                          amount={el.amount}
                          order={ind + 1}
                          measure={el.measure}
                          deleteOrderItem={function (): void {
                            deleteOrderItem(el._id as string);
                          }}
                        />
                      );
                    })}
            </ul> */}
          </div>
        </div>
      </CardLayout>
    </>
  );
};

export default WorkoutExercise;
