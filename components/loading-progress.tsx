import { motion, MotionValue, useTransform } from "framer-motion";
import { FC } from "react";

type ProgressProps = {
  count: MotionValue<number>;
};

const LoadingProgress: FC<ProgressProps> = ({ count }) => {
  const rounded = useTransform(count, Math.round);
  const width = useTransform(count, (v) => `${v}%`);

  return (
    <>
      <div className={"flex w-32 justify-end "}>
        <motion.h1 className={"px-1  text-5xl font-thin"}>{rounded}</motion.h1>
        <span className={" text-3xl font-thin  text-redFerrari"}>%</span>
      </div>
      <div className={"mt-1 h-1 w-32  bg-gray-600"}>
        <motion.div className={"h-1 bg-redFerrari"} style={{ width: width }} />
      </div>
    </>
  );
};

export default LoadingProgress;
