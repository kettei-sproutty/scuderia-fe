import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { cameoOptions } from "@utils/cameo";
import { cn } from "@utils/cn";

type EasterEggProps = {
  disableCameo: () => void;
  email: string;
};

const EasterEgg = ({ disableCameo, email }: EasterEggProps) => {
  const [showEasterEgg, setShowEasterEgg] = useState(true);
  const [endAnimation, setEndAnimation] = useState(false);

  setTimeout(() => {
    setShowEasterEgg(false);
    disableCameo();
  }, 3000);

  setTimeout(() => {
    setEndAnimation(true);
  }, 2500);

  return (
    <React.Fragment>
      {showEasterEgg && (
        <motion.div
          className={cn(
            `fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-${cameoOptions[email].color} to-black backdrop-blur-lg`,
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: !endAnimation ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image
            width={500}
            height={500}
            src={cameoOptions[email].image}
            alt="funny image about the user"
          />
        </motion.div>
      )}
    </React.Fragment>
  );
};

export default EasterEgg;
