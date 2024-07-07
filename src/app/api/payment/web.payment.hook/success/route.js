import { NextResponse } from "next/server";
export async function POST(req) {
  console.log("Success !webhook received");
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
