"use client";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedText from "@components/animated-text";
import LoadingProgress from "@components/loading-progress";

const ComingSoon = () => {
  const count = useMotionValue(0);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const animation = animate(count, 100, { duration: 6 });
    animation.then(() => setReady(true));
    return animation.stop;
  }, []);

  return ready ? <AnimatedText text={"Scuderia Frontend"} /> : <LoadingProgress count={count} />;
};
export default ComingSoon;
