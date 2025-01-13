import { HttpError } from "@/lib/http";
export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;
  if (force) {
    const headers = new Headers();
    headers.append("Set-Cookie", `accessToken=; Path=/; HttpOnly; Max-Age=0`);
    headers.append("Set-Cookie", `refreshToken=; Path=/; HttpOnly; Max-Age=0`);
    headers.append("Content-Type", "application/json");
    return Response.json(
      { message: "Buoc dang xuat thanh cong" },
      {
        status: 200,
        headers,
      }
    );
  }
  // const cookieStore = cookies();
  // const accessToken = (await cookieStore).get("accessToken");
  // const refreshToken = (await cookieStore).get("refreshToken");
//   if (!accessToken || !accessToken.value ) {
//     return Response.json(
//       {
//         message: "Khong nhan duoc session token hop le",
//       },
//       { status: 400 }
//     );
//   }
  try {
    // const body = {
    //   accessToken: accessToken?.value,
    //   refreshToken: refreshToken?.value,
    // };
    // const accountGoogle = await auth();
    // if (accountGoogle !== null) {
    //   console.log("dang suat google")
    //   await signOut();
    // }
    // const result = await authApiRequest.logoutFromNextServerToServer(body)
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `accessToken=; Path=/; HttpOnly;HttpOnly; Max-Age=0`
    );
    headers.append(
      "Set-Cookie",
      `accessTokenExpires=; Path=/; Secure; Max-Age=0`
    );
    headers.append("Set-Cookie", `refreshToken=; Path=/; HttpOnly; Max-Age=0`);
    // headers.append('Content-Type', 'application/json');
    return Response.json("result", {
      status: 200,
      headers,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json({ message: "loi khong xac dinh" });
    }
  }
}
