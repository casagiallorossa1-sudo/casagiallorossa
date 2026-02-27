export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-neutral-600">
        <div>© {new Date().getFullYear()} Casa Giallorossa</div>
        <div className="mt-1">Progetto community indipendente. Non affiliato ufficialmente con AS Roma.</div>
      </div>
    </footer>
  );
}
