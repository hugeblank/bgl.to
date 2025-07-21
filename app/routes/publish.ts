import { env } from "~/api/env.server";
import type { Route } from "./+types/publish";
import { fileTypeFromBuffer } from "file-type";
import path from "path";
import { writeFile } from "fs/promises";

export async function action({ request }: Route.ActionArgs) {
  if (request.method === "POST") {
    const auth = request.headers.get("X-Bgl-Authorization");
    if (auth === env.AUTH) {
      const formData = await request.formData();
      const entry = formData.get("media") as File | null;
      if (entry) {
        const buf = await entry.arrayBuffer();
        const type = await fileTypeFromBuffer(buf);
        const name = `${Date.now()}.${type ? type.ext : "txt"}`;
        await writeFile(path.join(env.MEDIA_PATH, name), Buffer.from(buf));
        return new Response(name, {
          status: 200,
        });
      }
    } else {
      return new Response(null, { status: 401 });
    }
  }
  return new Response(null, { status: 400 });
}
