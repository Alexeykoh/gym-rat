import { FC, useEffect, useRef, useState } from "react";

type exerciseCardProps = {
  name: string;
  time: string;
};

const ExerciseCard: FC<exerciseCardProps> = ({ name, time }) => {
  const [context, setContext] = useState<boolean>(false);
  let menuRef = useRef(null);

  useEffect(() => {
    let handler = (e: any) => {
      // @ts-ignore
      if (!menuRef?.current?.contains(e?.target)) {
        setContext(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  function toggleContext() {
    setContext(!context);
    console.log("click");
  }
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-4 items-center justify-between">
          <p className="text-2xl">{name}</p>
          <div className="relative">
            <svg
              onClick={toggleContext}
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 -960 960 960"
              width="32"
            >
              <path d="M480-218.461q-16.5 0-28.25-11.75T440-258.461q0-16.501 11.75-28.251t28.25-11.75q16.5 0 28.25 11.75T520-258.461q0 16.5-11.75 28.25T480-218.461ZM480-440q-16.5 0-28.25-11.75T440-480q0-16.5 11.75-28.25T480-520q16.5 0 28.25 11.75T520-480q0 16.5-11.75 28.25T480-440Zm0-221.538q-16.5 0-28.25-11.75T440-701.539q0-16.5 11.75-28.25t28.25-11.75q16.5 0 28.25 11.75t11.75 28.25q0 16.501-11.75 28.251T480-661.538Z" />
            </svg>
            <div
              ref={menuRef}
              className={
                (context ? " flex " : " hidden ") +
                " flex-col absolute top-0 right-0  p-2 rounded-xl bg-gray-500 shadow-lg w-44 gap-2"
              }
            >
              <div className="flex gap-2 items-center justify-between w-full p-2 bg-gray-400 rounded-lg">
                <p>{"add exercise"}</p>
                <svg
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M460-460H240v-40h220v-220h40v220h220v40H500v220h-40v-220Z" />
                </svg>
              </div>
              <div className="flex gap-2 items-center justify-between w-full p-2 rounded-lg bg-gray-400">
                <p>{"delete"}</p>
                <svg
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M304.615-160q-26.846 0-45.731-18.884Q240-197.769 240-224.615V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.385Q720-197 701.5-178.5 683-160 655.385-160h-350.77ZM680-720H280v495.385q0 10.769 6.923 17.692T304.615-200h350.77q9.23 0 16.923-7.692Q680-215.385 680-224.615V-720ZM392.307-280h40.001v-360h-40.001v360Zm135.385 0h40.001v-360h-40.001v360ZM280-720v520-520Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="rounded-2xl bg-gray-600 p-4 w-full flex gap-2">
            <p>{"Weight: 60kg"}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-gray-100/50 flex flex-col">
            <p className="">{"Time: " + time}</p>
          </div>
          <svg
            className="bg-lime-500 rounded-full"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m531.692-480-184-184L376-692.308 588.308-480 376-267.692 347.692-296l184-184Z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default ExerciseCard;
