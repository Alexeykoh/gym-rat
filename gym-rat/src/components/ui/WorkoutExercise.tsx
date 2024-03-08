"use client";
import { iWorkoutExercises } from "@/lib/interfaces/WorkoutExercise.interface";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import CardLayout from "../cardLayout/cardLayout";

type WorkoutExerciseProps = {
  order: number;
  isSelected: boolean;
  exercise: iWorkoutExercises;
  removeExercise: () => void;
};

const WorkoutExercise: FC<WorkoutExerciseProps> = ({
  order,
  isSelected,
  exercise,
}) => {
  const router = useRouter();
  async function storeOrders() {
    const storeName = "exerciseOrders";
    const storedData = localStorage.getItem(storeName);
    if (!storedData) {
      const data = await getOrderItems(exercise._id as string);
      console.log("storeOrders", data);
    }
  }
  async function getOrderItems(id: string) {
    return axios
      .get("/api/workouts/exercises/" + id + "/items")
      .then(({ data }) => {
        return data?.message;
      });
  }
  useEffect(() => {
    storeOrders();
  }, [storeOrders]);
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
              <span className="">#{order}</span> {exercise.name}
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
