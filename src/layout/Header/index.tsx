import { Logo, SearchOutline, GithubOutline, LinkedinOutline } from "@icons";

export function Header() {
  return (
    <div className="flex h-16 w-full px-20 py-2 bg-brand-500 justify-between items-center shadow-md">
      <a href="/" className="w-32">
        <Logo />
      </a>

      <div className="relative text-white flex-1 max-w-md">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <SearchOutline />
        </div>
        <input
          type="search"
          className="font-brand outline-none h-8 block p-4 pl-10 w-full text-sm bg-brand-500 rounded-sm border border-brand-100"
          placeholder="Pesquisar"
        />
      </div>

      <div className="flex gap-4">
        <a href="https://github.com/andersonsrocha" className="w-8">
          <GithubOutline />
        </a>

        <a href="https://www.linkedin.com/in/anderson-silva-a40926192" className="w-8">
          <LinkedinOutline />
        </a>
      </div>
    </div>
  );
}
