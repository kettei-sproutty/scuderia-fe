import React, { ReactNode } from "react";
import Button from "./button";

type CardProps = {
  title?: string;
  children: ReactNode;
  confirmAction?: { label: string; action: () => void };
  cancelAction?: { label: string; action: () => void };
};

const Card = ({ children, title, confirmAction, cancelAction }: CardProps) => {
  return (
    <div className="w-full rounded-sm bg-primary-700 text-primary-100">
      {title && <div className="bg-primary-600 p-2 font-semibold">{title}</div>}
      {children && <div className="p-4">{children}</div>}
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
