"use client";
import { CodeBracketIcon } from "@heroicons/react/20/solid";
import React from "react";

type ShellInfoBarProps = {
  secondSegment: string;
  thirdSegment: string;
};
const ShellInfoBar = ({ secondSegment, thirdSegment }: ShellInfoBarProps) => {
  return (
    <div className="flex">
      <div className=" flex h-5 items-center rounded-l-sm bg-primary-800 px-2 text-center text-xs text-white">
        <CodeBracketIcon className="h-4" />
      </div>
      <div className="h-0 w-0 border-[10px] border-b-primary-800 border-l-primary-800 border-r-primary-700 border-t-primary-700" />

      <div className=" flex h-5 items-center rounded-l-sm bg-primary-700 px-2 text-center text-xs text-white">
        {secondSegment}
      </div>
      <div className="h-0 w-0 border-[10px] border-b-primary-700 border-l-primary-700 border-r-primary-500 border-t-primary-500" />
      <div className=" flex h-5 items-center rounded-r-sm bg-primary-500 px-2 text-center text-xs text-white ">
        {thirdSegment}
      </div>
    </div>
  );
};

export default ShellInfoBar;
