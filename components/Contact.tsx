import { site } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="bg-cobalt text-paper">
      <div className="mx-auto max-w-[110rem] px-5 py-24 sm:px-8 lg:py-32">
        <h2 className="font-display text-[clamp(3rem,13vw,13rem)] font-extrabold leading-[0.88] tracking-tight">
          Need a logo?
        </h2>
        <a
          href={`mailto:${site.email}`}
          className="mt-10 inline-block break-all font-display text-3xl font-semibold underline decoration-sun decoration-4 underline-offset-8 transition-colors hover:text-sun sm:text-6xl"
        >
          {site.email}
        </a>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-lg">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-paper/70">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="mb-0 text-paper/70">
          Powered by ELGWorks.
        </p>
      </div>
    </section>
  );
}
