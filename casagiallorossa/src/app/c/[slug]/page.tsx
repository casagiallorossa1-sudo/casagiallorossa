import Link from "next/link";
import { getCityBySlug, getDoorsByCitySlug, countCheckinsLast24h } from "@/lib/data";
import { defaultChat, chatLabel } from "@/lib/utils/chat";

export default async function CityPage({ params }: { params: { slug: string } }) {
  const city = await getCityBySlug(params.slug);
  if (!city) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        <div className="font-semibold">Città non trovata</div>
        <Link href="/cities" className="mt-3 inline-block text-sm underline">Torna alle città</Link>
      </div>
    );
  }

  const doors = await getDoorsByCitySlug(city.slug);
  const chat = defaultChat(city);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Casa Giallorossa a {city.name}</h1>
        <div className="mt-2 text-sm text-neutral-700">Dove vedere la Roma con altri romanisti. Check-in live e chat matchday.</div>
        <div className="mt-4 flex flex-wrap gap-3">
          {chat && (
            <a href={chat} target="_blank" rel="noreferrer"
               className="rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white">
              Unisciti alla chat ({chatLabel(city)})
            </a>
          )}
          <Link href="/open-a-door" className="rounded-2xl border px-4 py-3 text-sm font-semibold">Apri una Porta</Link>
        </div>
      </section>

      <section className="space-y-3">
        <div className="text-sm font-semibold">Porte</div>
        <div className="grid grid-cols-1 gap-3">
          {doors.map(async (d) => {
            const count = await countCheckinsLast24h(d.door_id);
            const venue = d.venue;
            return (
              <Link key={d.door_id} href={`/d/${d.door_id}`} className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow transition">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">{d.city.name} • {d.label}</div>
                    <div className="mt-1 text-xs text-neutral-600">
                      {venue ? `Venue: ${venue.name}` : "Venue: da impostare"}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-700">
                    Check-in 24h: <span className="font-semibold text-black">{count}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
