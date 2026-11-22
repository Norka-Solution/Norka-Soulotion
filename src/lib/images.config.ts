/**
 * Central image configuration for NORKA SOLUTION.
 *
 * Since the 2026 redesign the site uses no stock photos: heroes, service
 * and project visuals are drawn in code (src/components/visuals/).
 * Only the brand marks live here.
 */

export const images = {
  brand: {
    /** round app icon (brand/logo.png) */
    logo: {
      src: "/logo.png",
      alt: "Norka Solution",
    },
    /** the blue gear-and-brain mark on its own (brand/logo-blue.png) */
    mark: {
      src: "/logo-mark.png",
      alt: "Norka Solution",
    },
  },
} as const;
