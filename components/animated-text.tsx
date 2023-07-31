"use client";
import { motion } from "framer-motion";
import { FC } from "react";

type ReflectedTextProps = {
  text: string;
};

const AnimatedText: FC<ReflectedTextProps> = ({ text }) => {
  const letters = text.split("");

  // Variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.7 },
    }),
  };

  // Variants for each letter
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className={"flex flex-col items-center"}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={" flex w-full overflow-hidden font-ferroRosso text-4xl lg:text-9xl"}
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        className={"h-1 bg-redFerrari"}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
      />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 1, delay: 1 } }}
        className={"font-thin uppercase lg:text-2xl"}
      >
        coming soon
      </motion.div>
    </div>
  );
};

export default AnimatedText;
