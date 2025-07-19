import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/:name", "routes/redirect.ts"),
  route("/m/:name", "routes/media.ts"),
  route("/api/trpc/*", "routes/trpc.ts"),
  route("/api/ln", "routes/ln.ts"),
  route("/api/publish", "routes/publish.ts"),
] satisfies RouteConfig;
