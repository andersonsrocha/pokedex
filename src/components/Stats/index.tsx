type Props = {
  value: number;
};

export function Stats({ value }: Props) {
  return (
    <div className="relative bg-secondary-500/20 h-1 w-full rounded-md">
      <div
        style={{ width: `${(value * 100) / 255}%`, WebkitMask: "linear-gradient(#fff 0 0)" }}
        className="h-1 rounded-md before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-500 before:via-yellow-500 before:to-green-500"
      />
    </div>
  );
}
