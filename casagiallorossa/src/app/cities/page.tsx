import Link from "next/link";
import { getCities } from "@/lib/data";

export const metadata = { title: "Città | Casa Giallorossa" };

export default async function CitiesPage() {
  const cities = await getCities();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Città</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {cities.map((c) => (
          <Link key={c.slug} href={`/c/${c.slug}`} className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow transition">
            <div className="font-semibold">{c.name}</div>
            <div className="mt-1 text-xs text-neutral-600">Apri la pagina città →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
