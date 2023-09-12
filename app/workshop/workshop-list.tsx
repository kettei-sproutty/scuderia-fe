import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { Question, Workshop } from "@prisma/client";
import Link from "next/link";

type WorkshopListProps = {
  workshops: Array<Workshop & { questions: Question[] }>;
};

const WorkshopList = ({ workshops }: WorkshopListProps) => {
  console.log(workshops);
  return (
    <div className="flex flex-col overflow-auto">
      <ul className="flex flex-col gap-10">
        {workshops.map((workshop) => (
          <li className="flex flex-col" key={workshop.id}>
            <span className="w-full border-b">{workshop.date.toLocaleDateString()}</span>
            <div key={workshop.id} className="flex flex-col">
              <div className="flex justify-between pr-2">
                <Link
                  className="cursor-pointer text-lg font-semibold transition-all hover:text-accent-lighter"
                  href={`/workshop/${workshop.id}`}
                >
                  {workshop.topic}
                </Link>
                <span className="flex items-center justify-center">
                  <ChatBubbleLeftIcon className={"mr-2 h-4"} />
                  {workshop.questions.length}
                </span>
              </div>
              <p>{workshop.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkshopList;
