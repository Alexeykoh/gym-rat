"use client";
import { iMeasureEnum, iOrder } from "@/lib/types";
import axios from "axios";
import { Loader, Trash2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";

interface OrderItemProps extends iOrder {
  deleteOrderItem: () => void;
}

const OrderItem: FC<OrderItemProps> = ({
  _id,
  exercise_id,
  order,
  amount,
  measure,
  deleteOrderItem,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<iOrder>({
    exercise_id: exercise_id as string,
    amount: amount,
    order: order + 1,
    measure: measure,
  });
  //
  function changeOrderItem(data: iOrder) {
    setLoading(true);
    axios
      .put("/api/workouts/exercises/order_item/" + _id, { ...data })
      .then((res: any) => {
        setLoading(false);
      });
  }
  //
  function changeSelect(measure: iMeasureEnum) {
    setOrderData((prev: iOrder) => {
      const res = {
        ...prev,
        measure: measure,
      };
      changeOrderItem(res as iOrder);
      return res;
    });
  }
  //
  function changeInput(amount: any) {
    // const regex = /^\d+$/;
    // if (!regex.test(amount)) {
    //   return;
    // }
    setOrderData((prev: iOrder) => {
      return {
        ...prev,
        amount: amount,
      };
    });
  }
  //
  useEffect(() => {
    setIsVisible(true);
  }, []);
  //
  return (
    <>
      <li
        className={
          (isVisible ? " opacity-100 " : " opacity-0 ") +
          " flex flex-row justify-between items-center p-4 bg-zinc-800 rounded-lg relative duration-500 "
        }
      >
        {!loading ? null : (
          <div className="absolute -right-2 -bottom-2 animate-spin">
            <Loader />
          </div>
        )}

        {/* <p className="text-xs">{_id}</p> */}
        <p>{order}</p>
        <div className="flex flex-row gap-4">
          <input
            type="number"
            onChange={(e) => changeInput(e.target.value)}
            onBlur={(e) => {
              changeOrderItem(orderData);
            }}
            value={orderData?.amount}
            className="text-black border-2 w-16 border-gray-300 rounded-md p-2 text-center"
          />
          <select
            defaultValue={iMeasureEnum.kg}
            value={orderData?.measure}
            name="orderSelect"
            onChange={(e) => changeSelect(e.target.value as iMeasureEnum)}
            className="text-black px-4 py-2 rounded-lg"
          >
            {Object.values(iMeasureEnum).map((el, ind) => {
              return <option key={ind}>{el}</option>;
            })}
          </select>
        </div>
        <ContextMenu
          data={[
            {
              name: "Удалить",
              icon: <Trash2 />,
              action: () => {
                deleteOrderItem();
              },
            },
          ]}
        />
      </li>
    </>
  );
};

export default OrderItem;
