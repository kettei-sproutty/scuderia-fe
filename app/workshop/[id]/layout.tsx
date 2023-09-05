import client from "@lib/db";
import QuestionForm from "./question-form";
import { PropsWithChildren } from "react";

type WorkshopByIdPageProps = {
  params: {
    id: string;
  };
} & PropsWithChildren;

const WorkshopDetailLayout = async ({ params, children }: WorkshopByIdPageProps) => {
  const workshop = await client.workshop.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div className={"flex h-full w-full items-center justify-center gap-4"}>
      <div className={"h-full w-1/3 rounded-sm border  p-4"}>
        <h1 className="text-xl">{workshop?.topic}</h1>
        <p>{workshop?.description}</p>
      </div>
      <div className="flex h-full w-2/3 flex-col gap-6">
        <QuestionForm workshopId={params.id} />
        {children}
      </div>
    </div>
  );
};

export default WorkshopDetailLayout;
