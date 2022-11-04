import { forwardRef, InputHTMLAttributes, LegacyRef, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  addonBefore?: ReactNode;
}

export const Input = forwardRef((props: Props, ref: React.Ref<HTMLInputElement>) => {
  const { addonBefore, ...restProps } = props;

  return (
    <div className="flex w-full">
      {addonBefore && (
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          {addonBefore}
        </div>
      )}

      <input
        ref={ref}
        {...restProps}
        className="font-brand outline-none h-8 block p-4 pl-10 w-full text-sm bg-component-light rounded-sm border border-divide-light dark:bg-component-dark-600 dark:border-divide-dark"
      />
    </div>
  );
});
