import { iBentoCell } from "./bento.interface";

export default function BentoCell({ size, children }: iBentoCell) {
  return (
    <div
      className={` ${size.h} ${size.w} p-4 rounded-2xl bg-zinc-900 flex w-full h-full items-center justify-center duration-150`}
    >
      {children}
    </div>
  );
}
