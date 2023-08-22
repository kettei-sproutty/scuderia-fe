import type { PageProps as WorkshopByIdPageProps } from ".next/types/app/workshop/[id]/page";
import { getSupabase } from "@lib/supabase";
import { cookies } from "next/headers";

const WorkshopByIdPage = async ({ params }: WorkshopByIdPageProps) => {
  const supabase = getSupabase("server-component", { cookies });
  const workshop = await supabase.schema("workshop")
    .from("workshop")
    .select("*")
    .eq("id", params.id)
    .single();

  const hosts = await supabase.schema("auth")
    .from("users").select("email").in("id", workshop.data.hosts);

  console.log(hosts);
  return <pre>{JSON.stringify({ ...workshop.data, hosts: hosts.data }, null, 2)}</pre>;
};

export default WorkshopByIdPage
