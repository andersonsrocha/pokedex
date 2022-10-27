import { useState, FormEvent } from "react";
import { Logo, SearchOutline, GithubOutline, LinkedinOutline } from "@icons";

import { LayoutContextProps } from "..";

type Props = {
  onChange: (args: LayoutContextProps) => void;
};

export function Header({ onChange }: Props) {
  const [search, setSearch] = useState("");
  const [version, setVersion] = useState(1);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange({ search, v: version });
  };

  const onVersionChanged = (version: number) => {
    setVersion(version);
    onChange({ search, v: version });
  };

  return (
    <div>
      <div className="fixed z-10 flex h-16 w-full max-w-[100vw] px-4 py-2 gap-2 bg-brand-500 justify-between items-center shadow-md md:px-20 md:gap-0">
        <a href="/" className="w-32 hidden md:block">
          <Logo />
        </a>

        <div className="relative text-white flex-1 w-full md:max-w-md">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <SearchOutline />
            </div>
            <div className="flex">
              <input
                type="search"
                name="search"
                className="font-brand outline-none h-8 block p-4 pl-10 w-full text-sm bg-brand-500 rounded-none rounded-l-sm border border-divide"
                placeholder="Pesquisar"
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                value={version}
                onChange={(e) => onVersionChanged(Number(e.target.value))}
                className="hidden md:block min-w-[64px] outline-none bg-brand-500 font-brand text-sm rounded-none rounded-r-sm p-1 border border-l-0 border-divide"
              >
                <option className="border border-divide rounded-none" value={1}>
                  V1
                </option>
              </select>
            </div>
          </form>
        </div>

        <div className="flex gap-2 md:gap-4">
          <a href="https://github.com/andersonsrocha" target="_blank" className="w-8">
            <GithubOutline />
          </a>

          <a
            href="https://www.linkedin.com/in/anderson-silva-a40926192"
            target="_blank"
            className="w-8"
          >
            <LinkedinOutline />
          </a>
        </div>
      </div>
      <div className="h-16" />
    </div>
  );
}
