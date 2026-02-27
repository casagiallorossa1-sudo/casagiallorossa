export const metadata = { title: "Regole | Casa Giallorossa" };

export default function RulesPage() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-3">
      <h1 className="text-2xl font-semibold">Regole</h1>
      <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-2">
        <li>Rispetto totale: niente insulti, niente discriminazioni.</li>
        <li>Zero rivendita biglietti / pratiche illegali.</li>
        <li>Incontri solo in luoghi pubblici (soprattutto per nuovi).</li>
        <li>Casa Giallorossa è una community indipendente.</li>
      </ul>
    </div>
  );
}
