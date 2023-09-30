"use client";
import { createRef, useEffect, useState } from "react";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";

type OtpInputProps = {
  onOtpChange: (value: string) => void;
};

const OtpInput = ({ onOtpChange }: OtpInputProps) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const otpInputRefs = Array(6)
    .fill(0)
    .map(() => createRef<HTMLInputElement>());

  const handleChange = (value: string, index: number) => {
    if (!isNaN(parseInt(value))) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Focus on the next field if available
      if (index < otpValues.length - 1 && otpInputRefs[index + 1].current) {
        otpInputRefs[index + 1]?.current?.focus();
      }
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text/plain").trim();
    if (pasteData.length !== 6) return;

    const newOtpValues = [...otpValues];

    pasteData.split("").forEach((value, index) => {
      if (!isNaN(parseInt(value))) {
        newOtpValues[index] = value;
      }
    });

    setOtpValues(newOtpValues);
    otpInputRefs[otpValues.length - 1].current?.focus();
  };

  useEffect(() => {
    otpInputRefs[0]?.current?.focus();
  }, []);

  useEffect(() => {
    onOtpChange(otpValues.join(""));
  }, [otpValues]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      if (index === 0) {
        // If it's the first field, clear the value
        const newOtpValues = [...otpValues];
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);
      } else if (otpValues[index] === "") {
        // If the current field is empty, delete the value of the previous field
        const newOtpValues = [...otpValues];
        newOtpValues[index - 1] = "";
        setOtpValues(newOtpValues);
        otpInputRefs[index - 1].current?.focus();
      } else {
        // If the current field is not empty, delete the character
        const newOtpValues = [...otpValues];
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);
      }
    }
  };

  return (
    <div className="flex justify-center gap-4 text-lg font-bold text-primary-500">
      {otpValues.map((val, idx) => (
        <input
          className="h-8 w-8 rounded-sm bg-primary-800  text-center ring ring-primary-700 focus-within:ring-2  focus-within:ring-primary-200 hover:ring-2 hover:ring-primary-200 focus:outline-none lg:h-12 lg:w-12"
          key={idx}
          maxLength={1}
          value={val}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => handleChange(ev.target.value, idx)}
          onKeyDown={(ev: KeyboardEvent<HTMLInputElement>) => handleKeyDown(ev, idx)}
          onPaste={handlePaste}
          ref={otpInputRefs[idx]}
        />
      ))}
    </div>
  );
};

export default OtpInput;
