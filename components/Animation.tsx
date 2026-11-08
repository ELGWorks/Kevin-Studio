import { animations } from "@/data/portfolio";
import { MotionArt } from "./art";

export default function Animation() {
  return (
    <section id="animation" className="scroll-mt-16 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">2D animation</h2>
          <p className="mt-4 text-lg leading-relaxed text-paper/75">
            Short loops and reveals with weight and timing, so a logo or a chart feels alive.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {animations.map((a) => (
            <li key={a.title}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden bg-white/8">
                  {a.video ? (
                    <video
                      src={a.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                      aria-label={a.title}
                    />
                  ) : (
                    <MotionArt kind={a.kind} />
                  )}
                </div>
                <figcaption className="mt-3">
                  <p className="font-display text-xl font-semibold">{a.title}</p>
                  <p className="text-paper/70">
                    {a.description}. Made in {a.tool}.
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
