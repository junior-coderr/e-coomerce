// import Detailed_product from "@/models/detailed_product.db";
import connectDB from "@/models/connect.db";
import Product from "@/models/show_product";

import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  console.log("params", params);
  try {
    await connectDB();
    const data = await Product.findById(params.id);

    console.log("data", data);
    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (err) {
    console.log("error:", err.message);
    return NextResponse.json({ success: false }, { status: 404 });
  }
}
