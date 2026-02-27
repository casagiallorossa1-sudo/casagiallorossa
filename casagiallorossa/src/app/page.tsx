import Link from "next/link";
import { getCities } from "@/lib/data";
import { CitySearch } from "@/components/CitySearch";

export default async function HomePage() {
  const cities = await getCities();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="text-2xl font-semibold tracking-tight">Ovunque sei, trovi romanisti veri.</div>
        <div className="mt-2 text-sm text-neutral-700">
          Scansiona una Porta, fai check-in, entra in chat. WhatsApp in Italia, Telegram all’estero.
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/cities" className="rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white">
            Cerca una città
          </Link>
          <Link href="/open-a-door" className="rounded-2xl border px-4 py-3 text-sm font-semibold">
            Apri una Porta
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <div className="text-sm font-semibold">Città attive</div>
        <CitySearch cities={cities} />
      </section>
    </div>
  );
}
