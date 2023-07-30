"use client";
import { motion } from "framer-motion";
import { FC } from "react";

type ReflectedTextProps = {
  text: string;
};

const AnimatedText: FC<ReflectedTextProps> = ({ text }) => (
  <>
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 2,
        delay: 0.5,
      }}
      className={
        "flex gap-2  border-b-8  border-redFerrari text-center   font-ferroRosso text-5xl text-white lg:text-9xl"
      }
    >
      {text}
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        delay: 3,
      }}
      className={"mt-32 flex text-center text-3xl uppercase text-white lg:text-5xl"}
    >
      Work in progress
    </motion.div>
  </>
);

export default AnimatedText;
