import { NavigationMenu } from "@components/navigation-menu";

const Header = () => (
  <header className=" flex h-[5%] items-center justify-between border-b p-2 text-white">
    <span>Scuderia-FE</span>
    <NavigationMenu
      links={[
        { name: "Dashboard", href: "/" },
        { name: "Workshops", href: "/workshop" },
      ]}
    />
  </header>
);
export default Header;
