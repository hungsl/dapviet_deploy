import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: Request) {
  try {
    const { imageKeys } = await req.json(); // Lấy `imageKey` từ request body
    if (!imageKeys || !Array.isArray(imageKeys) || imageKeys.length === 0) {
      return NextResponse.json(
        { success: false, message: "Image keys are required and must be an array" },
        { status: 400 }
      );
    }

    await utapi.deleteFiles(imageKeys);
    return NextResponse.json({ success: true, message: "Images deleted successfully" });
  } catch (error) {
    console.error("Failed to delete image:", error);
    return NextResponse.json({ success: false, message: "Failed to delete image" }, { status: 500 });
  }
}
