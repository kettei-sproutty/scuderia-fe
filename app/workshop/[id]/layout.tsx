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

  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "UTC",
  });

  return (
    <div className={"flex h-full w-full flex-col items-center justify-between gap-4"}>
      <div className={"flex h-5/6 w-full  justify-between  "}>
        <section className="flex w-1/3 flex-col gap-8">
          <h1 className="text-4xl font-semibold text-accent ">{workshop?.topic}</h1>

          <div>
            {/* <h2 className="text-2xl font-semibold text-primary-500">{workshop?.topic}</h2>*/}

            <h3 className=" text-primary-200"> {formatter.format(workshop?.date)}</h3>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary-500">Hosts</h3>
            {workshop?.hosts && (
              <ul>
                {workshop.hosts.map((host) => (
                  <li className="text-sm text-primary-200" key={host}>
                    {host}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-primary-500">Description</h3>
            <p className="text-sm text-primary-200">{workshop?.description}</p>
          </div>
        </section>
        <div className="flex h-full w-full items-end">{children}</div>
      </div>
      <div className="flex w-full flex-col justify-end gap-8">
        <QuestionForm workshopId={params.id} />
      </div>
    </div>
  );
};

export default WorkshopDetailLayout;
