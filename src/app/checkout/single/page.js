"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import localStorage from "@/app/components/helper/localStorage";
import Back from "@/app/profile/profile_components/button/back_btn";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import localStorage from "@/app/components/helper/localStorage";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

export default function Single() {
  // paypal setup

  const initialOptions = {
    "client-id":
      "AflEnex5QdfWv-7Y9qorPmePi3LlQ_w4GKazu1AoCm2AVL3gIzB96LCB2EuiuuX4qlKH3jjQl_HN4nKG",
    "enable-funding": "venmo",
    // country: "US",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
    intent: "capture",
  };

  const style = {
    layout: "vertical",
    color: "blue",
    shape: "rect",
    label: "paypal",
    height: 40,
  };
  const [message, setMessage] = useState("");
  // const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    setOrderDetails(localStorage.getValue("orderDetails"));
    // console.log("orderDetails", orderDetails);
  }, []);

  // setting up redux store
  const [productDetails, setProductDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    setOrderDetails(localStorage.getValue("orderDetails"));
  }, []);

  useEffect(() => {
    loadProductDetails()
      .then((res) => {
        if (res.success) {
          setProductDetails(res.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [orderDetails]);

  async function loadProductDetails() {
    try {
      // console.log("product_id", orderDetails.products.product_id);
      const res = await fetch(
        `/api/fetch-products-details/detailed-product-data/${orderDetails.products.product_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: orderDetails.products.product_id,
            productDetails: orderDetails.products,
            order: true,
          }),
        }
      );

      const data = await res.json();
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  return (
    <>
      <div className="App flex flex-col justify-start w-full max-w-[700px] mx-auto p-5 items-center gap-8">
        <div className="absolute p-2 top-0 left-0">
          <Back dest={"series"}></Back>
        </div>
        {productDetails ? (
          <div>
            <div
              id={`product-${productDetails._id}`}
              className="relative rounded-md"
            >
              <div className="rounded-md cursor-pointer flex gap-3 flex-wrap w-full">
                <Link
                  href={`/dashboard/products/${productDetails._id}`}
                  className="relative overflow-hidden w-full flex justify-center"
                >
                  <Image
                    className="rounded-md bg-[#ac4040] border-[1px] border-[#EAEAF1] select-none  hover:scale-110 transition duration-500 ease-in-out"
                    src={productDetails.colorInfo[0].color_image[0]}
                    width={400}
                    height={400}
                    alt="Picture of the watch"
                  />
                </Link>

                <div className="w-[100%]  border-[1px] rounded-md border-[#EAEAF1] select-none p-3 max-w-[400px] mx-auto flex flex-col gap-1 text-[#53514D] text-xl font-medium cursor-default">
                  {/* name  */}
                  <h1 className="text-2xl font-semibold text-[#313131] ">
                    {productDetails.product_name}
                  </h1>
                  {/* color  */}
                  {orderDetails.products.color ? (
                    <div className="flex gap-2 mt-2">
                      <span className="">Color:</span>
                      <span className="">{orderDetails.products.color}</span>
                    </div>
                  ) : null}
                  {/* size  */}
                  {orderDetails.products ? (
                    <div className="flex gap-2">
                      <span className="">Size:</span>
                      <span className="">
                        {orderDetails.products.size
                          ? orderDetails.products.size
                          : ""}
                      </span>
                    </div>
                  ) : null}
                  {/* Quantity  */}
                  {orderDetails.products.quantity ? (
                    <div className="flex gap-2">
                      <span className="">Quantity:</span>
                      <span className="">{orderDetails.products.quantity}</span>
                    </div>
                  ) : null}
                  {/* price  */}
                  <div className="flex gap-2">
                    <span className="">Price: $</span>
                    <span className="text-[var(--theme-color)]">
                      {productDetails.product_price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          "loading..."
        )}

        <section className="w-full">
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={style}
              createOrder={async () => {
                try {
                  const response = await fetch("/api/payment/createOrder", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    // use the "body" param to optionally pass additional order information
                    // like product ids and quantities
                    body: JSON.stringify({ orderDetails, isSingle: true }),
                  });

                  const orderData = await response.json();

                  if (orderData.id) {
                    return orderData.id;
                  } else {
                    const errorDetail = orderData?.details?.[0];
                    const errorMessage = errorDetail
                      ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                      : JSON.stringify(orderData);

                    throw new Error(errorMessage);
                  }
                } catch (error) {
                  console.error(error);
                  setMessage(`Could not initiate PayPal Checkout...${error}`);
                }
              }}
              onApprove={async (data, actions) => {
                console.log("onApprove", data, actions);
                try {
                  const response = await fetch(
                    `/api/payment/captureOrder/${data.orderID}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  const orderData = await response.json();
                  // Three cases to handle:
                  //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  //   (2) Other non-recoverable errors -> Show a failure message
                  //   (3) Successful transaction -> Show confirmation or thank you message

                  const errorDetail = orderData?.details?.[0];

                  if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                    return actions.restart();
                  } else if (errorDetail) {
                    // (2) Other non-recoverable errors -> Show a failure message
                    throw new Error(
                      `${errorDetail.description} (${orderData.debug_id})`
                    );
                  } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');
                    const transaction =
                      orderData.purchase_units[0].payments.captures[0];
                    setMessage(
                      `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                    );
                    console.log(
                      "Capture result",
                      orderData,
                      JSON.stringify(orderData, null, 2)
                    );
                  }
                } catch (error) {
                  console.error(error);
                  setMessage(
                    `Sorry, your transaction could not be processed...${error}`
                  );
                }
              }}
              onShippingChange={async (data, actions) => {
                return actions.resolve();
              }}
              onError={(error) => {
                console.error(error);
                setMessage(
                  `Sorry, your transaction could not be processed...${error}`
                );
              }}
            />
          </PayPalScriptProvider>
          <Message content={message} />
        </section>
      </div>
    </>
  );
}
