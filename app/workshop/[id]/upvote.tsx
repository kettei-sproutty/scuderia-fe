"use client";

import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import { updateUpvoteQuestion } from "./actions";
import React from "react";
import clsx from "clsx";

type UpvoteProps = {
  questionId: string;
  questionUpvotes: string[];
  workshopId: string;
  profileId: string;
};

const Upvote = ({ questionId, questionUpvotes, workshopId, profileId }: UpvoteProps) => {
  const [upvoted, setUpvoted] = React.useState(questionUpvotes.includes(profileId));

  const upvoteQuestion = async () => {
    try {
      await updateUpvoteQuestion(questionId, workshopId, questionUpvotes);
      setUpvoted(!upvoted);
    } catch (error) {
      console.error(">>> UPVOTE QUESTION <<< ERROR", error);
      // TODO: handle error
      return;
    }
  };

  return (
    <button
      type="button"
      className={clsx(
        `flex items-center gap-1 border-none bg-transparent py-0 transition-all hover:text-accent-light disabled:text-accent-light`,
        { "text-accent-light": upvoted },
      )}
      onClick={upvoteQuestion}
    >
      <ArrowUpCircleIcon className={"h-6"} />{" "}
      {questionUpvotes && questionUpvotes.length > 0 && <span>( {questionUpvotes.length} )</span>}
    </button>
  );
};

export default Upvote;
