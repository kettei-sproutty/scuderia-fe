import { Workshop } from "@prisma/client";
import Link from "next/link";

type WorkshopListProps = {
  workshops: Workshop[];
};

const WorkshopList = ({ workshops }: WorkshopListProps) => {
  return (
    <div className="flex flex-col overflow-auto">
      <ul className="flex flex-col gap-10">
        {workshops.map((workshop) => (
          <li className="flex flex-col" key={workshop.id}>
            <span className="w-full border-b">{workshop.date.toLocaleDateString()}</span>
            <div key={workshop.id}>
              <Link
                className="cursor-pointer text-lg font-semibold transition-all hover:text-accent-lighter"
                href={`/workshop/${workshop.id}`}
              >
                {workshop.topic}
              </Link>
              <p>{workshop.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkshopList;
