import BackButton from "@/shared/ui/buttons/BackButton";
import { CircleUserRound, Dumbbell, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface iMainNav {}

interface iRoute {
  name: string;
  path: string;
  icon: React.ReactNode;
  color: string;
}

export default function MainNav({}: iMainNav) {
  const pathname = usePathname();
  const routes: iRoute[] = [
    {
      name: "Аккаунт",
      path: "/account",
      icon: <CircleUserRound />,
      color: " bg-gray-400 ",
    },
    {
      name: "Главная",
      path: "/dashboard",
      icon: <Home />,
      color: " bg-lime-400 ",
    },
    {
      name: "Тренировки",
      path: "/workouts",
      icon: <Dumbbell />,
      color: " bg-rose-400 ",
    },
  ];
  console.log("pathname", pathname);
  return (
    <nav className="flex w-content items-center justify-center">
      {pathname !== "/dashboard" && <BackButton color=" bg-zinc-700 " />}
      <div className="flex justify-center text-xl gap-2 bg-zinc-700 p-2 rounded-2xl">
        {routes.map((el: iRoute, ind: number) => {
          return (
            <Link
              key={ind}
              className={
                (pathname.includes(el.path)
                  ? ` ${el.color} text-black `
                  : " bg-zinc-600 ") +
                " px-4 py-2  rounded-full active:bg-gray-100/50 text-xl duration-75"
              }
              href={el.path}
            >
              <div className="flex">
                <span>{el.icon}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
