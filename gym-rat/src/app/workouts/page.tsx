import arm from "@/assets/arm.svg";
import CardLayout from "@/components/cardLayout/cardLayout";
import WorkoutCard from "@/components/workoutCard/workoutCard";
import { FC } from "react";

type pageProps = {};

const Workout: FC<pageProps> = () => {
  return (
    <div className="flex flex-col gap-4 w-full pb-16">
      <div className="px-4 py-2 fixed bottom-4 left-1/2 -translate-x-1/2 bg-lime-500 rounded-2xl z-20">
        add workout
      </div>
      <form className="flex items-center pb-4">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="w-full">
          <input
            type="text"
            id="simple-search"
            className="border border-gray-500/50 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5  bg-transparent placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search workout ..."
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gray-500/50 p-2.5 ms-2 text-sm font-medium text-white  rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 "
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
      <CardLayout>
        <WorkoutCard
          icon={arm}
          title={"Круговая тренировка"}
          description={"Тренировка для восстановления после перерыва"}
          date={"18.01.2024"}
          id={"0"}
        />
      </CardLayout>
      <CardLayout>
        <WorkoutCard
          icon={arm}
          title={"Круговая тренировка"}
          description={"Тренировка для восстановления после перерыва"}
          date={"20.01.2024"}
          id={"1"}
        />
      </CardLayout>
      <CardLayout>
        <WorkoutCard
          icon={arm}
          title={"Грудь/Бицепс"}
          description={"Акцент на грудь. Установка рекордного веса"}
          date={"23.01.2024"}
          id={"2"}
        />
      </CardLayout>
      <CardLayout>
        <WorkoutCard
          icon={arm}
          title={"Грудь/Бицепс"}
          description={"Акцент на грудь. Установка рекордного веса"}
          date={"23.01.2024"}
          id={"3"}
        />
      </CardLayout>
      <CardLayout>
        <WorkoutCard
          icon={arm}
          title={"Грудь/Бицепс"}
          description={"Акцент на грудь. Установка рекордного веса"}
          date={"23.01.2024"}
          id={"4"}
        />
      </CardLayout>
    </div>
  );
};

export default Workout;
