"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import Button from "@components/button";
import InputText from "@components/input";
import { sendOTPEmail, verifyOTP } from "./actions";
import { redirect } from "next/navigation";

export enum Step {
  Email,
  Code,
}

export type EmailStepProps = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
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
      // TODO: handle error
      return;
    }
  };

  return (
    <form action={sendOtp}>
      <InputText id="email" name="email" label="email" />
      <Button disabled={pending} type="submit">
        Submit
      </Button>
    </form>
  );
};

export type CodeStepProps = {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};

export const CodeStep = ({ email }: CodeStepProps) => {
  const { pending } = useFormStatus();

  const verifyOtp = async (formData: FormData) => {
    try {
      const code = formData.get("code");
      if (!code) throw { message: "code is required" };

      await verifyOTP(formData, email);
      redirect("/");
    } catch (error) {
      // TODO: handle error
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
