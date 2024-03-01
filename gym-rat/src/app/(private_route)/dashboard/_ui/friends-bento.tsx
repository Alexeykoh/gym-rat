import CardLayout from "@/components/cardLayout/cardLayout";
import { iFriend } from "@/lib/interfaces/Friends.interface";
import ActionButton from "@/shared/ui/buttons/ActionButton";
import { QrCode } from "lucide-react";
//
interface iFriendsBento {
  friends: iFriend[];
}
export default function FriendsBento({ friends }:iFriendsBento) {
  return (
    <CardLayout>
      <div className="flex flex-col gap-4 h-full w-full">
        <div className="flex flex-row justify-between w-full">
          <h3 className="text-2xl">Мои друзья</h3>
        </div>

        <div className="">
          {!friends.length ? (
            <ActionButton
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
  );
}
