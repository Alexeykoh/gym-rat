import { FC } from "react";

type navProps = {};

const Nav: FC<navProps> = () => {
  return (
    <nav className="">
      <ul className="flex gap-10">
        <li>Main</li>
        <li>Dashboard</li>
        <li>Workout</li>
      </ul>
    </nav>
  );
};

export default Nav;
