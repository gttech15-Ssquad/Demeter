interface NavigationRowProps {
  icon: string;
  label: string;
}

export default function NavigationRow({ icon, label }: NavigationRowProps) {
  return (
    <section className="bg-cardBg p-5 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl text-accentRed">{icon}</span>
        <p>{label}</p>
      </div>
      <span className="text-textMuted text-xl">&#8250;</span>
    </section>
  );
}
