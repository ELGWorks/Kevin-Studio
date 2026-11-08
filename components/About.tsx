import { services, site, tools } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="mx-auto grid max-w-7xl scroll-mt-16 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
      <div className="lg:col-span-5">
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">What I make</h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
          Based in {site.location}, working with small businesses, schools and creators. I work in
          {" "}
          {tools.join(", ")}, and send files you can use right away.
        </p>
      </div>

      <dl className="lg:col-span-7">
        {services.map((s, i) => (
          <div
            key={s.name}
            className={`grid gap-1 py-6 sm:grid-cols-5 sm:gap-6 ${i === 0 ? "border-t-2" : ""} border-b-2 border-ink`}
          >
            <dt className="font-display text-2xl font-semibold sm:col-span-2">{s.name}</dt>
            <dd className="text-lg text-ink/75 sm:col-span-3">{s.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
