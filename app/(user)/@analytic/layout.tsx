import Link from "next/link";

export default function AnalyticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Analytic layout</h1>
      <nav>
        <Link href="/page-views">Page Views</Link>
        <Link href="/visitors">Visitors</Link>
      </nav>
      <div>{children}</div>
    </>
  );
}
