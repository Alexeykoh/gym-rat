import { FC } from "react";
import Logo from "../logo/logo";
import Nav from "../nav/nav";


type headerProps = {};

const Header: FC<headerProps> = () => {
  return (
    <header className="flex justify-between w-full items-center">
      <Logo />
      <Nav />
      <div className="user">user</div>
    </header>
  );
};

export default Header;
