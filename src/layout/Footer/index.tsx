import { GithubOutline, LinkedinOutline } from "@icons";

export function Footer() {
  return (
    <div className="h-16 bg-brand-100 px-20">
      <div className="h-full flex items-center justify-between border-t-[1px] border-divide">
        <div />

        <div className="flex gap-4">
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
    </div>
  );
}
