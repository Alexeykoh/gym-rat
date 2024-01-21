import icon from "@/components/logo/logo.png";

import Image from "next/image";
import { FC } from "react";

type logoProps = {};

const Logo: FC<logoProps> = () => {
  return (
    <>
      <div className="logo lg:flex flex-col items-center hidden ">
        <Image
          className="rounded-full"
          src={icon}
          width={50}
          height={50}
          alt="Picture of the author"
        />
        <p className="logo">GYM-Rat</p>
      </div>
    </>
  );
};

export default Logo;
