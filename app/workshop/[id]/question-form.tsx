"use client";

import { createWorkshop } from "app/workshop/[id]/actions";
import Button from "../../../components/button";
import TextArea from "../../../components/text-area";
import { FC } from "react";
import React from "react";

type QuestionFormProps = {
  workshopId: string;
};
const QuestionForm: FC<QuestionFormProps> = ({ workshopId }) => {
  const [question, setQuestion] = React.useState("");

  const saveWorkshop = async (formData: FormData) => {
    try {
      const questionText = formData.get("question");
      if (!questionText) throw { message: "question is required" };

      await createWorkshop(questionText.toString(), workshopId);
      setQuestion("");
    } catch (error) {
      console.error(">>> Create Question <<< ERROR", error);
      // TODO: handle error
      return;
    }
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  return (
    <form className="flex flex-col items-end gap-2" action={saveWorkshop}>
      <TextArea
        id="question"
        name="question"
        label="Question"
        value={question}
        placeholder="What do you want to ask?"
        onChange={handleQuestionChange}
        required
      />
      <div className="w-1/5">
        <Button type="submit" disabled={!question}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
