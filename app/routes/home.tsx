import type { Route } from "./+types/home";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg" },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "bgl.to" },
    { name: "description", content: "Hugeblank's Link Shortener" },
  ];
}

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col items-center gap-3 p-4 pt-16">
      <h1 className="text-4xl font-bold">bgl.to</h1>
      <p>Hugeblank&apos;s link shortener service. </p>
      <video controls className="mr-auto ml-auto min-w-1/6">
        <source src="https://hugeblank.dev/nene~yayboom.mp4" type="video/mp4" />
        <track src="https://hugeblank.dev/nene~yayboom.vtt" kind="captions" />
      </video>
    </main>
  );
}
