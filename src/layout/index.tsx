import { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <section>
      <Header />

      <Main>{children}</Main>

      <Footer />
    </section>
  );
}
