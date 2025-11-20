export default function SectionCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-cardBg p-5 rounded-xl shadow-sm border border-transparent">
      {children}
    </section>
  );
}
