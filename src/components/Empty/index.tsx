import { EmptyOutline } from "@icons";

export function Empty() {
  return (
    <div className="flex items-center justify-center gap-2 text-white absolute right-0 left-0 top-0 bottom-0">
      <div className="flex justify-center items-center w-6 h-6">
        <EmptyOutline />
      </div>
      <div>Nenhum resultado retornado</div>
    </div>
  );
}
