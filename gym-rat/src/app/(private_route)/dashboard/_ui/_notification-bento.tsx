import { iNotification } from "@/lib/interfaces/Notification.interface";
import TextBadge, { enumTextBadge } from "@/shared/ui/badges/TextBadge";
import { Bell, BellRing } from "lucide-react";

interface iNotificationBento {
  notification: iNotification[];
}
export default function NotificationBento({
  notification,
}: iNotificationBento) {
  return (
    <div className="col-span-1 bg-zinc-900 p-4 rounded-2xl flex flex-col items-center h-full justify-center gap-2 relative">
      {notification.length ? (
        <BellRing size={42} className="text-orange-600" />
      ) : (
        <Bell size={42} />
      )}
      {notification.length ? (
        <div className="absolute -top-2 -right-4">
          <TextBadge
            value={(notification.length + 1).toString()}
            type={enumTextBadge.Error}
          />
        </div>
      ) : null}
    </div>
  );
}
