export default async function TaskRetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h2>Tasks {id}</h2>
    </div>
  );
}
