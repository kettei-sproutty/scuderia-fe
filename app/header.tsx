"use client";

import { NavigationMenu } from "@components/navigation-menu";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b p-2 text-white">
      <span>Scuderia-FE</span>
      {pathname !== "/auth" && (
        <NavigationMenu
          links={[
            { name: "Dashboard", href: "/" },
            { name: "Workshops", href: "/workshop" },
          ]}
        />
      )}
    </header>
  );
};
export default Header;
