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
const createOrder = async (data) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    data
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

      let total = null;
      console.log("is single", data.isSingle);
      let delivery_charges = 0;

      if (data.isSingle) {
        const quantity = user.currentOrder[0].quantity;
        const price = await Product.findById(user.currentOrder[0].product_id);
        let d = null;
        console.log("price", price);
        for (let i = 0; i < price.toObject().delivery_charges.length; i++) {
          if (
            price.toObject().delivery_charges[i].country ===
            user.address[user.address.length - 1].code
          ) {
            d = i;
            break;
          }
        }
        if (d == null)
          return {
            success: false,
            error: "Product Not available in the address selected",
          };

        total +=
          parseInt(quantity) * parseFloat(price.toObject().product_price);
        console.log("total", total);
        total += price.toObject().delivery_charges[d].base_charge;
        total +=
          price.toObject().delivery_charges[d].increment *
          (parseInt(quantity) - 1);
        console.log(
          "increment",
          price.toObject().delivery_charges[d].increment
        );
        console.log("base", price.toObject().delivery_charges[d].base_charge);
        console.log("total", total);
      } else {
        total = 0;

        const item = await user.populate("cart.product");

        for (let i = 0; i < item.cart.length; i++) {
          for (
            let j = 0;
            j < item.cart[i].product.delivery_charges.length;
            j++
          ) {
            if (
              item.cart[i].product.delivery_charges[j].country ==
              user.address[user.address.length - 1].code
            ) {
              delivery_charges +=
                item.cart[i].product.delivery_charges[j].base_charge;
              delivery_charges +=
                item.cart[i].product.delivery_charges[j].increment *
                (item.cart[i].quantity - 1);
            }
          }
          total +=
            parseFloat(item.cart[i].product.product_price) *
            parseInt(item.cart[i].quantity);
        }
        console.log("total", total);
        console.log("item", item);
        console.log("delivery_charges", delivery_charges);
      }

      total += Number(delivery_charges);

      if (!total) return { success: false, error: "Total not found." };
      const payload = {
        intent: "AUTHORIZE", //cc
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: total,
                },
              },
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
    // use the cart information passed from the front-end to calculate the order amount details
    const data = await req.json();
    const { jsonResponse, httpStatusCode } = await createOrder(data);
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
