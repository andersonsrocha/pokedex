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
      className={classNames(
        "drawer-content bg-component-light dark:bg-component-dark-600 rounded-t-3xl",
        {
          dragging: isDragging,
          expanded: expanded,
          "pointer-events-none": !open,
          "pointer-events-auto": open,
        }
      )}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={classNames(
          "relative flex flex-shrink-0 box-border items-center justify-center bg-component-light border-b border-divide-light rounded-t-3xl h-10 text-xl text-text-light p-4 touch-none cursor-grab before:absolute before:w-[50px] before:h-[3px] before:bg-black/20 before:transition-colors before:duration-200 dark:border-divide-dark dark:text-text-dark dark:bg-component-dark-600 dark:before:bg-white/20",
          { "cursor-grabbing before:bg-black/30 dark:before:bg-white/30": isDragging }
        )}
      />
      <div className="pt-10 pb-4 px-4 overflow-y-auto block bg-component-light dark:bg-component-dark-600">
        {children}
      </div>
    </div>
  );
}
