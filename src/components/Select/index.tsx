import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { NormalIcon } from "@icons";
import React, { forwardRef, Fragment, ReactNode } from "react";

type SelectProps = {
  placeholder?: string;
  icon?: ReactNode;
  children?: ReactNode;
};

type ItemProps = {
  children?: ReactNode;
  value: string;
  icon?: ReactNode;
};

function InternalSelect(props: SelectProps, ref: React.Ref<HTMLButtonElement>) {
  const { icon, placeholder = "Selecione", children } = props;

  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.SelectTrigger
        ref={ref}
        className="inline-flex justify-between items-center bg-component-light border border-divide-light px-2 rounded-sm gap-2 cursor-pointer dark:border-divide-dark dark:bg-component-dark-600"
      >
        {icon && <SelectPrimitive.Icon className="w-4">{icon}</SelectPrimitive.Icon>}
        <SelectPrimitive.Value placeholder={<div className="text-[#9ca3af]">{placeholder}</div>} />
        <SelectPrimitive.Icon className="ml-4">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.SelectTrigger>

      <SelectPrimitive.Portal className="z-50">
        <SelectPrimitive.Content className="text-sm overflow-hidden outline-none border border-divide-light bg-component-light rounded-md shadow-md dark:bg-component-dark-600 dark:border-divide-dark">
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6 bg-hover-light cursor-default dark:bg-hover-dark">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6 bg-hover-light cursor-default dark:bg-hover-dark">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

function Option(props: ItemProps) {
  const { children, value, icon } = props;

  return (
    <SelectPrimitive.Item
      value={value}
      className="rounded-sm flex items-center h-6 pl-6 pr-8 relative select-none hover:bg-hover-light dark:hover:bg-hover-dark dark:text-text-dark"
    >
      {icon && <SelectPrimitive.Icon className="mr-2">{icon}</SelectPrimitive.Icon>}
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

const Select = forwardRef(InternalSelect) as unknown as ((
  props: React.PropsWithChildren<SelectProps>
) => React.ReactElement) & {
  Option: typeof Option;
};

Select.Option = Option;

export { Select };
