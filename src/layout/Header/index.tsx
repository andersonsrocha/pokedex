import { useEffect, useState } from "react";
import { Switch } from "@components";
import { Logo, GithubIcon, LinkedinIcon } from "@icons";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div>
      <div className="fixed z-10 flex h-16 w-full max-w-[100vw] px-4 py-2 gap-2 bg-primary-500 justify-between items-center shadow-md md:px-20 md:gap-0 dark:bg-component-dark-600">
        <a href="/" className="w-32 hidden md:block">
          <Logo />
        </a>

        <div className="flex items-center gap-2 md:gap-4">
          <Switch
            checked={dark}
            onChange={setDark}
            checkedChildren={<MoonIcon width={12} />}
            unCheckedChildren={<SunIcon width={12} />}
          />

          <a href="https://github.com/andersonsrocha" target="_blank" className="w-8">
            <GithubIcon />
          </a>

          <a
            href="https://www.linkedin.com/in/anderson-silva-a40926192"
            target="_blank"
            className="w-8"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>
      <div className="h-16" />
    </div>
  );
}
