import type { StaticImageData } from "next/image";
import sibenikAerial from "@/assets/images/sibenik-aerial-sunset.jpg";
import sibenikWaterfront from "@/assets/images/sibenik-waterfront.jpg";
import krka from "@/assets/images/krka-waterfalls.jpg";
import kornati from "@/assets/images/kornati-aerial.jpg";
import stNicholas from "@/assets/images/st-nicholas-fortress.jpg";
import stAnthony from "@/assets/images/st-anthony-walkway.jpg";

export interface PhotoCredit {
  author: string;
  source: string;
  url: string;
  /** Omitted for photos used without an open licence (credited to the source site) */
  license?: { name: string; url: string };
}

export interface CreditedPhoto {
  image: StaticImageData;
  credit: PhotoCredit;
  /** CSS object-position, for photos whose subject isn't centred */
  position?: string;
}

const unsplash = { name: "Unsplash License", url: "https://unsplash.com/license" };

// Photos taken from the web, credited on the page next to each image. All are
// free-licence except stAnthony, which is from the channel's official site and
// is used with a credit only; remove it if they ask.
export const webPhotos = {
  sibenikAerial: {
    image: sibenikAerial,
    credit: {
      author: "Janek Valdsalu",
      source: "Unsplash",
      url: "https://unsplash.com/photos/an-aerial-view-of-a-city-at-sunset--7dkthyaYts",
      license: unsplash,
    },
  },
  sibenikWaterfront: {
    image: sibenikWaterfront,
    credit: {
      author: "Janek Valdsalu",
      source: "Unsplash",
      url: "https://unsplash.com/photos/a-view-of-a-city-from-across-the-water-EJ1RQXGna-g",
      license: unsplash,
    },
  },
  krka: {
    image: krka,
    credit: {
      author: "Ilse",
      source: "Unsplash",
      url: "https://unsplash.com/photos/waterfalls-near-green-trees-under-blue-sky-during-daytime-ctxyKA1q-FQ",
      license: unsplash,
    },
  },
  kornati: {
    image: kornati,
    credit: {
      author: "Mark Pisek",
      source: "Unsplash",
      url: "https://unsplash.com/photos/aerial-view-of-a-coastal-island-and-stunning-blue-waters-Ix-rOzkUAsg",
      license: unsplash,
    },
  },
  stNicholas: {
    image: stNicholas,
    position: "70% 70%",
    credit: {
      author: "Hrvoje_Photography",
      source: "Unsplash",
      url: "https://unsplash.com/photos/body-of-water-at-sunset-PQso3Sa4FAI",
      license: unsplash,
    },
  },
  stAnthony: {
    image: stAnthony,
    credit: {
      author: "Kanal sv. Ante",
      source: "kanal-svetog-ante.com",
      url: "https://kanal-svetog-ante.com/hr",
    },
  },
} satisfies Record<string, CreditedPhoto>;
