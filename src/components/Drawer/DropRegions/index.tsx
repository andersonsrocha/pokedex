import { useDroppable } from "@dnd-kit/core";
import { forwardRef } from "react";

export enum Region {
  Collapse = "collapse",
  Expand = "expand",
}

export const DropRegions = forwardRef(() => {
  const { active, setNodeRef: setExpandRegionNodeRef } = useDroppable({
    id: Region.Expand,
  });
  const { setNodeRef: setCollapseRegionRef } = useDroppable({
    id: Region.Collapse,
  });

  if (!active) {
    return null;
  }

  return (
    <div className="absolute inset-0 grid grid-rows-[1.2fr_0.8fr] pointer-events-none">
      <div ref={setExpandRegionNodeRef} />
      <div ref={setCollapseRegionRef} />
    </div>
  );
});
