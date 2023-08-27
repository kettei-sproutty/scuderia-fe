"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import { Step, CodeStep, EmailStep } from "./step";

const AuthPage = () => {
  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<Step>(Step.Email);

  switch (step) {
    case Step.Email:
      return <EmailStep setEmail={setEmail} setStep={setStep} />;
    case Step.Code:
      return <CodeStep email={email} setStep={setStep} />;
    default:
      notFound();
  }
};

export default AuthPage;
