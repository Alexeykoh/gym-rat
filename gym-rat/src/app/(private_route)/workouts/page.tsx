"use client";

import Search from "@/widgets/search/search";
import PrevWorkoutSection from "./_sections/_prev-workout-section";

function Workout() {
  return (
    <div className="flex flex-col gap-8 w-full pb-16">
      <Search />
      <div className={"grid grid-cols-1 gap-8"}>
        <PrevWorkoutSection />
      </div>
    </div>
  );
}

export default Workout;
