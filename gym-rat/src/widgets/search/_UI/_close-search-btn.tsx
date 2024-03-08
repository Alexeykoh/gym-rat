interface iCloseSearchBtn {
  isOpen: boolean;
  handleBlur: () => void;
}

export default function CloseSearchBtn({
  isOpen,
  handleBlur,
}: iCloseSearchBtn) {
  return (
    <>
      {!isOpen ? null : (
        <button
          type="button"
          onClick={handleBlur}
          className=" text-red-500 text-sm rounded-2xl shadow-lg"
        >
          <p>закрыть</p>
          {/* <X /> */}
        </button>
      )}
    </>
  );
}
