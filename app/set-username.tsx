"use client";
import Button from "@components/button";
import CardGlass from "@components/card-glass";
import InputText from "@components/input";
import { updateUsername } from "./actions";

const SetUsername = () => {
  const setUsername = async (formData: FormData) => {
    try {
      const username = formData.get("username");
      if (!username) throw { message: "username is required" };

      await updateUsername(formData);
    } catch (error) {
      console.error(">>> Update username <<< ERROR", error);
      // TODO: handle error
      return;
    }
  };
  return (
    <div className="mx-auto flex  h-full w-full items-center justify-center lg:h-fit lg:w-2/5 ">
      <CardGlass title="Set your username">
        <form className="flex flex-col items-end justify-center gap-4 pt-2" action={setUsername}>
          <InputText name="username" id="username" label="Username" />
          <Button>Set</Button>
        </form>
      </CardGlass>
    </div>
  );
};

export default SetUsername;
