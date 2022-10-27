import { ReactNode, useEffect, useRef } from "react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { rubberbandModifier } from "@utils";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import classNames from "classnames";

import { Draggable } from "./Draggable";
import { DropRegions, Region } from "./DropRegions";

type Props = {
  open?: boolean;
  expanded?: boolean;
  onClose?: () => void;
  onChange?: (expanded: boolean) => void;
  children: ReactNode;
};

const modifiers = [restrictToVerticalAxis, rubberbandModifier];

export function Drawer(props: Props) {
  const { open, expanded, onClose, onChange, children } = props;

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
      onChange?.(expanded);
      // if expand, remove scrollbar
      if (expanded) {
        document.body.classList.add("overflow-hidden", "md:overflow-auto");
      } else {
        document.body.classList.remove("overflow-hidden", "md:overflow-auto");
      }
    } else if (over) {
      const expanded = over.id === Region.Expand;
      onChange?.(expanded);
      // if expand, remove scrollbar
      if (expanded) {
        document.body.classList.add("overflow-hidden", "md:overflow-auto");
      } else {
        document.body.classList.remove("overflow-hidden", "md:overflow-auto");
      }
    }

    tracked.current = {
      distance: 0,
      timestamp: 0,
      velocity: 0,
    };
  };

  const onCloseOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (onClose && (e.code || e.key) === "Escape") {
      document.body.classList.remove("overflow-hidden", "md:overflow-auto");
      onClose();
    }
  };

  const onCloseOnClick = () => {
    if (!expanded && onClose) {
      document.body.classList.remove("overflow-hidden", "md:overflow-auto");
      onClose();
    } else if (onChange) {
      document.body.classList.remove("overflow-hidden", "md:overflow-auto");
      onChange(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", onCloseOnEscapeKeyDown);
    if (open) document.body.classList.add("overflow-hidden", "md:overflow-auto");

    return function cleanup() {
      document.body.removeEventListener("keydown", onCloseOnEscapeKeyDown);
    };
  }, [open]);

  return (
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
      <div
        className={classNames("block xl:hidden pointer-events-none", {
          "opacity-0": !open,
          "opacity-100": open,
        })}
      >
        <div className="overlay fixed inset-0 w-full h-full z-30 bg-black/30" />

        <div
          onClick={onCloseOnClick}
          className={classNames(
            "modal-content z-40 fixed inset-0 flex justify-center items-center w-full h-full",
            { "pointer-events-none": !open, "pointer-events-auto": open }
          )}
        >
          <div className="fixed flex justify-center items-end inset-0 overflow-hidden bg-black/5">
            <Draggable open={open} expanded={expanded}>
              {children}
            </Draggable>
            <DropRegions />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
