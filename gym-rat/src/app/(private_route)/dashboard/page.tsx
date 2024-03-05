"use client";
import { UserEndpoints } from "@/features/endpoints/user.endpoints";
import { iFriend } from "@/lib/interfaces/Friends.interface";
import { iNotification } from "@/lib/interfaces/Notification.interface";
import { enumUserRole, iUserData } from "@/lib/interfaces/User.interface";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import BentoBox from "@/shared/ui/bento-grid/bento-box";
import BentoCell from "@/shared/ui/bento-grid/bento-cell";
import {
  enumBentoCellHeight,
  enumBentoCellWidth,
} from "@/shared/ui/bento-grid/bento.interface";
import LoaderSpinnerScreen from "@/shared/ui/loaders/loader.spinner.screen";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AdminLink from "./_ui/_admin-link";
import DateBento from "./_ui/_date-bento";
import FriendsBento from "./_ui/_friends-bento";
import LastWorkoutBento from "./_ui/_last-workout-bento";
import NotificationBento from "./_ui/_notification-bento";
import UserBento from "./_ui/_user-bento";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { data, isLoading } = useQuery<iUserData | null>({
    queryKey: ["UserService.getUserByEmail"],
    enabled: status !== "loading",
    queryFn: async () =>
      await UserEndpoints.getUserByEmail(session?.user?.email as string),
  });
  const [friends] = useState<iFriend[]>([]);
  const [notification] = useState<iNotification[]>([]);
  const [latestWorkout] = useState<iWorkout | null>(null);
  if (status === "loading" || isLoading) {
    return <LoaderSpinnerScreen />;
  }
  return (
    <main className="flex flex-col gap-8">
      <BentoBox>
        <BentoCell
          size={{ w: enumBentoCellWidth.w3, h: enumBentoCellHeight.h1 }}
        >
          <UserBento
            name={data?.name as string}
            role={data?.role as enumUserRole}
          />
        </BentoCell>
        <BentoCell
          size={{ w: enumBentoCellWidth.w2, h: enumBentoCellHeight.h1 }}
        >
          <DateBento />
        </BentoCell>
        <BentoCell
          size={{ w: enumBentoCellWidth.w1, h: enumBentoCellHeight.h1 }}
        >
          <NotificationBento notification={notification} />
        </BentoCell>
        <BentoCell
          size={{ w: enumBentoCellWidth.w3, h: enumBentoCellHeight.h1 }}
        >
          <FriendsBento friends={friends} />
        </BentoCell>
        <BentoCell
          size={{ w: enumBentoCellWidth.w3, h: enumBentoCellHeight.h1 }}
        >
          <LastWorkoutBento workout={latestWorkout} />
        </BentoCell>
      </BentoBox>
      <AdminLink isAdmin={data?.role === "admin"} />
    </main>
  );
}
