import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Logo } from "@icons";
import { useDarkMode } from "usehooks-ts";
import { useMountEffect } from "@hooks";
import { useCallback } from "react";

export function Header() {
  const { isDarkMode, toggle } = useDarkMode();

  const onSwitchTheme = useCallback(() => {
    toggle();

    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [toggle]);

  useMountEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div>
      <div className="fixed z-10 flex h-12 w-full max-w-[100vw] py-2 px-4 md:px-10 lg:px-20 bg-primary-500 justify-between items-center shadow-md dark:bg-component-dark-600">
        <a href="/" className="h-full">
          <Logo />
        </a>

        <button
          onClick={onSwitchTheme}
          className="bg-white/10 text-text-light h-7 w-7 flex justify-center items-center rounded-full hover:bg-white/20 dark:text-text-dark"
        >
          {isDarkMode ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
      <div className="h-12" />
    </div>
  );
}
