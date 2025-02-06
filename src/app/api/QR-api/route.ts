
export async function GET() {
    const apiUrl = "https://my.sepay.vn/userapi/transactions/list";
  const apiResponse = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY_QRCODE}`,
      "Content-Type": "application/json",
    },
  });
  if (!apiResponse.ok) {
    throw new Error("Failed to fetch data from external API");
  }
  const data = await apiResponse.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
        "Content-Type": "application/json",
      },
  });
}
