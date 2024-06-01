import Detailed_product from "@/models/all_product.db";
import connectDB from "@/models/connect.db";
import Product from "@/models/show_product";

import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const data = await Product.findById(params.id);

    console.log(data);
    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 404 });
  }
}
