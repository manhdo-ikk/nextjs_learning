export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>User layout</h1>
      {children}
    </div>
  );
}
