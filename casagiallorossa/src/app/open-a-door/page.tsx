export const metadata = { title: "Apri una Porta | Casa Giallorossa" };

export default function OpenADoor() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Apri una Porta nella tua città</h1>
        <div className="mt-2 text-sm text-neutral-700">
          Per l’MVP, la gestione Custodi la facciamo via Supabase (senza pannelli complicati).
          Compila il form e ti abilito io / o lo abilitiamo più avanti.
        </div>
      </section>

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold">Cosa serve</div>
        <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 space-y-1">
          <li>1 persona Custode</li>
          <li>1 venue dove vedere la Roma</li>
          <li>1 chat (Italia WhatsApp, estero Telegram)</li>
        </ul>

        <div className="mt-5 rounded-2xl border p-4 text-sm text-neutral-700">
          MVP note: il form “automatico” lo attiviamo nella fase successiva.
          Per adesso scrivi al tuo contatto operativo o gestisci direttamente in Supabase.
        </div>
      </section>
    </div>
  );
}
