"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CityRow } from "@/lib/data";

export function CitySearch({ cities }: { cities: CityRow[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return cities;
    return cities.filter((c) => c.name.toLowerCase().includes(s));
  }, [q, cities]);

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cerca città (es. Londra, New York...)"
        className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((c) => (
          <Link
            key={c.slug}
            href={`/c/${c.slug}`}
            className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow transition"
          >
            <div className="text-base font-semibold">{c.name}</div>
            <div className="text-xs text-neutral-600 mt-1">Apri la pagina città →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
