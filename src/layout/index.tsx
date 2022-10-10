import { createContext, ReactNode, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";

export type LayoutContextProps = {
  search: string;
  v: number;
};

type Props = {
  children: ReactNode;
};

export const LayoutContext = createContext<LayoutContextProps>({ search: "", v: 1 });

export function Layout({ children }: Props) {
  const [value, setValue] = useState("");
  const [version, setVersion] = useState(1);

  const onContextChanged = ({ search, v }: LayoutContextProps) => {
    setValue(search);
    setVersion(v);
  };

  return (
    <LayoutContext.Provider value={{ search: value, v: version }}>
      <section>
        <Header onChange={onContextChanged} />

        <Main>{children}</Main>

        <Footer />
      </section>
    </LayoutContext.Provider>
  );
}
