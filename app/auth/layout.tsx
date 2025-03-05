export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-gray-700 py-12 px-8 rounded-md">{children}</div>
    </div>
  );
}
