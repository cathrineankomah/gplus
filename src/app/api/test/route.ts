import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(request: Request) {
  console.log("POST request received");
  try {
    const payload = await request.json();
    const body = JSON.stringify(payload);
    console.log("Received payload:", body);
    return new Response("success", { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
