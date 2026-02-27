import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          CASA GIALLOROSSA
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/cities" className="hover:underline">Città</Link>
          <Link href="/open-a-door" className="hover:underline">Apri una Porta</Link>
          <Link href="/rules" className="hover:underline">Regole</Link>
        </nav>
      </div>
    </header>
  );
}
