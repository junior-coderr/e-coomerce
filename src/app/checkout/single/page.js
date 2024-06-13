"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import localStorage from "@/app/components/helper/localStorage";
import Back from "@/app/profile/profile_components/button/back_btn";

export default function Single() {
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
      <div className="absolute p-2 top-0 left-0">
        <Back dest={"series"}></Back>
      </div>
      {productDetails ? (
        <div>
          <div
            id={`product-${productDetails._id}`}
            className="relative md:hover:shadow-lg md: hover:z-[3]  md:hover:scale-105 md:hover:mt-[-30px] duration-100 ease-in-out rounded-md"
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
    </>
  );
}