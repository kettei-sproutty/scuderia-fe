"use client";

import { NavigationMenu } from "@components/navigation-menu";
import { CommandLineIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="fixed right-0 top-0 z-50 flex w-full items-center justify-between border-b border-primary-700 bg-primary-800/50 px-8 py-2 text-primary-200 backdrop-blur-xl">
      <CommandLineIcon className="h-12 transition-all hover:text-accent-dark" />
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
