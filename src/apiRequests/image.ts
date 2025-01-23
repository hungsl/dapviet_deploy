import { DeleteImagesResponse, UploadImageResponse } from "@/app/(Profile)/staff/types";
import http from "@/lib/http";

const imageApiRequest = {
  uploadImage: (body: FormData) =>
    http.post<UploadImageResponse>("api/uploadthing", body, { baseUrl: "" }),
  
  deleteImage: (body: {imageKeys: string[]}) =>
    http.post<DeleteImagesResponse>("api/delete", body, { baseUrl: "" }),

};

export default imageApiRequest;
