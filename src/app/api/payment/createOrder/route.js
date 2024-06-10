import { generateAccessToken } from "../../../../helpers/palpal/generateAccessToken";
import { handleResponse } from "../../../../helpers/palpal/handlerResponse";
import { NextResponse } from "next/server";
const base = "https://api-m.sandbox.paypal.com";

const createOrder = async (cart) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    cart
  );

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100",
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
