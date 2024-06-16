import { generateAccessToken } from "../../../../helpers/palpal/generateAccessToken";
import { handleResponse } from "../../../../helpers/palpal/handlerResponse";
import { NextResponse } from "next/server";
import User from "@/models/user";
import connectDB from "@/models/connect.db";
const base = "https://api-m.sandbox.paypal.com";
import { cookies } from "next/headers";
import { verify } from "@/lib/jwt";
import Product from "@/models/show_product";

// createOrder.js
const createOrder = async (cart) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    cart
  );

  try {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const token = cookies().get("token");
    const isVerified = await verify(token.value);
    if (isVerified) {
      await connectDB();

      const { email } = isVerified;

      const user = await User.findOne({ email });

      if (!user) return { success: false, error: "User not found." };
      const quantity = user.currentOrder[0].quantity;
      const price = await Product.findById(user.currentOrder[0].product_id);
      const total = quantity * price.product_price;

      if (!total) return { success: false, error: "Total not found." };
      const payload = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total,
            },
          },
        ],
      };

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          // Uncomment one of these to force an error for negative testing (in sandbox mode only).
          // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
          // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      return handleResponse(response);
    } else {
      throw new Error(error.message);
    }
  } catch (error) {
    console.log("error", error);
    throw new Error(error.message);
    return { success: false, error: `Failed to create order.${error.message}` };
  }
};

// createOrder route
export async function POST(req) {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = await req.json();
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    // res.status(httpStatusCode).json(jsonResponse);
    return NextResponse.json(jsonResponse, { status: httpStatusCode });
  } catch (error) {
    console.error("Failed to create order:", error);
    // res.status(500).json({ error: "Failed to create order." });
    return NextResponse.json(
      { error: `Failed to create order.${error.message}` },
      { status: 500 }
    );
  }
}
