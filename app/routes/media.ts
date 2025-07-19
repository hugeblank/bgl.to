import { env } from "~/api/env.server";
import path from "path";
import { createReadableStreamFromReadable } from "@react-router/node";
import { readFile, stat } from "fs/promises";
import { fileTypeFromFile } from "file-type";
import { createReadStream } from "fs";
import { makeContentRangeHeader, parseRange } from "~/lib/range.server";
import type { Route } from "./+types/media";

export async function loader({ params, request }: Route.LoaderArgs) {
  const fullpath = path.join(env.MEDIA_PATH, params.name);
  const mime = await fileTypeFromFile(fullpath);
  if (mime) {
    const stats = await stat(fullpath);

    // Handle Content-Range (for videos, mainly)
    const range = request.headers.get("range");
    const parsedRange = range ? parseRange(range, stats.size) : undefined;

    // Stream the file from disk
    // const name = path.basename(fullpath);
    const stream = createReadStream(fullpath, {
      start: parsedRange?.start,
      end: parsedRange?.end,
    });
    const returnedLength = parsedRange
      ? parsedRange.end - parsedRange.start + 1
      : stats.size;

    return new Response(createReadableStreamFromReadable(stream), {
      headers: {
        Date: stats.mtime.toUTCString(),
        "Last-Modified": stats.mtime.toUTCString(),
        // "Content-Disposition": download
        //   ? `attachment; filename="${name}"`
        //   : "inline",
        "Content-Type": mime.mime,
        "Accept-Ranges": "bytes",
        ...(parsedRange
          ? {
              "Content-Range": makeContentRangeHeader(parsedRange, stats.size),
            }
          : {}),
        ...(returnedLength
          ? { "Content-Length": returnedLength.toString() }
          : {}),
        "Cache-Control": "private, max-age=2592000, immutable", // 30 days, no shared caches (e.g. Cloudflare)
      },
      status: parsedRange ? 206 : 200,
    });
  }
  const headers = new Headers();
  headers.append("Content-Type", "text/plain");
  return new Response((await readFile(fullpath)).toString(), {
    status: 200,
    headers,
  });
}
