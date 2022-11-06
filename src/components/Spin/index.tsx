import classNames from "classnames";
import { Fragment, ReactNode } from "react";

type Props = {
  spinning?: boolean;
  children?: ReactNode;
};

function Spinner({ spinning, children }: Props) {
  return (
    <div className="h-full w-full">
      {spinning && (
        <div className="flex justify-center items-center h-full w-full pointer-events-none">
          <div className="absolute z-40">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <div className="blur-sm w-full">{children}</div>
        </div>
      )}

      {!spinning && children}
    </div>
  );
}

function Skeleton({ spinning, children }: Props) {
  return (
    <Fragment>
      {spinning && (
        <div className="h-[390px] cursor-pointer bg-component-light rounded-lg items-center flex flex-col gap-2 p-4 dark:bg-component-dark-600">
          <div className="h-6 w-14 rounded-sm bg-gray-400/30 animate-pulse" />
          <div className="h-[100px] w-[100px] rounded-full bg-gray-400/30 animate-pulse" />
          <div className="h-6 w-40 rounded-sm bg-gray-400/30 animate-pulse" />
          <div className="w-full flex-1 rounded-sm bg-gray-400/30 animate-pulse" />
        </div>
      )}

      {!spinning && children}
    </Fragment>
  );
}

function Loading({ spinning, children }: Props) {
  return (
    <div>
      {spinning && (
        <div className="grid grid-cols-12 gap-6 min-h-[calc(100vh-208px)]">
          <div className="col-span-12 xl:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Skeleton spinning />
              <Skeleton spinning />
              <Skeleton spinning />
              <Skeleton spinning />
              <Skeleton spinning />
              <Skeleton spinning />
            </div>
          </div>

          <div className="col-span-3 hidden xl:block">
            <Skeleton spinning />
          </div>
        </div>
      )}

      {!spinning && children}
    </div>
  );
}

export const Spin = {
  Spinner,
  Loading,
  Skeleton,
};
