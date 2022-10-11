import { Fragment, ReactNode } from "react";

type Props = {
  spinning?: boolean;
  children: ReactNode;
};

export function Skeleton({ spinning, children }: Props) {
  return (
    <div>
      {spinning && (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {Array.from(Array(8).keys()).map((key) => (
            <div
              key={key}
              className="flex flex-col items-center gap-6 h-96 bg-brand-500 p-2 rounded-lg"
            >
              <div className="rounded-full h-20 w-20 animate-pulse bg-brand-100" />

              <div className="h-6 w-full animate-pulse bg-brand-100 rounded-md" />

              <div className="flex flex-col w-full flex-1 gap-2">
                <div className="flex gap-2">
                  <div className="h-6 w-8/12 animate-pulse bg-brand-100 rounded-md" />
                  <div className="h-6 w-4/12 animate-pulse bg-brand-100 rounded-md" />
                </div>
                <div className="h-6 w-full animate-pulse bg-brand-100 rounded-md" />
                <div className="flex-1 w-full animate-pulse bg-brand-100 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!spinning && children}
    </div>
  );
}
