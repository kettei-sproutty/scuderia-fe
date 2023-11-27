"use client";
import Button from "@components/button";
import InputText from "@components/input";
import { Select } from "@components/select";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const CreateSurvey = () => {
  const { control, register, getValues } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "questions",
  });

  const addQuestion = () => {
    append({ type: "", question: "" });
  };

  const sendSurvey = async (formData: FormData) => {};

  return (
    <form className="flex h-full flex-col items-center gap-4 text-center" action={sendSurvey}>
      <InputText {...register("title")} id="title" label="Title" placeholder="Insert the title" />
      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            ref={ref}
            value={value}
            name="type"
            onChange={onChange}
            onBlur={onBlur}
            label="Type"
            id="type"
            placeholder="Select the type"
            options={[
              { text: "Text", value: "text" },
              { text: "Single choice", value: "s-choice" },
              { text: "Multiple choice", value: "m-choice" },
            ]}
          />
        )}
      />

      {fields.map((field, index) => (
        <div key={field.id} className="flex w-full justify-between gap-4">
          <InputText
            id={`question-${index}-question`}
            label="Question"
            {...register(`questions.${index}.question`)}
          />
          <InputText
            id={`question-${index}-type`}
            label="Type"
            {...register(`questions.${index}.type`)}
          />
        </div>
      ))}
      <Button onClick={() => addQuestion()}>Add question</Button>
    </form>
  );
};

export default CreateSurvey;
