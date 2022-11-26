import React, { Suspense } from "react";
import { Layout } from "@layout";
import { Loading } from "@components";

const List = React.lazy(() => import("@pages").then(({ List }) => ({ default: List })));

export function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <List />
      </Layout>
    </Suspense>
  );
}
