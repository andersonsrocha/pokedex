import { ArrowUpIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Main({ children }: Props) {
  const onScrollTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <main className="h-auto px-10 md:px-20 py-10 font-brand text-sm text-text-light min-h-[calc(100vh-128px)] dark:text-text-dark">
      {children}

      <div className="fixed bottom-20 right-4">
        <button
          onClick={onScrollTop}
          className="w-10 h-10 rounded-full text-text-dark bg-secondary-500 flex justify-center items-center"
        >
          <ArrowUpIcon width={24} />
        </button>
      </div>
    </main>
  );
}
