import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lasha Abramishvili — Portfolio",
    short_name: "Lasha.dev",
    description: "Full-stack development and data analytics portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090d",
    theme_color: "#08090d",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

