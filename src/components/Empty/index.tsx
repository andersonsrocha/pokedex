import { EmptyIcon } from "@icons";

export function Empty() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-[calc(100vh-322px)]">
      <div className="flex justify-center items-center w-6 h-6">
        <EmptyIcon />
      </div>
      <div>Nenhum resultado retornado</div>
    </div>
  );
}
