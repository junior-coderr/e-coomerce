"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import localStorage from "@/app/components/helper/localStorage";

// Redux store
import { useSelector, useDispatch } from "react-redux";
import {
  addOrderProduct,
  clearOrderProduct,
} from "@/redux/slices/orderDetails";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import Back from "@/app/profile/profile_components/button/back_btn";

export default function Page({ params }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [productData, setProductData] = useState(null);
  const [width, setWidth] = useState(0);
  const [data, setData] = useState({});
  const [listActive, setListActive] = useState(false);
  const [quantity, setQuantity] = useState("");
  const sizeRef = useRef(null);
  const [imagesToBEShown, setImagesToBEShown] = useState(null);
  const [colorName, setColorName] = useState("");
  const [pageLoaded, setPageLoaded] = useState(false);

  // redux store
  const orderDetails = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  // first clearing the order details
  useEffect(() => {
    if (data.quantity < 4) {
      setQuantity("");
    }
    dispatch(
      addOrderProduct({
        ...data,
        product_id: productData ? productData._id : null,
      })
    );
  }, [data]);

  useEffect(() => {
    // console.log("orderDetails", orderDetails);
  }, [orderDetails]);

  useEffect(() => {
    // localStorage.setValue("a", "ALfa");
    // console.log(localStorage.getValue("a"));
    dispatch(clearOrderProduct());

    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    fetch(`/api/fetch-products-details/detailed-product-data/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params.id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProductData(data.data);
        setData({
          size: data.data.sizes[0],
          quantity: 1,
          color: data.data.colorInfo[0].color,
        });
        dispatch(
          addOrderProduct({
            size: data.data.sizes[0],
            quantity: 1,
            color: data.data.colorInfo[0].color,
            product_id: data.data._id,
          })
        );
        setImagesToBEShown(data.data.colorInfo[0].color_image);
        setColorName(data.data.colorInfo[0].color);

        setTimeout(() => {
          try {
            document.getElementsByClassName("quantity1")[0].checked = true;
            document.getElementsByClassName("size0")[0].checked = true;
          } catch (error) {
            console.log(error);
          }
        }, 300);
      })
      .catch((err) => {
        console.log(err);
      });

    setPageLoaded(true);
  }, []);

  const zoomMove = (e, image) => {
    const elem = e.target;
    elem.style.display = "block";
    elem.style.backgroundImage = `url(${image})`;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const width = elem.offsetWidth;
    const height = elem.offsetHeight;
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
    elem.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  };

  const zoomDone = (e) => {
    const elem = e.target;
    elem.style.backgroundImage = ``;
    elem.style.backgroundPosition = "50% 50%";
  };

  return (
    <>
      <div className="absolute w-[100%] h-[100svh] p-2 left-0 top-0 bg-[#F9F9F9] z-[10] flex flex-col gap-4 md:flex-row overflow-auto items-center md:items-start md:justify-center">
        {/* section 1 */}
        <div className="flex flex-col gap-2 relative md:w-[50%] max-w-[500px]  w-[100%]">
          <Back />
          <div className="relative">
            <Swiper
              thumbs={{
                swiper: thumbsSwiper && !thumbsSwiper.destroyed && thumbsSwiper,
              }}
              pagination={{
                type: "fraction",
              }}
              spaceBetween={20}
              modules={[FreeMode, Thumbs, Navigation, Pagination]}
              className="mySwiper"
            >
              {imagesToBEShown
                ? imagesToBEShown.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Zoom>
                        {width > 850 && (
                          <div
                            className="w-full cursor-zoom-in h-full absolute top-0 left-0 bg-cover"
                            style={{
                              backgroundSize: "200%",
                              backgroundPosition: "50% 50%",
                            }}
                            onMouseMove={(e) => zoomMove(e, image)}
                            onMouseLeave={zoomDone}
                          ></div>
                        )}
                        <Image
                          className="rounded-md border-[1px] border-[#EAEAF1] select-none"
                          src={image}
                          width={500}
                          height={500}
                          alt="Picture of the watch"
                        />
                      </Zoom>
                    </SwiperSlide>
                  ))
                : null}
            </Swiper>
          </div>

          <div>
            <div>
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Thumbs, Navigation]}
                spaceBetween={8}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
              >
                {imagesToBEShown
                  ? imagesToBEShown.map((image, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          className="rounded-md cursor-pointer border-[1px] border-[#EAEAF1] select-none "
                          src={image}
                          width={100}
                          height={100}
                          alt="Picture of the watch"
                        />
                      </SwiperSlide>
                    ))
                  : null}
              </Swiper>
            </div>
          </div>
        </div>

        {/* section 2 */}
        <div className="w-[100%] md:w-[50%] flex flex-col gap-4 ">
          {/* name and price rating  */}
          <div className="border-[1.5px] border-[#EAEAF1] p-4 rounded-lg text-[#606060] flex flex-col gap-3 relative">
            <h1 className="text-xl font-semibold">
              {productData ? productData.product_name : null}
            </h1>
            {/* rating  */}
            <div>
              <span className="inline gap-2 bg-theme text-white p-1 font-semibold rounded">
                {productData ? productData.product_rating : null}{" "}
                <i className="bi bi-star-fill text-[white]"></i>
              </span>
            </div>

            <h1 className="text-4xl font-medium text-[#353543]">
              ${productData ? productData.product_price : null}
            </h1>

            {/* free delivery  */}
            <div className="absolute p-3 text-[#0000009a] right-0 select-none bottom-0">
              <span className="inline bg-[#F2F2F2] p-2 text-xs font-semibold rounded-full">
                Free Delivery
              </span>
            </div>
          </div>

          {/* color section  */}
          <div>
            <div className="border-[1.5px] border-[#EAEAF1] p-4 rounded-lg ">
              <h1 className="text-lg font-semibold text-[#50505C] ">
                Color: {colorName}
              </h1>
              <div className="flex gap-2">
                {productData &&
                productData.colorInfo &&
                productData.colorInfo.length > 1 ? (
                  productData.colorInfo.map((color, index) => (
                    <div key={index}>
                      <div>
                        <Image
                          className="rounded-md cursor-pointer border-[1px] border-[#EAEAF1] select-none "
                          src={color.color_image[0]}
                          width={70}
                          height={70}
                          alt="Picture of the watch"
                          onClick={() => {
                            setImagesToBEShown(color.color_image);
                            setColorName(color.color);
                            // saving dcolor to data
                            setData({ ...data, color: color.color });
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>

          {/* size section  */}
          {productData && productData.sizes.length > 0 ? (
            <div className="border-[1.5px] border-[#EAEAF1] p-4 rounded-lg ">
              <h1 className="text-lg font-semibold text-[#50505C] ">Size</h1>
              <div className="flex gap-2">
                {productData.sizes.map((size, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <input
                      type="radio"
                      id={index}
                      ref={sizeRef}
                      className={`size${index}`}
                      name="size"
                      value={size}
                      onChange={(e) => {
                        setData({ ...data, size: e.target.value });
                      }}
                    />
                    <label
                      key={index}
                      htmlFor={index}
                      className="bg-[#F9F9F9] select-none p-2 rounded-md hover:text-[#017BF9] hover:cursor-pointer"
                      data-size={size}
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          {/* selecting quantity section 1  */}
          <div className="border-[1.5px] border-[#EAEAF1] p-4 rounded-lg ">
            <h1 className="text-lg font-semibold text-[#50505C] ">Quantity</h1>
            <div className="flex gap-2">
              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  id={"quantity1"}
                  name="quantity"
                  className="quantity1"
                  value={1}
                  onChange={(e) => {
                    setData({ ...data, quantity: e.target.value });
                  }}
                />
                <label
                  htmlFor={"quantity1"}
                  className="bg-[#F9F9F9] select-none p-2 rounded-md hover:text-[#017BF9] hover:cursor-pointer"
                >
                  {1}
                </label>
              </div>
              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  id={"quantity2"}
                  name="quantity"
                  value={2}
                  onChange={(e) => {
                    setData({ ...data, quantity: e.target.value });
                  }}
                />
                <label
                  htmlFor={"quantity2"}
                  className="bg-[#F9F9F9] select-none p-2 rounded-md hover:text-[#017BF9] hover:cursor-pointer"
                >
                  {2}
                </label>
              </div>
              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  id={"quantity3"}
                  name="quantity"
                  value={3}
                  onChange={(e) => {
                    setData({ ...data, quantity: e.target.value });
                  }}
                />
                <label
                  htmlFor={"quantity3"}
                  className="bg-[#F9F9F9] select-none p-2 rounded-md hover:text-[#017BF9] hover:cursor-pointer"
                >
                  {3}
                </label>
              </div>
            </div>

            {/* quantity section2  */}
            <div className="relative w-12">
              <input
                className="w-12 text-center border-[1px] outline-none rounded-sm border-[#767676]"
                placeholder="Qty"
                name="quantity"
                value={quantity}
                onFocus={(e) => {
                  setListActive(true);
                  console.log("active");
                }}
                onBlur={(e) => {
                  setTimeout(() => {
                    setListActive(false);
                  }, 200);
                }}
              />
              {listActive ? (
                <div className="absolute w-full h-[80px]  overflow-scroll bg-[#F2F2F2] flex flex-col items-center shrink-0">
                  <div className="w-full text-center flex justify-center items-center">
                    <input
                      type="radio"
                      id={"quantity4"}
                      name="quantity"
                      className="hidden"
                      value={4}
                      onChange={(e) => {
                        setData({ ...data, quantity: e.target.value });
                      }}
                    />
                    <label
                      htmlFor={"quantity4"}
                      className=" block  min-w-full select-none hover:text-[#017BF9] hover:cursor-pointer"
                      value={4}
                      onClick={(e) => {
                        setQuantity(e.target.innerText);
                      }}
                    >
                      {4}
                    </label>
                  </div>
                  <div className="w-full text-center">
                    <input
                      type="radio"
                      id={"quantity5"}
                      name="quantity"
                      className="hidden"
                      value={5}
                      onChange={(e) => {
                        setData({ ...data, quantity: e.target.value });
                      }}
                    />
                    <label
                      htmlFor={"quantity5"}
                      className=" block  min-w-full select-none hover:text-[#017BF9] hover:cursor-pointer"
                      onClick={(e) => {
                        setQuantity(e.target.innerText);
                      }}
                    >
                      {5}
                    </label>
                  </div>
                  <div className="w-full text-center">
                    <input
                      type="radio"
                      id={"quantity6"}
                      name="quantity"
                      className="hidden"
                      value={6}
                      onChange={(e) => {
                        setData({ ...data, quantity: e.target.value });
                      }}
                    />
                    <label
                      htmlFor={"quantity6"}
                      className=" block  min-w-full select-none hover:text-[#017BF9] hover:cursor-pointer"
                      onClick={(e) => {
                        setQuantity(e.target.innerText);
                      }}
                    >
                      {6}
                    </label>
                  </div>
                  <div className="w-full text-center">
                    <input
                      type="radio"
                      id={"quantity7"}
                      name="quantity"
                      className="hidden"
                      value={7}
                      onChange={(e) => {
                        setData({ ...data, quantity: e.target.value });
                      }}
                    />
                    <label
                      htmlFor={"quantity7"}
                      className=" block  min-w-full select-none hover:text-[#017BF9] hover:cursor-pointer"
                      onClick={(e) => {
                        // console.log("quantity", e.target.text);
                        setQuantity(e.target.innerText);
                      }}
                    >
                      {7}
                    </label>
                  </div>
                  <div className="w-full text-center">
                    <input
                      type="radio"
                      id={"quantity8"}
                      name="quantity"
                      className="hidden"
                      value={8}
                      onChange={(e) => {
                        setData({ ...data, quantity: e.target.value });
                      }}
                    />
                    <label
                      htmlFor={"quantity8"}
                      className=" block  min-w-full select-none hover:text-[#017BF9] hover:cursor-pointer"
                      onClick={(e) => {
                        // console.log("quantity", e.target.text);
                        setQuantity(e.target.innerText);
                      }}
                    >
                      {8}
                    </label>
                  </div>
                  <div className="w-full text-center">
                    <input
                      type="radio"
                      id={"quantity9"}
                      name="quantity"
                      className="hidden"
                      value={9}
                      onChange={(e) => {
                        setData({ ...data, quantity: e.target.value });
                      }}
                    />
                    <label
                      htmlFor={"quantity9"}
                      className=" block  min-w-full select-none hover:text-[#017BF9] hover:cursor-pointer"
                      onClick={(e) => {
                        // console.log("quantity", e.target.text);
                        setQuantity(e.target.innerText);
                      }}
                    >
                      {9}
                    </label>
                  </div>
                  <div className="w-full text-center">
                    <input
                      type="radio"
                      id={"quantity10"}
                      name="quantity"
                      className="hidden"
                      value={10}
                      onChange={(e) => {
                        setData({ ...data, quantity: e.target.value });
                      }}
                    />
                    <label
                      htmlFor={"quantity10"}
                      className=" block  min-w-full select-none hover:text-[#017BF9] hover:cursor-pointer"
                      onClick={(e) => {
                        // console.log("quantity", e.target.text);
                        setQuantity(e.target.innerText);
                      }}
                    >
                      {10}
                    </label>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* buy and cart and other options */}
          <div>
            {pageLoaded ? (
              <div className="flex  gap-4 font-medium flex-wrap justify-center md:justify-start">
                <Link
                  href="/checkout/single"
                  className="bg-theme w-[150px] shadow-md p-3 px-6 rounded-md text-white text-center cursor-pointer"
                  onClick={localStorage.setValue("orderDetails", orderDetails)}
                >
                  Buy Now
                </Link>
                <div className="bg-[#f2f2f2] w-[150px] shadow-sm border-[1px] p-3 px-6 rounded-md text-[black] text-center cursor-pointer">
                  Add to cart
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* description */}
          <div className="border-[1.5px] border-[#EAEAF1] p-4 rounded-lg ">
            <h1 className="text-lg font-semibold text-[#353543]">
              Description
            </h1>
            <p className="text-md text-[#616173]">
              Lorem ipsum dolor sit amet consectetur, adipisicing dipisicing
              elit.dipisicing Lorem ipsum dolor sit amet consectetur,
              adipisicing dipisicing elit.dipisicing Lorem ipsum dolor sit amet
              consectetur, adipisicing dipisicing elit.dipisicing Lorem ipsum
              dolor sit amet consectetur, adipisicing dipisicing elit.dipisicing
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
