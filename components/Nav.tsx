import { site } from "@/data/portfolio";

const links = [
  { href: "#logos", label: "Logos" },
  { href: "#sketches", label: "Sketches" },
];

/* White text with mix-blend-difference: stays readable over every color on the page. */
export default function Nav() {
  const first = site.name.split(" ")[0];
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <nav className="mx-auto flex h-16 max-w-[110rem] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="pointer-events-auto font-display text-lg font-extrabold tracking-tight">
          {first}
        </a>
        <ul className="pointer-events-auto flex items-center gap-4 text-[13px] font-medium sm:gap-8 sm:text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="underline-offset-4 hover:underline">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="rounded-full border-2 border-white px-3 py-1 sm:px-4 sm:py-1.5 transition-colors hover:bg-white hover:text-black">
              Hire me
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
