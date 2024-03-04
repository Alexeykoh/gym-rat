"use client";

import ActionButton from "@/shared/ui/buttons/ActionButton";
import Search from "@/widgets/search/search";
import { Plus } from "lucide-react";
import PrevWorkoutSection from "./_sections/_prev-workout-section";

function Workout() {
  return (
    <div className="flex flex-col gap-8 w-full pb-16">
      <Search />
      <div className={"grid grid-cols-1 gap-8"}>
        <PrevWorkoutSection />
      </div>
      <span className="fixed bottom-4 right-4 z-50">
        <ActionButton text={<Plus className="text-rose-400"/>} />
      </span>
    </div>
  );
}

export default Workout;
