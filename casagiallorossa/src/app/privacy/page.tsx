export const metadata = { title: "Privacy | Casa Giallorossa" };

export default function PrivacyPage() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-3">
      <h1 className="text-2xl font-semibold">Privacy (MVP)</h1>
      <div className="text-sm text-neutral-700">
        Per il check-in salviamo solo un hash dell’IP (non l’IP in chiaro) per limitare lo spam,
        e user-agent per debug. Nessun dato viene venduto o ceduto.
      </div>
      <div className="text-sm text-neutral-700">
        Se vuoi una privacy completa GDPR-ready (cookie policy, DPA, ecc.), la facciamo in fase 2.
      </div>
    </div>
  );
}
