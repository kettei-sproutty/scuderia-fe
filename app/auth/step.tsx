"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import type { Dispatch, SetStateAction } from "react";
import Button from "@components/button";
import InputText from "@components/input";
import { sendOTPEmail, verifyOTP } from "./actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { z } from "zod";
import React, { useEffect } from "react";
import OtpInput from "@components/otp-input";
import { ShellMessage } from "@components/fake-shell/fake-shell";
import { composeMessage } from "@utils/shell-messages";

export enum Step {
  Email,
  Code,
}

export type EmailStepProps = {
  setEmail: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<Step>>;
  onFirstFocus: (msg: ShellMessage) => void;
  onCodeSent: (msg: ShellMessage) => void;
};

export const EmailStep = ({ setEmail, setStep, onFirstFocus, onCodeSent }: EmailStepProps) => {
  const { pending } = useFormStatus();
  const [error, setError] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    onFirstFocus(
      composeMessage(
        "Insert YOUR Enterprise ID to log in. Or someone else's if you wanna clog up their mailbox",
      ),
    );
    document.getElementById("email")?.focus();
  }, []);

  const mailSchema = z
    .string()
    .regex(/^[a-zA-Z.]*$/, { message: "Only letters and dots are allowed" })
    .optional();
  const sendOtp = async (formData: FormData) => {
    try {
      const email = formData.get("email");
      if (!email) throw { message: "email is required" };

      await sendOTPEmail(formData);
      onCodeSent(
        composeMessage(
          "We sent you a code. Even if it's ULTRA MEGA SECRET you still have to provide it",
        ),
      );
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
      initial={{ scale: 0.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="login-form"
      action={sendOtp}
    >
      <InputText
        id="email"
        name="email"
        label="EID"
        suffix="@accenture.com"
        placeholder="john.doe"
        error={error}
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
      <div className={"flex w-full justify-center"}>
        <Button disabled={pending} type="submit">
          Send code
        </Button>
      </div>
    </motion.form>
  );
};

export type CodeStepProps = {
  email: string;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  onError: (msg: ShellMessage) => void;
};

export const CodeStep = ({ email, otp, setOtp, onError }: CodeStepProps) => {
  const { pending } = useFormStatus();
  const router = useRouter();

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
  };

  const verifyOtp = async () => {
    try {
      await verifyOTP(otp, email);
      router.push("/");
    } catch (error) {
      // TODO: handle error
      onError(composeMessage("Wrong Code, It's so secret that you forgot it already?"));
      console.error(">>> VERIFY OTP <<< ERROR", error);
      return;
    }
  };

  return (
    <motion.form
      initial={{ scale: 0.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="login-form"
      action={verifyOtp}
    >
      <OtpInput onOtpChange={handleOtpChange} />
      <div className={"flex w-full justify-center"}>
        <Button disabled={pending} type="submit">
          Verify
        </Button>
      </div>
    </motion.form>
  );
};
