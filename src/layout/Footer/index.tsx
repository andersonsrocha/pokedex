import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export function Footer() {
  return (
    <div className="w-full h-16 bg-primary-500 dark:bg-component-dark-600">
      <div className="h-full flex items-center justify-between px-4 md:px-20">
        <div />

        <div className="flex gap-4 text-white">
          <a href="https://github.com/andersonsrocha" target="_blank">
            <GitHubLogoIcon width={32} height={32} />
          </a>

          <a href="https://www.linkedin.com/in/anderson-silva-a40926192" target="_blank">
            <LinkedInLogoIcon width={32} height={32} />
          </a>
        </div>
      </div>
    </div>
  );
}
