"use client";
import AdminLink from "@/app/(private_route)/dashboard/_ui/_admin-link";
import WorkoutCreateForm from "@/features/forms/workoutCreateForm/workout-create-form";
import { NavContext } from "@/lib/context/nav-context";
import { UserContext } from "@/lib/context/user-context";
import BackButton from "@/shared/ui/buttons/BackButton";
import useModal from "@/widgets/modals/floatModal/_useModal";
import { CircleUserRound, Dumbbell, Home, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import OptionalButton from "./_UI/_optional-button";

interface iMainNav {}

interface iRoute {
  name: string;
  path: string;
  icon: React.ReactNode;
  color: string;
}

export default function MainNav({}: iMainNav) {
  const { navState } = useContext(NavContext);
  const userData = useContext(UserContext);
  const { modalElement, openModal } = useModal({
    children: <WorkoutCreateForm />,
  });
  const pathname = usePathname();
  const routes: iRoute[] = [
    {
      name: "Аккаунт",
      path: "/account",
      icon: <CircleUserRound />,
      color: " bg-violet-400 ",
    },
    {
      name: "Главная",
      path: "/dashboard",
      icon: <Home />,
      color: " bg-gray-400 ",
    },
    {
      name: "Тренировки",
      path: "/workouts",
      icon: <Dumbbell />,
      color: " bg-lime-400 ",
    },
  ];

  function switchNav() {
    switch (navState) {
      case "account":
        return undefined;
      case "dashboard":
        if (userData?.userData?.role === "admin") {
          return <AdminLink isAdmin={true} />;
        } else {
          return undefined;
        }
      case "workouts":
        return <Plus className="text-lime-400" onClick={openModal} />;
      case "workoutExercise":
        return (
          <Plus
            className="text-lime-400"
            onClick={() => {
              "open exercise modal";
            }}
          />
        );
      default:
        break;
    }
  }
  // switchNav();
  return (
    <>
      {modalElement}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <div className="flex justify-center text-xl gap-2 bg-zinc-700 p-2 rounded-2xl z-40 relative">
          <BackButton
            color=" bg-zinc-700 "
            isVisible={pathname.includes("/workouts/")}
          />
          {routes.map((el: iRoute, ind: number) => {
            return (
              <Link
                key={ind}
                className={
                  (pathname.includes(el.path)
                    ? ` ${el.color} text-black `
                    : " bg-zinc-600 ") +
                  " px-4 py-2  rounded-full active:bg-gray-100/50 text-xl duration-75 z-40"
                }
                href={el.path}
              >
                <div className="flex">
                  <span>{el.icon}</span>
                </div>
              </Link>
            );
          })}
          <OptionalButton color=" bg-zinc-700 " optionalElement={switchNav()} />
        </div>
      </nav>
    </>
  );
}
