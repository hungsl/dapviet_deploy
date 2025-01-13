import { decodeJWT } from "@/lib/utils";
type payloadJWT = {
  iat: number;
  exp: number;
  userId: number;
  tokenType: string;
};
export async function POST(request: Request) {
  const res = await request.json();
  const accessToken = res.accessToken;
  const refreshToken = res.refreshToken;
  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: "khong nhan duoc accessToken token",
      },
      { status: 400 }
    );
  }
  const payload = decodeJWT<payloadJWT>(accessToken);
  const refreshPayload = decodeJWT<payloadJWT>(refreshToken);
  const expireDate = new Date(payload.exp * 1000).toUTCString();
  const expireDateRefreshToken = new Date(
    refreshPayload.exp * 1000
  ).toUTCString();
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Expires=${expireDate}; Secure`
  );
  headers.append(
    "Set-Cookie",
    `accessTokenExpires=${payload.exp * 1000}; Expires=${expireDate}; HttpOnly; Path=/; Secure`
  );
  headers.append(
    "Set-Cookie",
    `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Expires=${expireDateRefreshToken}; Secure`
  );
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(res), {
    status: 200,
    headers,
  });
}
