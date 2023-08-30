"use server";
import { authentication } from "@lib/authentication";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export const verifyOTP = async (formData: FormData, email: string) => {
  const code = formData.get("code")?.toString();

  if (!code || !email) throw new Error("Code is required");

  const authenticationHelper = authentication("route-handler", cookies);
  try {
    const { data } = await authenticationHelper.verifyOtp({
      token: code,
      type: "email",
      email,
    });

    console.log(">>> SUCCESS <<< verify OTP", data);

    if (!data.user || !data.session) throw new Error("Failed to verify OTP");

    await authenticationHelper.updateSession({ user: data.user, session: data.session });
  } catch (error) {
    console.log(">>> ERROR <<< verify OTP", error);
    throw new Error("Failed to verify OTP");
  }
};
