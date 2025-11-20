interface LimitsProps {
  value?: number;
}

export default function Limits({ value = 50 }: LimitsProps) {
  return (
    <section className="bg-cardBg p-5 rounded-xl space-y-3">
      <h2 className="text-zinc-200">Settings</h2>

      <div>
        <p className="text-textMuted text-sm mb-1">Limits</p>
        <div className="w-full h-2 bg-zinc-700 rounded-full">
          <div
            className="h-full bg-zinc-300 rounded-full"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </section>
  );
}
