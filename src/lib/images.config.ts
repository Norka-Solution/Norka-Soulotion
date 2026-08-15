/**
 * Central Image Configuration for NORKA SOLUTION
 *
 * All image paths, alt text, and section placements are managed here.
 * Every page now uses real photography (see `home` and `services` below) —
 * the earlier generative brand-art components (ServiceArt, PageHeroArt,
 * AboutArt) have been removed since nothing referenced them anymore.
 * MonogramAvatar is the one generative piece still in use, deliberately —
 * see its own file for why (an honest initials avatar for testimonials/
 * leadership beats a stock photo standing in for one named person).
 *
 * To update an image: swap the `src` below for a real Norka Solution photo
 * whenever one is available — drop it into /public/images/ and point `src`
 * at it (see `home.heroWorkspace` for the pattern with a local file, or use
 * a verified real Unsplash URL like the other entries). Nothing else needs
 * to change since every component reads from here.
 *
 * Supported formats: .jpg, .png, .webp, .svg
 */

export const images = {
  /** Site branding */
  brand: {
    logo: {
      src: "/logo.svg",
      alt: "Norka Solution",
    },
  },

  /** Home page — real curated photography (Unsplash), chosen for UAE/Gulf
   *  relevance rather than generic stock. Swap any `src` for a real Norka
   *  Solution photo the moment one is available; nothing else needs to
   *  change since every component reads from here. */
  home: {
    heroWorkspace: {
      src: "/images/home/hero-developer.jpg",
      alt: "Developer typing code on a multi-monitor setup in a modern office",
    },
    ctaSkyline: {
      src: "https://images.unsplash.com/photo-1748373452031-ee1ae4eb624d?w=1600&q=80&auto=format&fit=crop",
      alt: "Dubai skyline and fountain at dusk",
    },
    aboutTeam: {
      src: "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?w=1200&q=80&auto=format&fit=crop",
      alt: "Team collaborating in a modern office",
    },
    ceoOffice: {
      src: "https://images.unsplash.com/photo-1758518729463-0bb73ed899ac?w=1200&q=80&auto=format&fit=crop",
      alt: "Professionals in a modern office lobby",
    },
    servicesCode: {
      src: "https://images.unsplash.com/photo-1760670399462-f5e479452c27?w=1200&q=80&auto=format&fit=crop",
      alt: "Monitor displaying colorful source code",
    },
  },

  /** Per-service photo — used by the homepage services carousel and the
   *  /services page's alternating rows (matches the `ServiceKey` union in
   *  src/lib/data/services.ts). A few categories intentionally share a
   *  photo (verified, real, still on-topic) rather than force a
   *  mismatched image just to make every key unique. */
  services: {
    software: {
      src: "https://images.unsplash.com/photo-1760670399462-f5e479452c27?w=1200&q=80&auto=format&fit=crop",
      alt: "Monitor displaying colorful source code",
    },
    web: {
      src: "https://images.unsplash.com/photo-1760670399462-f5e479452c27?w=1200&q=80&auto=format&fit=crop",
      alt: "Monitor displaying colorful source code",
    },
    mobile: {
      src: "https://images.unsplash.com/photo-1750056393356-d1de9d222a29?w=1200&q=80&auto=format&fit=crop",
      alt: "Hand holding a smartphone showing an app",
    },
    erp: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
      alt: "Analytics dashboard with charts on a laptop screen",
    },
    infrastructure: {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&auto=format&fit=crop",
      alt: "Server rack with illuminated network cabling",
    },
    uiux: {
      src: "https://images.unsplash.com/photo-1758518729463-0bb73ed899ac?w=1200&q=80&auto=format&fit=crop",
      alt: "Professionals in a modern office lobby",
    },
    marketing: {
      src: "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?w=1200&q=80&auto=format&fit=crop",
      alt: "Team collaborating in a modern office",
    },
    consulting: {
      src: "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?w=1200&q=80&auto=format&fit=crop",
      alt: "Team collaborating in a modern office",
    },
  },

  /** Portfolio / Work section */
  projects: {
    // Each project image is configured in projects data.
    // Drop screenshots into /public/images/projects/{slug}/
    basePath: "/images/projects",
  },

  /** Tech Stack logos — real SVGs only */
  techStack: {
    basePath: "/images/tech",
  },

  /** Testimonials */
  testimonials: {
    basePath: "/images/testimonials",
  },
} as const;

export type ImageConfig = typeof images;
