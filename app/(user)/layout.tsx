export default function UserLayout({
  children,
  team,
  analytic,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytic: React.ReactNode;
}) {
  return (
    <div>
      <h1>User layout</h1>
      {children}
      {team}
      {analytic}
    </div>
  );
}
