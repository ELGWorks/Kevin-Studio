/**
 * Everything on the page comes from this file.
 *
 * To use real artwork:
 *  1. Put logo files in  public/logos/     named logo1.webp ... logo6.webp
 *  2. Put sketch files in public/sketches/ named sketch1.webp, sketch2.webp, ...
 *  3. Set USE_REAL_FILES to true below.
 * Until then, drawn placeholders are shown.
 */

const USE_REAL_FILES = true;

const pad = (n: number) => String(n).padStart(2, "0");
const file = (dir: string, n: number, ext: string) =>
  USE_REAL_FILES
    ? `/${dir}/${dir === "logos" ? "logo" : "sketch"}${n}.${ext}`
    : undefined;

export const site = {
  name: "Kevin Erum",
  role: "Logo designer and sketch artist",
  intro:
    "Every logo starts as a rough pencil drawing. These are the ones that made it to Adobe Illustrator, and the sketches that came before them.",
  email: "hello@example.com",
  location: "Philippines",
  socials: [
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
};

export type LogoKind = "orbit" | "leaf" | "mono" | "hex" | "wave" | "pin";

export const logos: {
  title: string;
  description: string;
  kind: LogoKind; // placeholder drawing, ignored once an image exists
  bg: string; // panel color
  fg: string; // title and outline color
  accent: string;
  image?: string;
}[] = [
  {
    title: "Phantom Tail",
    description: "Logo",
    kind: "orbit",
    bg: "#101426", // dark, for "phantom"
    fg: "#edf1f7",
    accent: "#ffc83d",
    image: file("logos", 1, "webp"),
  },
  {
    title: "Drive Culture",
    description: "Logo",
    kind: "leaf",
    bg: "#ff5c4d", // racing red
    fg: "#101426",
    accent: "#edf1f7",
    image: file("logos", 2, "webp"),
  },
  {
    title: "Hotwheels",
    description: "Logo",
    kind: "mono",
    bg: "#3047ff", // blue, like the track
    fg: "#edf1f7",
    accent: "#ffc83d",
    image: file("logos", 3, "webp"),
  },
  {
    title: "Coffee Tea Bakery",
    description: "Logo",
    kind: "hex",
    bg: "#ffc83d", // warm, for the bakery
    fg: "#101426",
    accent: "#ff5c4d",
    image: file("logos", 4, "webp"),
  },
  {
    title: "Aquater",
    description: "Logo",
    kind: "wave",
    bg: "#2fbf9b", // water green
    fg: "#101426",
    accent: "#edf1f7",
    image: file("logos", 5, "webp"),
  },
  {
    title: "Kevin Studio",
    description: "Brand Logo",
    kind: "pin",
    bg: "#dbe2ee", // light, so the brand logo closes the row calmly
    fg: "#3047ff",
    accent: "#ff5c4d",
    image: file("logos", 6, "webp"),
  },
];

export const sketches: { title: string; image?: string }[] = Array.from(
  { length: 22 }, // change this to match how many sketch files you have
  (_, i) => ({
    title: `Sketch ${pad(i + 1)}`,
    image: file("sketches", i + 1, "webp"),
  }),
);