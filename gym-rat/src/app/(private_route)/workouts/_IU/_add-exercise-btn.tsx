import ActionButton from "@/shared/ui/buttons/ActionButton";
import SpinnerLoader from "@/shared/ui/loaders/spinnerLoader";
import { Plus } from "lucide-react";

interface iAddExerciseBtn {
  isLoading: boolean;
}

export default function AddExerciseBtn({ isLoading }: iAddExerciseBtn) {
  return (
    <div className="fixed bottom-6 right-6">
      <ActionButton
        text={isLoading ? <SpinnerLoader size={24} /> : <Plus size={24} />}
        action={() => {
          console.log("setOpenModal");
          // setOpenModal(true);
        }}
      />
    </div>
  );
}
