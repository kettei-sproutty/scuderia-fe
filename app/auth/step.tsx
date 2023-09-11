"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import type { Dispatch, SetStateAction } from "react";
import Button from "@components/button";
import InputText from "@components/input";
import { sendOTPEmail, verifyOTP } from "./actions";
import { useRouter } from "next/navigation";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { z } from "zod";
import React from "react";

export enum Step {
  Email,
  Code,
}

export type EmailStepProps = {
  setEmail: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<Step>>;
  onFocus: () => void;
  onBlur: () => void;
};

export const EmailStep = ({ setEmail, setStep, onFocus, onBlur }: EmailStepProps) => {
  const { pending } = useFormStatus();
  const [error, setError] = React.useState<string | undefined>(undefined);

  const mailSchema = z
    .string()
    .regex(/^[a-zA-Z.]*$/, { message: "Only letters and dots are allowed" })
    .optional();
  const sendOtp = async (formData: FormData) => {
    try {
      const email = formData.get("email");
      if (!email) throw { message: "email is required" };

      await sendOTPEmail(formData);

      setEmail(`${email.toString()}@accenture.com`);
      setStep(Step.Code);
    } catch (error) {
      console.error(">>> SEND OTP <<< ERROR", error);
      // TODO: handle error
      return;
    }
  };

  return (
    <motion.form
      className={
        "flex  h-full w-1/3 flex-col items-center justify-center gap-8 rounded-md border border-[.5] border-primary-700 bg-primary-800/50   p-4 backdrop-blur"
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
      <InputText
        id="email"
        name="email"
        label="EID"
        suffix="@accenture.com"
        placeholder="john.doe"
        error={error}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => {
          try {
            mailSchema.parse(e.target.value);
            setError(undefined);
          } catch (err) {
            if (err instanceof z.ZodError) {
              setError(err.errors[0].message);
            }
          }
        }}
      />
      <div className={"flex w-full justify-end"}>
        <Button disabled={pending} type="submit">
          <ArrowRightOnRectangleIcon className={"h-4"} />
          Login
        </Button>
      </div>
    </motion.form>
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
    <motion.form
      className={
        "flex  h-full w-1/3 flex-col items-center justify-center gap-8 rounded-sm border  bg-primary-800/50  p-4 "
      }
      action={verifyOtp}
      initial={{ opacity: 0, x: "110%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 2,
        delay: 0.5,
        x: { delay: 1.5 },
      }}
    >
      <InputText id="code" name="code" label="code" />
      <div className={"flex w-full justify-end"}>
        <Button disabled={pending} type="submit">
          Submit
        </Button>
      </div>
    </motion.form>
  );
};
