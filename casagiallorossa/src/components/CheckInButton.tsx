"use client";

import { useState } from "react";

export function CheckInButton({ doorId, initialCount }: { doorId: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function checkIn() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ doorId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Errore");
      if (typeof data.countLast24h === "number") setCount(data.countLast24h);
      if (data.limited) setMsg("Check-in già fatto di recente. Riprova più tardi.");
      else setMsg("Check-in confermato ✅");
    } catch (e: any) {
      setMsg("Errore check-in. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        disabled={loading}
        onClick={checkIn}
        className="w-full rounded-2xl bg-black px-4 py-4 text-white font-semibold disabled:opacity-60"
      >
        {loading ? "..." : "CHECK-IN"}
      </button>
      <div className="text-center text-xs text-neutral-600">
        Check-in (ultime 24 ore): <span className="font-semibold text-black">{count}</span>
      </div>
      {msg && <div className="text-center text-xs text-neutral-700">{msg}</div>}
      <div className="text-center text-[11px] text-neutral-500">Niente spam. Serve solo per capire chi c’è.</div>
    </div>
  );
}
