import Image from "next/image";
import { infographics } from "@/data/portfolio";
import { InfoArt } from "./art";

export default function Infographics() {
  return (
    <section id="infographics" className="scroll-mt-16 bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div>
          <h2 className="font-display text-[clamp(1.75rem,8vw,3.75rem)] font-extrabold tracking-tight">Infographics</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
            Numbers, steps and ideas laid out so the main point is clear in about five seconds.
          </p>
        </div>

        <ul className="mt-12 grid gap-10 md:grid-cols-2">
          {infographics.map((g) => (
            <li key={g.title}>
              <figure>
                <div className="relative aspect-[8/5] overflow-hidden" style={{ background: g.bg }}>
                  {g.image ? (
                    <Image src={g.image} alt={g.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 p-[6%]">
                      <InfoArt kind={g.kind} />
                    </div>
                  )}
                </div>
                <figcaption className="mt-3 max-w-xl">
                  <p className="font-display text-xl font-semibold">{g.title}</p>
                  <p className="text-ink/70">{g.description}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
