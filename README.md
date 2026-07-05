# from drinah's digicams

a small, quiet photography diary — a single page where photos sit in three
sections (wildlife, sports, places), open in a fullscreen viewer, and carry
all the colour. built with next.js, typescript and tailwind css.

everything you'll normally change lives in **two folders**:

- `content/` — the words (homepage text, about, contact, categories)
- `public/photos/` — the pictures

you should never need to touch anything in `src/`.

---

## what you need first

- [node.js](https://nodejs.org) version 18.18 or newer (the **20 LTS** version is a safe choice).

to check what you have, open a terminal and run:

```bash
node -v
```

---

## 1. install

from inside the project folder:

```bash
npm install
```

this downloads everything the project needs. you only do this once (and again
if you ever change dependencies).

## 2. run it locally

```bash
npm run dev
```

then open **http://localhost:3000** in your browser. leave this running while
you work — the site updates automatically as you save files. press `Ctrl + C`
in the terminal to stop it.

## 3. build for production (optional check)

```bash
npm run build
```

this makes sure everything compiles. vercel runs this for you when you deploy,
so you don't have to — but it's a handy way to catch mistakes.

---

## adding new photos  ← the main thing you'll do

1. open the `public/photos/` folder.
2. drop your image into the right category folder:
   - `public/photos/wildlife/`
   - `public/photos/sports/`
   - `public/photos/places/`
3. that's it. the photo appears on the site automatically.

**supported files:** `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.tiff`.

**order:** within each section, the **newest photo shows first**. the site works
this out from the date the photo was taken (stored inside most photos). you can
override the date — see below.

**tip:** give files simple, memorable names like `heron-richmond.jpg`. the file
name is how you attach details to a photo in the next step.

---

## adding titles, captions and other details

most cameras and phones save the settings *inside* the photo — camera, lens,
shutter, aperture, iso, focal length and date. the site reads these
**automatically**, so often you don't need to do anything.

when you *do* want to add a title, a location, a caption, or fix a detail, open:

```
content/photos.ts
```

add an entry using the exact file name as the key. anything you write here wins
over what the camera saved:

```ts
export const overrides: Record<string, PhotoMeta> = {
  "heron-richmond.jpg": {
    title: "still heron",
    location: "richmond park, london",
    caption: "stood very still for this one.",
    // you can also set: month, year, camera, lens,
    // shutter, aperture, iso, focalLength, date
  },
};
```

every field is optional — include only what you want to show. anything you
leave out either comes from the photo's own data or is simply hidden.

to change only the **ordering date** (without changing anything shown), set
`date`, e.g. `date: "2025-05-18"`.

---

## categories

categories are defined in **`content/site.ts`**, in the `categories` list:

```ts
categories: [
  { slug: "wildlife", title: "wildlife" },
  { slug: "sports", title: "sports" },
  { slug: "places", title: "places" },
],
```

- **`slug`** must match a folder name inside `public/photos/`.
- **`title`** is what shows on the page.

**add one:** make a new folder in `public/photos/` (e.g. `public/photos/street/`)
and add a line: `{ slug: "street", title: "street" }`.

**rename one:** change the `title` (leave the `slug` and folder name as they are).

**reorder them:** move the lines up or down — the page follows this order.

**remove one:** delete its line (and, if you like, its folder).

---

## editing the homepage text

all in **`content/site.ts`**:

```ts
hero: {
  title: "from drinah's digicams :)",
  subtitle: "a digital diary of pics i love!",
},
```

## editing the about section

also in **`content/site.ts`** — each line in `paragraphs` is its own line on
the page:

```ts
about: {
  heading: "a little about me",
  paragraphs: [
    "hi! i'm drinah :)",
    "here are some snaps from places i've been & things i've seen!",
    "hope you enjoy looking through these as much as i enjoyed taking them ♡",
  ],
},
```

## editing contact

same file. **remember to replace the placeholders** with your real handle and
email:

```ts
contact: {
  heading: "contact",
  instagram: { handle: "@yourhandle", url: "https://instagram.com/yourhandle" },
  email: "you@example.com",
},
```

---

## deploying (putting it online) with vercel

vercel is free for a personal site and made by the same team as next.js.

1. put this project on [github](https://github.com) (create a repo and push it).
2. go to [vercel.com](https://vercel.com) and sign in with github.
3. click **add new… → project**, pick your repo, and click **deploy**.
   vercel detects next.js automatically — you don't need to change any settings.
4. after a minute you'll get a live link. **every time you push to github, the
   site updates itself.**

so your routine for adding photos becomes: drop images in → commit and push →
done.

---

## the sample photos

the project ships with nine soft placeholder images so it looks complete on the
first run. when you're ready to use your own:

1. delete the `sample-*.jpg` files inside the `public/photos/*` folders.
2. delete the matching sample entries in `content/photos.ts`.

to regenerate the placeholders at any time, run `npm run samples`.

---

## small optional tweaks

- **hide the floating nav bar:** in `content/site.ts`, set `showStickyNav: false`.
- **change the font:** in `src/app/layout.tsx`, swap `Inter` for another
  next.js font such as `Manrope` (change it in both the `import` line and the
  `Inter(...)` call).

---

## project structure (for the curious)

```
content/          the words + categories you edit
  site.ts
  photos.ts
public/photos/    your images, one folder per category
src/
  app/            the page, layout and global styles
  components/     the gallery, masonry and lightbox (no need to edit)
  lib/            reads your folders, photo data + camera info (no need to edit)
scripts/          the sample-image generator
```

## ideas for later

the project is set up so these can be added without a redesign: search, tags,
collections, a blog, a prints page, or more categories. the photo data already
has room for `tags` and `collection`.
