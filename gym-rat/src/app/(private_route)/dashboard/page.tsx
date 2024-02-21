"use client";

import CardLayout from "@/components/cardLayout/cardLayout";
import ActionButton from "@/components/ui/ActionButton";
import Badge, { BadgeType } from "@/components/ui/Badge";
import Modal from "@/components/widgets/modal/Modal";
import WorkoutCard from "@/components/workoutCard/workoutCard";
import { iFriend } from "@/models/friendModel";
import { iWorkout } from "@/models/workoutModel";
// import { RootState } from "@reduxjs/toolkit/query";
import { Bell, BellRing, QrCode } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQRCode } from "next-qrcode";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import arm from "../../../../public/icons/arm.svg";

export default function Dashboard() {
  //

  //
  const { data, status }: any = useSession();
  const { Canvas } = useQRCode();
  const [modal, setModal] = useState<boolean>(false);
  const [friends, setFriends] = useState<iFriend[]>([]);
  const [notification, setNotification] = useState([1]);
  const [latestWorkout, setLatestWorkout] = useState<iWorkout | null>(null);
  // Function to fetch data from an API
  async function fetchData() {
    const response = await fetch("/api/workouts/items?type=latest");
    const data = await response.json();
    return data;
  }

  // Function to handle fetching, storing, and re-fetching data
  async function handleData() {
    let storedData = localStorage.getItem("lastWorkout");

    if (!storedData) {
      // Fetch data if local storage is empty
      const data = await fetchData();
      setLatestWorkout(data.message);
      localStorage.setItem("lastWorkout", JSON.stringify(data));
      console.log("Data fetched and stored in local storage:", data);
    } else {
      // Fetch data again if local storage is not empty
      console.log("Data already exists in local storage. Fetching again...");
      setLatestWorkout(JSON.parse(storedData).message);
      const data = await fetchData();
      setLatestWorkout(data.message);
      localStorage.setItem("lastWorkout", JSON.stringify(data));
      console.log("Data re-fetched and updated in local storage:", data);
    }
  }

  const currentDate = useMemo(() => {
    return new Date();
  }, []);
  const formateDate = useMemo(() => {
    return {
      day: currentDate.toLocaleString("en-US", { day: "2-digit" }),
      month: currentDate.toLocaleString("en-US", { month: "short" }),
      year: currentDate.toLocaleString("en-US", { year: "2-digit" }),
    };
  }, [currentDate]);
  //

  //
  function getLatestWorkout() {
    fetch("/api/workouts/items?type=latest")
      .then((res) => res.json())
      .then((data) => {
        setLatestWorkout(data.message);
      });
  }

  //

  const name = data?.user?.name;
  const email = data?.user?.email;
  const role = data?.user?.role;

  //

  useEffect(() => {
    // getLatestWorkout();
    handleData();
  }, []);

  //
  return (
    <main className="flex flex-col gap-8">
      {!modal ? null : (
        <Modal
          close={function (): void {
            setModal(false);
          }}
        >
          <div className="f-full h-full flex items-center justify-center flex-col gap-6">
            <h2 className="text-4xl">{name}</h2>
            <Canvas
              text={
                "https://gym-rat-dusky.vercel.app/admin/users/65b24fb8f257aa5b7b357dce"
              }
              options={{
                errorCorrectionLevel: "M",
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: "#000000ff",
                  light: "#ffffffff",
                },
              }}
            />
          </div>
        </Modal>
      )}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 [&>*]:rounded-2xl ">
        <div className="col-span-2 lg:col-span-1 text-8xl p-4 rounded-2xl bg-zinc-900">
          <p className="">{formateDate.day}</p>
          <p className="uppercase">{formateDate.month}</p>
        </div>
        <div className="col-span-1 gap-4 items-center grid grid-cols-1 h-full">
          <div className="col-span-1 bg-lime-400 rounded-2xl flex flex-col items-center justify-center text-md text-black font-semibold p-4 h-full">
            {name}
            {role === "admin" && (
              <Link
                className="text-black bg-lime-400 rounded-xl text-center font-light"
                href={"/admin/types"}
              >
                {role}
              </Link>
            )}
          </div>
          <div className="col-span-1 bg-zinc-900 p-4 rounded-2xl flex flex-col items-center h-full justify-center gap-2 relative">
            {notification.length ? (
              <BellRing size={42} className="text-orange-600" />
            ) : (
              <Bell size={42} />
            )}
            {notification.length ? (
              <div className="absolute -top-2 -right-4">
                <Badge value={notification.length + 1} type={BadgeType.Error} />
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <CardLayout>
            <div className="flex flex-col gap-4 h-full w-full">
              <div className="flex flex-row justify-between w-full">
                <h3 className="text-2xl">Мои друзья</h3>
              </div>

              <div className="">
                {!friends.length ? (
                  <ActionButton
                    action={() => {
                      setModal(true);
                    }}
                    text={
                      <span className="flex gap-2 items-center">
                        <span>Добавить</span>
                        <QrCode />
                      </span>
                    }
                  />
                ) : (
                  <ul>list</ul>
                )}
              </div>
            </div>
          </CardLayout>
        </div>
        <div className="col-span-3 lg:col-span-2 flex justify-between gap-4">
          <div className="flex flex-col gap-2 w-full">
            <CardLayout>
              <div className="lg:h-full w-full">
                <p className="text-4xl mb-4">Последняя тренировка</p>
                {!latestWorkout ? null : (
                  <WorkoutCard
                    icon={arm}
                    title={latestWorkout.name}
                    description={latestWorkout.description}
                    date={latestWorkout.date}
                    id={latestWorkout._id as string}
                  />
                )}
              </div>
            </CardLayout>
          </div>
        </div>
      </div>
    </main>
  );
}
