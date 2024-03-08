import { iBentoBox } from "./bento.interface";

export default function BentoBox({ children }: iBentoBox) {
  return <section className="grid grid-cols-3 gap-4 duration-150">{children}</section>;
}
