import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Logo } from "@icons";

export function Header() {
  return (
    <div>
      <div className="fixed z-10 flex h-16 w-full max-w-[100vw] px-4 py-2 gap-2 bg-primary-500 justify-between items-center shadow-md md:px-20 md:gap-0 dark:bg-component-dark-600">
        <a href="/" className="w-32">
          <Logo />
        </a>

        <div className="flex items-center gap-2 md:gap-4 text-white">
          <a href="https://github.com/andersonsrocha" target="_blank">
            <GitHubLogoIcon width={32} height={32} />
          </a>

          <a href="https://www.linkedin.com/in/anderson-silva-a40926192" target="_blank">
            <LinkedInLogoIcon width={32} height={32} />
          </a>
        </div>
      </div>
      <div className="h-16" />
    </div>
  );
}
