"use client";

import {
  decrement,
  increment,
  incrementByAmount,
} from "@/app/GlobalRegux/Features/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Dashboard() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <main className="">
      <button onClick={() => dispatch(increment())}>Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>
        Increment by 2
      </button>
    </main>
  );
}
