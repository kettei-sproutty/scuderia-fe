import { motion, MotionValue, useTransform } from "framer-motion";
import { FC } from "react";

type ProgressProps = {
  count: MotionValue<number>;
};

const Progress: FC<ProgressProps> = ({ count }) => {
  const rounded = useTransform(count, Math.round);
  const width = useTransform(count, (v) => `${v}%`);

  return (
    <>
      <div className={"flex w-32  justify-end gap-1 text-right"}>
        <motion.h1 className={"text-5xl"}>{rounded}</motion.h1>
        <span className={"text-3xl text-redFerrari"}>%</span>
      </div>
      <div className={"h-2 w-32 rounded bg-gray-600"}>
        <motion.div className={"h-2 rounded bg-redFerrari"} style={{ width: width }} />
      </div>
    </>
  );
};

export default Progress;
