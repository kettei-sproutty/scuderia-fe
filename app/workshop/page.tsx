import { PrismaClient } from "@prisma/client";
import client from "@lib/db";
import Link from "next/link";
import WorkshopList from "./workshop-list";
import { Tabs } from "@components/tabs";

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
    include: {
      questions: true,
    },
  });

  const upcomingWorkshop = await client.workshop.findMany({
    where: {
      date: {
        gt: today,
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      questions: true,
    },
  });

  return (
    <Tabs
      defaultValue="Upcoming"
      tabs={[
        {
          name: "Upcoming",
          content:
            upcomingWorkshop.length > 0 ? (
              <div>
                <WorkshopList workshops={upcomingWorkshop} />
              </div>
            ) : (
              <h2>No upcoming workshops</h2>
            ),
        },
        {
          name: "Past",
          content:
            pastWorkshops.length === 0 ? (
              <h2>No Past workshops</h2>
            ) : (
              <WorkshopList workshops={pastWorkshops} />
            ),
        },
      ]}
    />
  );
};

export default WorkshopPage;
