"use client";
import React, { use, useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import localStorage from "@/app/components/helper/localStorage";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}
function App({ children }) {
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
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    setOrderDetails(localStorage.getValue("orderDetails"));
    // console.log("orderDetails", orderDetails);
  }, []);

  return (
    <div className="App flex flex-col justify-start w-full max-w-[700px] mx-auto p-5 items-center gap-8">
      {children}
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
                  body: JSON.stringify({ orderDetails }),
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
  );
}

export default App;
