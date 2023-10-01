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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.01,
      },
    },
  };

  // Variants for each letter
  const child = (i: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: i * 0.01, // multiply the index by a small delay value
      },
    },
  });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={" flex w-full flex-wrap overflow-hidden "}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child(index)} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
