"use client";

import { RootState } from "@/app/GlobalRedux/store";
import { iFriend } from "@/lib/interfaces/Friends.interface";
import { iNotification } from "@/lib/interfaces/Notification.interface";
import { iUserData } from "@/lib/interfaces/User.interface";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import { useState } from "react";
import { useSelector } from "react-redux";
import DateBento from "./_ui/date-bento";
import FriendsBento from "./_ui/friends-bento";
import LastWorkoutBento from "./_ui/last-workout-bento";
import NotificationBento from "./_ui/notification-bento";
import UserBento from "./_ui/user-bento";

export default function Dashboard() {
  const userData: iUserData = useSelector(
    (state: RootState) => state.user.entities
  );
  //
  const [friends, setFriends] = useState<iFriend[]>([]);
  const [notification, setNotification] = useState<iNotification[]>([]);
  const [latestWorkout, setLatestWorkout] = useState<iWorkout | null>(null);
  //
  return (
    <main className="flex flex-col gap-8">
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 [&>*]:rounded-2xl ">
        <DateBento />
        <div className="col-span-1 gap-4 items-center grid grid-cols-1 h-full">
          <UserBento name={userData.name} role={userData.role} />
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
