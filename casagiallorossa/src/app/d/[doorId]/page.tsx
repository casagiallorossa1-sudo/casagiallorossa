import Link from "next/link";
import { getDoorByDoorId, countCheckinsLast24h } from "@/lib/data";
import { defaultChat, chatLabel } from "@/lib/utils/chat";
import { CheckInButton } from "@/components/CheckInButton";

export default async function DoorPage({ params }: { params: { doorId: string } }) {
  const door = await getDoorByDoorId(params.doorId);
  if (!door) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        <div className="font-semibold">Porta non trovata</div>
        <Link href="/" className="mt-3 inline-block text-sm underline">Torna alla home</Link>
      </div>
    );
  }

  const chat = defaultChat(door.city);
  const venue = door.venue;
  const count = await countCheckinsLast24h(door.door_id);

  const mapsUrl = venue
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`
    : null;

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="text-xs text-neutral-600">Casa Giallorossa</div>
        <h1 className="mt-1 text-2xl font-semibold">{door.city.name}</h1>
        <div className="mt-1 text-sm text-neutral-700">{door.label} • ID: {door.door_id}</div>
      </section>

      <section className="rounded-3xl border bg-white p-6 shadow-sm space-y-3">
        <div className="text-sm font-semibold">Dove si vede</div>
        {venue ? (
          <div className="space-y-2">
            <div className="font-semibold">{venue.name}</div>
            <div className="text-sm text-neutral-700">{venue.address}</div>
            {venue.notes && <div className="text-xs text-neutral-600">{venue.notes}</div>}
            {mapsUrl && (
              <a className="inline-block rounded-2xl border px-4 py-3 text-sm font-semibold" href={mapsUrl} target="_blank" rel="noreferrer">
                Indicazioni
              </a>
            )}
          </div>
        ) : (
          <div className="text-sm text-neutral-700">
            Venue non impostata. Se sei il Custode, vai su Supabase e inseriscila.
          </div>
        )}
      </section>

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <CheckInButton doorId={door.door_id} initialCount={count} />
      </section>

      <section className="rounded-3xl border bg-white p-6 shadow-sm space-y-3">
        <div className="text-sm font-semibold">Community</div>
        {chat ? (
          <a href={chat} target="_blank" rel="noreferrer" className="block w-full rounded-2xl bg-black px-4 py-4 text-center font-semibold text-white">
            JOIN CHAT ({chatLabel(door.city)})
          </a>
        ) : (
          <div className="text-sm text-neutral-700">
            Link chat non impostato. (Italia: WhatsApp, Estero: Telegram)
          </div>
        )}
        <div className="text-[11px] text-neutral-500">
          Regole: rispetto, niente rivendita biglietti, incontri solo in luoghi pubblici.
        </div>
      </section>

      <div className="text-center text-xs text-neutral-600">
        <Link href={`/c/${door.city.slug}`} className="underline">Apri la pagina città</Link>
      </div>
    </div>
  );
}
