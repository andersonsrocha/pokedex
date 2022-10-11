import { Fragment, useEffect } from "react";

type Props = {
  open?: boolean;
  onClose?: () => void;
};

export function Modal({ open, onClose }: Props) {
  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (onClose && (e.code || e.key) === "Escape") {
      document.body.classList.remove("overflow-hidden");
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    if (open) document.body.classList.add("overflow-hidden");

    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [open]);

  return (
    <Fragment>
      {open && (
        <div
          onClick={onClose}
          className="bg-brand-500/50 fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center z-50"
        >
          <div className="animate-zoomIn" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content w-[800px] bg-brand-500 rounded-lg text-white">
              <div className="p-3 grid grid-cols-2 divide-x h-full">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
