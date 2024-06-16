// import Detailed_product from "@/models/detailed_product.db";
import connectDB from "@/models/connect.db";
import Product from "@/models/show_product";
import User from "@/models/user";
import { cookies } from "next/headers";
import { verify } from "@/lib/jwt";

import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const token = cookies().get("token");
  const updateData = await req.json();
  let carted = false;
  console.log("token", token);
  if (token && (updateData.order || updateData.carted)) {
    var isVerified = await verify(token.value);
  } else {
    var isVerified = null;
  }

  console.log("isVerified new", isVerified);

  try {
    await connectDB();
    const data = await Product.findById(params.id);

    if (isVerified && updateData.order) {
      const updatedProduct = await User.findOneAndUpdate(
        { email: isVerified.email }, // Query criteria
        { $set: { currentOrder: updateData.productDetails } }, // Use $set to update selective fields
        { new: true, runValidators: true } // Return the updated document and run schema validators
      );
      console.log("updatedProduct", updatedProduct);
    }

    // checking if item is in cart
    if (isVerified && updateData.carted) {
      const u = await User.findOne({ email: isVerified.email });
      u.cart.forEach((e) => {
        if (e.product_id == params.id) {
          carted = true;
        }
      });
    } else {
      console.log("No u");
    }

    return NextResponse.json(
      { data, success: true, carted: carted },
      { status: 200 }
    );
  } catch (err) {
    console.log("error:", err.message);
    return NextResponse.json({ success: false }, { status: 404 });
  }
}
