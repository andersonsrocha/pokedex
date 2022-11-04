import * as SwitchPrimitive from "@radix-ui/react-switch";
import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  label?: ReactNode;
  onChange?: (open: boolean) => void;
  checked?: boolean;
  checkedChildren?: ReactNode;
  unCheckedChildren?: ReactNode;
};

export function Switch(props: Props) {
  const { label, checked, onChange, checkedChildren, unCheckedChildren } = props;

  return (
    <div className="flex">
      {label && <label className="select-none pr-3">{label}</label>}
      <SwitchPrimitive.Root
        onClick={() => onChange?.(!checked)}
        className={classNames(
          "w-12 h-6 relative rounded-full shadow-md flex items-center text-white",
          { "bg-component-dark-500": checked, "bg-primary-600": !checked }
        )}
      >
        {checked && <div className="px-2 w-3">{checkedChildren}</div>}
        <SwitchPrimitive.Thumb
          className={classNames(
            "block w-5 h-5 bg-white rounded-full shadow-sm transition-transform will-change-transform",
            { "translate-x-[9px]": checked, "translate-x-[3px]": !checked }
          )}
        />
        {!checked && <div className="px-2 w-3">{unCheckedChildren}</div>}
      </SwitchPrimitive.Root>
    </div>
  );
}
