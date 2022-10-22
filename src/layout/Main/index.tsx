import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Main({ children }: Props) {
  return (
    <main className="bg-brand-100 min-h-[calc(100vh-128px)] h-auto px-10 md:px-20 py-10 font-brand">
      {children}
    </main>
  );
}