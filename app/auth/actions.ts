"use server";
import { authentication } from "@lib/authentication";
import { getURL } from "@lib/url";
import { cookies } from "next/headers";

export const sendOTPEmail = async (formData: FormData) => {
  const email = `${formData.get("email")?.toString()}@accenture.com`;
  if (!email) throw new Error("Email is required");

  const authenticationHelper = authentication("server-action", cookies);
  try {
    const emailRedirectTo = getURL("auth/callback");

    const { data, error } = await authenticationHelper.signIn({
      email,
      options: {
        emailRedirectTo,
      },
    });
    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send OTP");
  }
};

export const verifyOTP = async (code: string, email: string) => {
  if (!code || !email) throw new Error("Code is required");

  const authenticationHelper = authentication("server-action", cookies);
  try {
    const { data } = await authenticationHelper.verifyOtp({
      token: code,
      type: "email",
      email,
    });

    if (!data.user || !data.session) throw new Error("Failed to verify OTP");

    await authenticationHelper.updateSession({
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to verify OTP");
  }
};
