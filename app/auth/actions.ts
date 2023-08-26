"use server";
import { authentication } from "@lib/authentication";
import { cookies } from "next/headers";

export const sendOTPEmail = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  if (!email) throw new Error("Email is required");

  const authenticationHelper = authentication("route-handler", cookies);
  try {
    await authenticationHelper.signIn({ email });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send OTP");
  }
};

export const verifyOTP = async (formData: FormData) => {
  const code = formData.get("code")?.toString();
  const email = formData.get("email")?.toString();

  if (!code || !email) throw new Error("Code is required");

  const authenticationHelper = authentication("route-handler", cookies);
  try {
    await authenticationHelper.verifyOtp({ token: code, type: "email", email });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to verify OTP");
  }
};
