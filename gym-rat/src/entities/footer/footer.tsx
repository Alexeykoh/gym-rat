import MainNav from "../navigation/main-nav";

export default function Header() {
  return (
    <header className="flex flex-col lg:flex-row items-center box-border justify-center gap-4 my-4 fixed bottom-0 left-0 z-30 w-full px-4">
      <MainNav />
    </header>
  );
}
