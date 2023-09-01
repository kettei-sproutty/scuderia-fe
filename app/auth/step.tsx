"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import type { Dispatch, SetStateAction } from "react";
import Button from "@components/button";
import InputText from "@components/input";
import { sendOTPEmail, verifyOTP } from "./actions";
import { useRouter } from "next/navigation";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

export enum Step {
  Email,
  Code,
}

export type EmailStepProps = {
  setEmail: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<Step>>;
};

export const EmailStep = ({ setEmail, setStep }: EmailStepProps) => {
  const { pending } = useFormStatus();

  const sendOtp = async (formData: FormData) => {
    try {
      const email = formData.get("email");
      if (!email) throw { message: "email is required" };

      await sendOTPEmail(formData);

      setEmail(email.toString());
      setStep(Step.Code);
    } catch (error) {
      console.error(">>> SEND OTP <<< ERROR", error);
      // TODO: handle error
      return;
    }
  };

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
        <motion.form
          className={
            "flex  h-full w-1/3 flex-col items-center justify-center gap-8 rounded-sm border  bg-primary-400 bg-opacity-5 p-4 backdrop-blur"
          }
          action={sendOtp}
          initial={{ opacity: 0, x: "110%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 2,
            delay: 0.5,
            x: { delay: 1.5 },
          }}
        >
          <InputText id="email" name="email" label="email" />
          <div className={"w-full"}>
            <Button disabled={pending} type="submit">
              <ArrowRightOnRectangleIcon className={"h-4"} />
              Login
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export type CodeStepProps = {
  email: string;
};

export const CodeStep = ({ email }: CodeStepProps) => {
  const { pending } = useFormStatus();
  const router = useRouter();

  const verifyOtp = async (formData: FormData) => {
    try {
      const code = formData.get("code");
      if (!code) throw { message: "code is required" };

      await verifyOTP(formData, email);
      router.push("/");
    } catch (error) {
      // TODO: handle error
      console.error(">>> VERIFY OTP <<< ERROR", error);
      return;
    }
  };

  return (
    <div>
      <p>Enter the code sent to {email}</p>
      <form action={verifyOtp}>
        <InputText id="code" name="code" label="code" />
        <Button disabled={pending} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
