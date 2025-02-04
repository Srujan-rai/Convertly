import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export const runtime = "nodejs"; // Force Node.js runtime

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!ytdl.validateURL(url)) {
      return NextResponse.json({ success: false, message: "Invalid YouTube URL" });
    }

    const info = await ytdl.getInfo(url);
    const formats = info.formats.filter((format) => format.container === "mp4");

    return NextResponse.json({ success: true, formats });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch YouTube video" });
  }
}
