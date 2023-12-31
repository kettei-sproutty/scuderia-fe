import { PropsWithChildren } from "react";

const WorkshopListLayout = async ({ children }: PropsWithChildren) => {
  return <div className="flex h-full  flex-col gap-4">{children}</div>;
};

export default WorkshopListLayout;
