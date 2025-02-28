import http from "@/lib/http";

const openAiApiRequest = {
  auth: (body: { accessToken: string; refreshToken: string }) =>
    http.post("api/authen", body, { baseUrl: "" }),
};
export default openAiApiRequest;
