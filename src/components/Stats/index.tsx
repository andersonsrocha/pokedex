type Props = {
  value: number;
};

export function Stats({ value }: Props) {
  return (
    <div className="bg-brand-100/20 h-1 w-full rounded-md">
      <div
        style={{ width: `${(value * 100) / 255}%` }}
        className={`bg-[length:145px_100%] bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-1 rounded-md`}
      />
    </div>
  );
}
