import { useEffect, useState } from "react";

/**
 * Three sides, one bundle.
 *
 * Hash routing rather than the History API, and no router dependency. The
 * reason is deployment: a History-API route 404s on GitHub Pages, Netlify drop
 * folders, and any static host without a rewrite rule, because the server is
 * asked for a file at /project that was never built. A hash never leaves the
 * server's view of the URL, so `index.html` answers every side. For a portfolio
 * someone will host wherever is free, that matters more than a clean path.
 */
export const SIDES = ["home", "project"] as const;
export type Side = (typeof SIDES)[number];

/**
 * No hidden routes.
 *
 * The previous system carried a `mask-review` harness for the img2threejs
 * reconstruction. That reconstruction is gone with the ink-wash system, so the
 * route went with it rather than staying behind as a URL that renders nothing.
 */
export type Route = Side;

function read(): Route {
  const h = location.hash.replace(/^#\/?/, "").split("?")[0];
  return (SIDES as readonly string[]).includes(h) ? (h as Route) : "home";
}

export function useSide(): [Route, (s: Route) => void] {
  const [side, setSide] = useState<Route>(read);

  useEffect(() => {
    const on = () => setSide(read());
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);

  // Each side is its own document as far as the reader is concerned, so it
  // starts at the top. Without this you arrive at the art wall already halfway
  // down it, because the browser kept the scroll offset from the side before.
  useEffect(() => {
    scrollTo({ top: 0, behavior: "auto" });
  }, [side]);

  const go = (s: Route) => {
    location.hash = s === "home" ? "/" : `/${s}`;
  };

  return [side, go];
}
