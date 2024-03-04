"use client";

import { iFriend } from "@/lib/interfaces/Friends.interface";
import { iNotification } from "@/lib/interfaces/Notification.interface";
import { enumUserRole, iUserData } from "@/lib/interfaces/User.interface";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import { UserService } from "@/services/user.service";
import LoaderSpinnerScreen from "@/shared/ui/loaders/loader.spinner.screen";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DateBento from "./_ui/date-bento";
import FriendsBento from "./_ui/friends-bento";
import LastWorkoutBento from "./_ui/last-workout-bento";
import NotificationBento from "./_ui/notification-bento";
import UserBento from "./_ui/user-bento";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { data, isLoading } = useQuery<iUserData | null>({
    queryKey: ["UserService.getUserByEmail"],
    enabled: status !== "loading",
    queryFn: async () =>
      await UserService.getUserByEmail(session?.user?.email as string),
  });
  const [friends] = useState<iFriend[]>([]);
  const [notification] = useState<iNotification[]>([]);
  const [latestWorkout] = useState<iWorkout | null>(null);
  if (status === "loading" || isLoading) {
    return <LoaderSpinnerScreen />;
  }
  return (
    <main className="flex flex-col gap-8">
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 [&>*]:rounded-2xl ">
        <DateBento />
        <div className="col-span-1 gap-4 items-center grid grid-cols-1 h-full">
          <UserBento
            name={data?.name as string}
            role={data?.role as enumUserRole}
          />
          <NotificationBento notification={notification} />
        </div>
        <div className="col-span-3 lg:col-span-2">
          <FriendsBento friends={friends} />
        </div>
        <div className="col-span-3 lg:col-span-2 flex justify-between gap-4">
          <LastWorkoutBento workout={latestWorkout} />
        </div>
      </div>
    </main>
  );
}
