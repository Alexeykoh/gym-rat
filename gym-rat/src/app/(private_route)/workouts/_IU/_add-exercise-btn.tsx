import ActionButton from "@/shared/ui/buttons/ActionButton";
import LoaderSpinner from "@/shared/ui/loaders/loader.spinner";
import { Plus } from "lucide-react";

interface iAddExerciseBtn {
  isLoading: boolean;
}

export default function AddExerciseBtn({ isLoading }: iAddExerciseBtn) {
  return (
    <div className="fixed bottom-4 right-4">
      <ActionButton
        text={isLoading ? <LoaderSpinner size={24} /> : <Plus size={24} />}
        action={() => {
          console.log("setOpenModal");
          // setOpenModal(true);
        }}
      />
    </div>
  );
}
