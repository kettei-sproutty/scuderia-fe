import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { Question, Workshop } from "@prisma/client";
import Link from "next/link";

type WorkshopListProps = {
  workshops: Array<Workshop & { questions: Question[] }>;
};

const WorkshopList = ({ workshops }: WorkshopListProps) => {
  return (
    <div className="flex flex-col  ">
      <ul className="flex flex-col gap-10">
        {workshops.map((workshop) => (
          <li
            className="relative mr-2 flex flex-col rounded-sm border  border-primary-700 bg-primary-800/50 p-4 pt-10  text-white backdrop-blur-lg"
            key={workshop.id}
          >
            <span className="fixed left-0 top-0 w-full border-b border-primary-700 bg-primary-900/50 px-4 py-1 text-sm text-primary-400">
              {workshop.date.toLocaleDateString()}
            </span>
            <div key={workshop.id} className="flex flex-col">
              <div className="flex justify-between ">
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
