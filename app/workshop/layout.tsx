import { PropsWithChildren } from "react";

const WorkshopListLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full  flex-col gap-4 px-32">
      <h1 className="text-2xl font-bold">Workshops</h1>
      {children}
    </div>
  );
};

export default WorkshopListLayout;
