/*
  ─────────────────────────────────────────────────────────────
  the words on the site.
  edit anything here — the homepage, about, contact, categories —
  without touching any of the gallery code.
  ─────────────────────────────────────────────────────────────
*/

export interface CategoryConfig {
  /** must match the folder name inside /public/photos */
  slug: string;
  /** the heading shown on the page (lowercase looks best) */
  title: string;
}

export interface SiteConfig {
  meta: { title: string; description: string; ogImage?: string };
  hero: { title: string; subtitle: string };
  categories: CategoryConfig[];
  about: { heading: string; paragraphs: string[] };
  contact: {
    heading: string;
    instagram?: { handle: string; url: string };
    email: string;
  };
  footer: string;
  /** show the small nav bar that fades in as you scroll. set to false to hide it. */
  showStickyNav: boolean;
}

export const site: SiteConfig = {
  // used for the browser tab title + link previews when the site is shared
  meta: {
    title: "from drinah's digicams",
    description: "a digital diary of pics i love!",
    ogImage: "/photos/places/places_1.jpg",
  },

  // the top of the homepage
  hero: {
    title: "from drinah's digicams :)",
    subtitle: "a digital diary of pics i love!",
  },

  // the gallery sections, in the order they appear on the page + in the nav.
  // to add a category: make a folder in /public/photos and add a line here.
  // to reorder: move the lines around. to rename: change the title.
  categories: [
    { slug: "places", title: "places" },
    { slug: "sports", title: "sports" },
    { slug: "wildlife", title: "wildlife" },
  ],

  about: {
    heading: "a little about me",
    paragraphs: [
      "hi! i'm drinah :)",
      "here are some snaps from places i've been & things i've seen!",
      "hope you enjoy looking through these as much as i enjoyed taking them ♡",
    ],
  },

  contact: {
    heading: "contact",
    // want to add instagram (or another link) later? uncomment and fill in:
    // instagram: { handle: "@yourhandle", url: "https://instagram.com/yourhandle" },
    email: "hi@drigi.cam",
  },

  footer: "© drinah",

  showStickyNav: true,
};
