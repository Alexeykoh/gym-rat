import icon from "../../../../public/icons/gym-rat-icon.png";

import Image from "next/image";

export default function Logo() {
  return (
    <>
      <div className="logo flex items-center justify-center w-fit gap-4">
        <Image
          className="rounded-full"
          src={icon}
          width={50}
          height={50}
          alt="Picture of the author"
        />
        <p className="logo text-2xl">GYM-Rat</p>
      </div>
    </>
  );
}
