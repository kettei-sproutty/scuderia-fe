import { PrismaClient } from "@prisma/client";
import client from "@lib/db";
import Link from "next/link";

const WorkshopPage = async () => {
  const today = new Date().toISOString();

  const pastWorkshops = await client.workshop.findMany({
    where: {
      date: {
        lt: today,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  const upcomingWorkshop = await client.workshop.findFirst({
    where: {
      date: {
        gt: today,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <div>
      <h1>Upcoming Workshop</h1>
      {upcomingWorkshop ? (
        <div>
          <Link href={`/workshop/${upcomingWorkshop.id}`}>{upcomingWorkshop.topic}</Link>
        </div>
      ) : (
        "No upcoming workshops"
      )}
      <h1>Past Workshops</h1>
      {pastWorkshops.length === 0
        ? "No past workshops"
        : pastWorkshops.map((workshop) => {
            return (
              <div key={workshop.id}>
                <Link href={`/workshop/${workshop.id}`}>{workshop.topic}</Link>
              </div>
            );
          })}
    </div>
  );
};

export default WorkshopPage;
