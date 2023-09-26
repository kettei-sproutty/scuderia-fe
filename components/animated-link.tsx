import useAnimatedRouter from "@utils/use-animated-router";
import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
};
export default function AnimatedLink({ href, children }: Props) {
  const { animatedRoute } = useAnimatedRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        animatedRoute(href);
      }}
      passHref
    >
      {children}
    </Link>
  );
}
