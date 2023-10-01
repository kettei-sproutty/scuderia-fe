"use client";

import React, { ReactNode } from "react";
import Button from "./button";

type CardProps = {
  title?: string;
  children: ReactNode;
  confirmAction?: { label: string; action: () => void };
  cancelAction?: { label: string; action: () => void };
  titleAction?: ReactNode;
};

const Card = ({ children, title, confirmAction, cancelAction, titleAction }: CardProps) => {
  return (
    <div className="w-full rounded-md border border-primary-700 bg-primary-900/50 text-primary-100 transition-all duration-300  ease-in hover:transition-all">
      {title && (
        <div className="flex items-center justify-between rounded-t-sm bg-primary-900/50 p-2 font-semibold">
          {title} {titleAction && titleAction}
        </div>
      )}
      {children && <div className="bg-primary-800/50 p-4">{children}</div>}
      {confirmAction && (
        <div className="flex justify-around gap-2 bg-primary-700 p-4">
          {cancelAction && (
            <Button variant="outlined" onClick={cancelAction.action}>
              {cancelAction.label}
            </Button>
          )}
          {confirmAction && <Button onClick={confirmAction.action}>{confirmAction.label}</Button>}
        </div>
      )}
    </div>
  );
};

export default Card;
