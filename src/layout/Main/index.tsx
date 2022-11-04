import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Main({ children }: Props) {
  return (
    <main className="h-auto px-10 md:px-20 py-10 font-brand text-sm text-text-light min-h-[calc(100vh-128px)] dark:text-text-dark">
      {children}
    </main>
  );
}
