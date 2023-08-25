import { getSupabase } from "@lib/supabase";
import { cookies } from "next/headers";
import Link from "next/link";

const WorkshopPage = async () => {
  const today = new Date().toISOString();

  const supabase = getSupabase("server-component", { cookies });
  const pastWorkshops = await supabase
    .schema("workshop")
    .from("workshop")
    .select("*")
    .lt("date", today)
    .order("date", { ascending: false });

  const upcomingWorkshop = await supabase
    .schema("workshop")
    .from("workshop")
    .select("*")
    .gte("date", today)
    .order("date", { ascending: true })
    .single();

  return (
    <div>
      <h1>Upcoming Workshop</h1>
      {upcomingWorkshop.data ? (
        <div>
          <Link href={`/workshop/${upcomingWorkshop.data.id}`}>{upcomingWorkshop.data.topic}</Link>
        </div>
      ) : (
        "No upcoming workshops"
      )}
      <h1>Past Workshops</h1>
      {pastWorkshops.data?.length === 0
        ? "No past workshops"
        : pastWorkshops.data?.map((workshop) => {
            return (
              <div key={workshop.id}>
                <Link href={`/workshop/${workshop.id}`}>{workshop.title}</Link>
              </div>
            );
          })}
    </div>
  );
};

export default WorkshopPage;
