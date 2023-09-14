"use client";
import { useState } from "react";
import { Step, CodeStep, EmailStep } from "./step";
import { motion } from "framer-motion";
import FakeShell, { ShellMessage } from "@components/fake-shell/fake-shell";
import CardGlass from "@components/card-glass";

const AuthPage = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [step, setStep] = useState<Step>(Step.Email);
  const [shellMessages, setShellMessages] = useState<ShellMessage[]>([
    {
      content: "Welcome to Scuderia-FE",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const updateMessages = (lastMessage: ShellMessage) => {
    setShellMessages((prev) => [...prev, lastMessage]);
  };

  const topLeftStyle = {
    width: "800px",
    height: "800px",
    borderRadius: "50%",
    filter: " blur(150px)",
    backgroundColor: "rgb(255, 67, 75)",
    background: "linear-gradient(#4d5bce, #43d9ad)",
    opacity: 0.3,
    zIndex: -1,
  };

  const bottomRightStyle = {
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    filter: " blur(100px)",
    backgroundColor: "rgb(255, 67, 75)",
    background: "linear-gradient(#43d9ad, #4d5bce)",
    opacity: 0.4,
    zIndex: -1,
  };

  return (
    <div className={" relative flex h-full w-full flex-col justify-center gap-4 "}>
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
      <div className="mx-auto flex  h-full w-full items-center justify-center lg:h-2/3 lg:w-3/5 ">
        <CardGlass title="LOGIN">
          {step === Step.Email ? (
            <EmailStep
              setEmail={setEmail}
              setStep={setStep}
              onFirstFocus={updateMessages}
              onCodeSent={updateMessages}
            />
          ) : (
            <CodeStep email={email} otp={otp} setOtp={setOtp} onError={updateMessages} />
          )}
        </CardGlass>
      </div>
      {/*min and max heigth is necessary to avoid layout shifting when messages are added to the fake shell*/}
      <div className={"flex h-1/3 max-h-[33.333333%] min-h-[33.333333%] w-full"}>
        <FakeShell messages={shellMessages} />
      </div>
    </div>
  );
};

export default AuthPage;
