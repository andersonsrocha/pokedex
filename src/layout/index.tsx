import { createContext, ReactNode, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";

export const LayoutContext = createContext("");

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  const [value, setValue] = useState("");

  return (
    <LayoutContext.Provider value={value}>
      <section>
        <Header onChange={setValue} />

        <Main>{children}</Main>

        <Footer />
      </section>
    </LayoutContext.Provider>
  );
}
