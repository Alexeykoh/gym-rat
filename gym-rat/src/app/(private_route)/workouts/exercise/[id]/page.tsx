"use client";

import CardLayout from "@/components/cardLayout/cardLayout";
import ContextMenu from "@/components/ui/ContextMenu";
import {
  iExerciseOrder,
  iMeasureEnum,
} from "@/lib/interfaces/ExerciseOrder.interface";
import ActionButton from "@/shared/ui/buttons/ActionButton";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type pageProps = { params: { id: string } };

export default function Page({ params }: pageProps) {
  const router = useRouter();
  //
  const [orderItems, setOrderItems] = useState<iExerciseOrder[]>([]);
  //
  function getOrderItems(id: string) {
    axios.get("/api/workouts/exercises/" + id + "/items").then(({ data }) => {
      console.log("data", data);
      setOrderItems(data?.message);
    });
  }
  useEffect(() => {
    getOrderItems(params.id as string);
  }, [params.id]);
  //
  return (
    <section>
      {/* <p>{params.id}</p> */}
      <div className="fixed bottom-8 right-8 z-40">
        <ActionButton
          text={<Plus />}
          action={() => {
            router.back();
          }}
        />
      </div>

      <ul
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
                  <CardLayout key={ind}>
                    <div className="flex gap-4 items-center">
                      <p className="bg-zinc-800 px-3 py-1 rounded-full">
                        {ind + 1}
                      </p>
                      <div className="flex flex-col gap-2 ">
                        <div className="flex flex-row gap-4 items-center justify-between">
                          <label className="w-1/4" htmlFor="">
                            Значение:
                          </label>
                          <input
                            className="w-1/4 text-center bg-transparent text-white px-2 py-1 "
                            type="number"
                            value={0}
                          />
                          <select
                            className="text-white bg-transparent"
                            name=""
                            id=""
                          >
                            {Object.values(iMeasureEnum).map((el, ind) => {
                              return (
                                <option
                                  className="text-black bg-transparent"
                                  key={ind}
                                >
                                  {el}
                                </option>
                              );
                            })}
                          </select>
                          <ContextMenu
                            data={[
                              {
                                name: "Удалить",
                                icon: <Trash2 />,
                                action: () => {
                                  // deleteOrderItem();
                                },
                              },
                            ]}
                          />
                        </div>
                        <div className="flex flex-row gap-4 items-center justify-between w-full">
                          <label className="w-1/4" htmlFor="">
                            Повторы:
                          </label>
                          <input
                            className="text-center bg-transparent text-white px-2 py-1 w-1/4"
                            type="number"
                            value={0}
                          />
                          <p className="w-1/4"></p>
                          <p className="w-1/4"></p>
                        </div>
                      </div>
                    </div>
                  </CardLayout>
                );
              })}
      </ul>
    </section>
  );
}
