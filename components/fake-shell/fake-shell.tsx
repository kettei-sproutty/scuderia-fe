"use client";
import { getOS } from "@utils/operating-system";
import React, { ReactNode, useEffect, useRef } from "react";
import ShellInfoBar from "@components/fake-shell/shell-info-bar";

export type ShellMessage = {
  content: ReactNode;
  time: string;
};

type FakeShellProps = {
  messages: ShellMessage[];
};

const FakeShell = ({ messages }: FakeShellProps) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  return (
    <div className=" flex h-full w-full flex-col  rounded-md  border  border-primary-700 bg-primary-950/50 backdrop-blur-lg ">
      <div className="sticky  flex h-8 w-full items-center justify-start gap-2 rounded-t-md border-b  border-primary-700 bg-primary-800 px-4   ">
        <span className="h-3 w-3 rounded-full bg-error" />
        <span className="h-3 w-3 rounded-full bg-warning-light" />
        <span className="h-3 w-3 rounded-full bg-success" />
      </div>

      <div className="no-scrollbar flex  h-full flex-col overflow-auto overflow-y-scroll px-2 ">
        {messages.map((message, idx) => {
          return (
            <div className="p-2 text-sm" key={idx}>
              <ShellInfoBar
                firstSegment={getOS()}
                secondSegment={"scuderia-fe"}
                thirdSegment={message.time}
              />
              <div className={"mt-2 flex gap-4 pl-4"}>
                <div className={"  flex text-lg font-semibold leading-none text-accent-light"}>
                  {"»"}
                </div>

                <div className="flex gap-2 ">{message.content}</div>
              </div>
            </div>
          );
        })}
        <div ref={lastMessageRef} />
      </div>
    </div>
  );
};

export default FakeShell;
