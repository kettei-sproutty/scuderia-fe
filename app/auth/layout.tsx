"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const topLeftStyle = {
    width: "800px",
    height: "800px",
    borderRadius: "50%",
    // rotateX: rotateX,
    // rotateY: rotateY,
    filter: " blur(150px)",
    backgroundColor: "rgb(255, 67, 75)",
    background: "linear-gradient(#4d5bce, #43d9ad)",
    opacity: 0.3,
  };

  const bottomRightStyle = {
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    // rotateX: rotateX,
    // rotateY: rotateY,
    filter: " blur(100px)",
    backgroundColor: "rgb(255, 67, 75)",
    background: "linear-gradient(#43d9ad, #4d5bce)",
    opacity: 0.4,
  };

  return (
    <div
      className={" relative flex h-full w-full justify-center "}
      // onMouseMove={handleMouse}
    >
      <motion.div
        animate={{ scale: [0.8, 1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={"absolute left-[-200px] top-[-300px]"}
        style={topLeftStyle}
      />

      <motion.div
        animate={{ scale: [1, 1.2] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={"absolute bottom-0 right-0"}
        style={bottomRightStyle}
      />

      <div className={"flex h-full w-full  items-center justify-center gap-4"}>
        {/*<div className={"text-3xl uppercase text-primary-500"}>Welcome to scuderia frontend</div>*/}
        <motion.div
          className={"h-full w-2/3 rounded-sm border bg-primary-600 bg-opacity-10 backdrop-blur-xl"}
          // initial={{ y: "110%" }}
          // animate={{ y: 0 }}
          // transition={{
          //   duration: 1,
          //   delay: 0.5,
          //   y: {  delay: 1.5 },
          // }}
        ></motion.div>
        {children}
      </div>
    </div>
  );
}
