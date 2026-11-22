import { notFound } from "next/navigation";

// Any unknown path under /en or /ar renders the localized not-found page
// (inside the site layout) instead of Next's bare default.
export default function CatchAllPage() {
  notFound();
}
