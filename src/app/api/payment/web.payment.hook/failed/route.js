import { NextResponse } from "next/server";
// paypal webhook route
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("webhook body:", body);
    return NextResponse.json({ message: "webhook received" }, { status: 200 });
  } catch (error) {
    console.error("Failed to process webhook:", error);
    return NextResponse.json(
      { error: `Failed to process webhook.${error.message}` },
      { status: 500 }
    );
  }
}
// Y3i4pt)^
