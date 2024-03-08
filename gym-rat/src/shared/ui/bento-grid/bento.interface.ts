import { ReactNode } from "react";

export enum enumBentoCellWidth {
  w1 = " col-span-1 ",
  w2 = " col-span-2 ",
  w3 = " col-span-3 ",
}
export enum enumBentoCellHeight {
  h1 = " row-span-1 ",
  h2 = " row-span-2 ",
  h3 = " row-span-3 ",
}

export interface iBentoCell {
  children: ReactNode | string;
  size: { w: enumBentoCellWidth; h: enumBentoCellHeight };
}
export interface iBentoBox {
  children: ReactNode | string;
}
