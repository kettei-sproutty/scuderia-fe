"use client";

import { Question, Workshop } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

type NextWorkshopProps = {
  nextWorkshop: Workshop & { questions: Question[] };
};
const NextWorkshop = ({ nextWorkshop }: NextWorkshopProps) => {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex w-full flex-col justify-center">
        <h2 className="text-3xl font-semibold text-primary-200"> {nextWorkshop.topic} </h2>
        <p className="text-sm text-primary-400">{nextWorkshop?.description}</p>
      </div>
      {nextWorkshop && (
        <div className="flex h-full w-full flex-col  justify-between">
          <div>
            <h4 className="text-xl font-semibold text-primary-200">Questions</h4>
            <ul className="mb-4 flex flex-col  text-primary-400">
              {nextWorkshop?.questions.map((question) => (
                <li key={question.id}>{question.text}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => router.push(`/workshop/${nextWorkshop.id}`)}
            className=" flex cursor-pointer items-center  gap-2 self-end uppercase text-accent hover:text-accent-light "
          >
            add question
            <ArrowRightIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default NextWorkshop;
