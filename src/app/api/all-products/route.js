import { NextResponse } from "next/server";
import Product from "../../../models/show_product.js";
import dbConnect from "../../../models/connect.db.js";

export async function POST(req) {
  await dbConnect();
  // const data = JSON.parse(req.body);
  const { page, limit = 10 } = await req.json();
  const skip = (page - 1) * limit;

  try {
    const res = await Product.find().skip(skip).limit(limit).exec();
    return NextResponse.json({ products: res });
  } catch (error) {
    console.log("error", error);
    // returning undefined
    return NextResponse.json({ products: [] });
  }
}
