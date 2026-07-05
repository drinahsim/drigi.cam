/*
  the shape of a photo and a category.
  you don't need to edit this file to add photos — it just describes the data.
*/

/** everything that can be shown about a photo. all optional. */
export interface PhotoMeta {
  title?: string;
  location?: string;
  month?: string; // e.g. "june"
  year?: string | number; // e.g. 2025
  camera?: string; // camera body
  lens?: string;
  shutter?: string; // e.g. "1/250s"
  aperture?: string; // e.g. "f/2.8"
  iso?: string | number;
  focalLength?: string; // e.g. "35mm"
  caption?: string;

  /** used only to sort — overrides the date read from the file. ISO string, e.g. "2025-06-01". */
  date?: string;

  /** reserved for future features (search / tags / collections). safe to ignore for now. */
  tags?: string[];
  collection?: string;
}

/** a fully resolved photo, ready to render. built automatically from the file + EXIF + overrides. */
export interface Photo extends PhotoMeta {
  id: string; // "<category>/<filename>"
  category: string; // category slug
  filename: string;
  src: string; // "/photos/<category>/<filename>"
  width: number; // displayed width in px
  height: number; // displayed height in px
  aspectRatio: number; // width / height
  blurDataURL?: string; // tiny placeholder shown while the photo loads
  takenAt: number; // epoch ms, used for "newest first" sorting
}

/** one category section, with its photos already sorted newest-first. */
export interface CategoryGallery {
  slug: string;
  title: string;
  photos: Photo[];
}
