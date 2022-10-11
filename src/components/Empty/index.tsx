import { EmptyOutline } from "@icons";

export function Empty() {
  return (
    <div className="flex items-center justify-center gap-2 text-white">
      <div className="flex justify-center items-center w-6 h-6">
        <EmptyOutline />
      </div>
      <div>Nenhum resultado retornado</div>
    </div>
  );
}
