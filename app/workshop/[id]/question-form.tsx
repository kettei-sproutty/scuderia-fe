"use client";

import { createWorkshop } from "app/workshop/[id]/actions";
import Button from "../../../components/button";
import TextArea from "../../../components/text-area";
import { FC } from "react";
import React from "react";
import { ChevronRight } from "lucide-react";

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
    <form
      className="flex items-center justify-between gap-4 rounded-sm border border-primary-700 bg-primary-800/50 p-4  "
      action={saveWorkshop}
    >
      <TextArea
        id="question"
        name="question"
        label="Question"
        value={question}
        placeholder="What do you want to ask?"
        onChange={handleQuestionChange}
      />
      <Button type="submit" disabled={!question} size={"lg"}>
        <ChevronRight />
      </Button>
    </form>
  );
};

export default QuestionForm;
