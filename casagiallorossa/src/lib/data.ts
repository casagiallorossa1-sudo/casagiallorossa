import { supabasePublic } from "@/lib/supabase/public";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type CityRow = {
  id: string;
  slug: string;
  name: string;
  country: string;
  timezone: string;
  primary_language: string;
  whatsapp_url: string | null;
  telegram_url: string | null;
};

export async function getCities(): Promise<CityRow[]> {
  const sb = supabasePublic();
  const { data, error } = await sb
    .from("cities")
    .select("id,slug,name,country,timezone,primary_language,whatsapp_url,telegram_url")
    .order("name");
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getCityBySlug(slug: string): Promise<CityRow | null> {
  const sb = supabasePublic();
  const { data, error } = await sb
    .from("cities")
    .select("id,slug,name,country,timezone,primary_language,whatsapp_url,telegram_url")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data || null;
}

export type VenueRow = {
  id: string;
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  notes: string | null;
};

export type DoorRow = {
  door_id: string;
  label: string;
  status: string;
  city: CityRow;
  venue: VenueRow | null;
};

export async function getDoorByDoorId(doorId: string): Promise<DoorRow | null> {
  const sb = supabasePublic();
  const { data, error } = await sb
    .from("doors")
    .select(`
      door_id,
      label,
      status,
      city:city_id ( id, slug, name, country, timezone, primary_language, whatsapp_url, telegram_url ),
      venue:primary_venue_id ( id, name, address, lat, lng, notes )
    `)
    .eq("door_id", doorId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  // Normalize typing
  return {
    door_id: data.door_id,
    label: data.label,
    status: data.status,
    city: data.city,
    venue: data.venue ?? null,
  } as DoorRow;
}

export async function getDoorsByCitySlug(citySlug: string): Promise<DoorRow[]> {
  const sb = supabasePublic();
  // fetch city id first
  const city = await getCityBySlug(citySlug);
  if (!city) return [];
  const { data, error } = await sb
    .from("doors")
    .select(`
      door_id,
      label,
      status,
      city:city_id ( id, slug, name, country, timezone, primary_language, whatsapp_url, telegram_url ),
      venue:primary_venue_id ( id, name, address, lat, lng, notes )
    `)
    .eq("city_id", city.id)
    .order("door_id");
  if (error) throw new Error(error.message);
  return (data || []).map((d: any) => ({
    door_id: d.door_id,
    label: d.label,
    status: d.status,
    city: d.city,
    venue: d.venue ?? null,
  })) as DoorRow[];
}

export async function countCheckinsLast24h(doorId: string): Promise<number> {
  const sb = supabaseAdmin();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count, error } = await sb
    .from("checkins")
    .select("id", { count: "exact", head: true })
    .eq("door_id", doorId)
    .gte("created_at", since);

  if (error) throw new Error(error.message);
  return count ?? 0;
}
