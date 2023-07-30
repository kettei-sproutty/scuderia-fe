"use client";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedText from "@components/animated-text";
import Progress from "@components/progress";

const AnimatedLoading = () => {
  const count = useMotionValue(0);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const animation = animate(count, 100, { duration: 6 });
    animation.then(() => setReady(true));
    return animation.stop;
  }, []);

  return ready ? <AnimatedText text={"Scuderia Frontend"} /> : <Progress count={count} />;
};
export default AnimatedLoading;
