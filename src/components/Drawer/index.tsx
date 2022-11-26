import { forwardRef, ReactNode, useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { rubberbandModifier } from "@utils";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

import { Draggable } from "./Draggable";
import { DropRegions, Region } from "./DropRegions";

type DrawerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onExpandChange?: (expanded: boolean) => void;
  children?: ReactNode;
};

type DrawerContentProps = {
  expanded?: boolean;
  children?: ReactNode;
};

const modifiers = [restrictToVerticalAxis, rubberbandModifier];

function InternalDrawer(props: DrawerProps, ref: React.Ref<HTMLDivElement>) {
  const { open, onOpenChange, onExpandChange, children } = props;

  const tracked = useRef({ distance: 0, timestamp: 0, velocity: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 25,
        tolerance: 40,
      },
    })
  );

  const onDragEnd = ({ over }: DragEndEvent) => {
    const { velocity } = tracked.current;

    if (Math.abs(velocity) > 500) {
      // Directional velocity is high, assume intent to expand/collapse
      // even if we are not over that region.
      const expanded = velocity > 0;
      onExpandChange?.(expanded);
    } else if (over) {
      const expanded = over.id === Region.Expand;
      onExpandChange?.(expanded);
    }

    tracked.current = {
      distance: 0,
      timestamp: 0,
      velocity: 0,
    };
  };

  return (
    <div ref={ref}>
      <DndContext
        autoScroll={false}
        modifiers={modifiers}
        sensors={sensors}
        onDragEnd={onDragEnd}
        onDragMove={({ delta }) => {
          // track drag velocity
          const timestamp = Date.now();
          const timeDelta = timestamp - tracked.current.timestamp;
          const distance = tracked.current.distance - delta.y;
          const velocity = Math.round((distance / timeDelta) * 1000);

          tracked.current = {
            distance: delta.y,
            velocity,
            timestamp,
          };
        }}
      >
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
          {children}
        </DialogPrimitive.Root>
      </DndContext>
    </div>
  );
}

function Content({ children, expanded }: DrawerContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="bg-black/30 fixed inset-0 animate-overlayShow" />
      <div className="fixed flex justify-center items-end inset-0 overflow-hidden font-brand">
        <Draggable expanded={expanded}>{children}</Draggable>
        <DropRegions />
      </div>
    </DialogPrimitive.Portal>
  );
}

const Drawer = forwardRef(InternalDrawer) as unknown as ((
  props: React.PropsWithChildren<DrawerProps>
) => React.ReactElement) & {
  Content: typeof Content;
};

Drawer.Content = Content;

export { Drawer };
