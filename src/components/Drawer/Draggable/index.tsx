import { CSSProperties, ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import classNames from "classnames";

import { MAX_DRAWER_HEIGHT_PERCENT } from "@constants";

type Props = {
  children: ReactNode;
  expanded?: boolean;
  open?: boolean;
};

export function Draggable({ children, open, expanded }: Props) {
  const { attributes, isDragging, listeners, transform, setNodeRef } = useDraggable({
    id: "header",
  });

  const styles = {
    "--max-height": `${MAX_DRAWER_HEIGHT_PERCENT * 100}vh`,
    "--transform": transform ? `${transform.y}px` : undefined,
  } as CSSProperties;

  return (
    <div
      style={styles}
      onClick={(e) => e.stopPropagation()}
      className={classNames("drawer-content bg-secondary rounded-t-3xl", {
        dragging: isDragging,
        expanded: expanded,
        "pointer-events-none": !open,
        "pointer-events-auto": open,
      })}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={classNames(
          "relative flex flex-shrink-0 box-border items-center justify-center bg-secondary border-b border-divide rounded-t-3xl h-10 text-xl text-white p-4 touch-none cursor-grab before:absolute before:w-[50px] before:h-[3px] before:bg-white/20 before:transition-colors before:duration-2000",
          { "cursor-grabbing before:bg-white/30": isDragging }
        )}
      />
      <div className="pt-10 pb-4 px-4 overflow-y-auto block bg-secondary">{children}</div>
    </div>
  );
}
