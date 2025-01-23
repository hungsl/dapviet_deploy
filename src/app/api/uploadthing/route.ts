import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: Request) {
  try {
    // Lấy dữ liệu từ form-data
    const formData = await req.formData();
    const files = formData.getAll("files") as File[]; // Lấy danh sách file

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "No files provided" }, { status: 400 });
    }

    // Tải các file lên thông qua UTApi
    const uploadedFiles = await utapi.uploadFiles(files);
    console.log(uploadedFiles)
    return NextResponse.json({ success: true, files: uploadedFiles });
  } catch (error) {
    console.error("Failed to upload images:", error);
    return NextResponse.json({ success: false, message: "Failed to upload images" }, { status: 500 });
  }
}
