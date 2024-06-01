"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { usePathname } from "next/navigation";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import Back from "@/app/profile/profile_components/button/back_btn";

export default function Page({ params }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let urlArray = pathname.split("/");
    let productId = urlArray[urlArray.length - 1];

    fetch(
      `http://localhost:3000/api/fetch-products-details/detailed-product-data/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              <SwiperSlide key={1}>
                <Zoom>
                  <Image
                    className="rounded-md border-[1px] border-[#EAEAF1] select-none"
                    src={
                      "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                    }
                    width={500}
                    height={500}
                    alt="Picture of the watch"
                  />
                </Zoom>
              </SwiperSlide>
              <SwiperSlide key={2}>
                <div>
                  <Zoom>
                    <Image
                      className="rounded-md border-[1px] border-[#EAEAF1] select-none"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={500}
                      height={500}
                      alt="Picture of the watch"
                    />
                  </Zoom>
                </div>
              </SwiperSlide>
              <SwiperSlide key={3}>
                <div>
                  <Zoom>
                    <Image
                      className="rounded-md border-[1px] border-[#EAEAF1] select-none"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={500}
                      height={500}
                      alt="Picture of the watch"
                    />
                  </Zoom>
                </div>
              </SwiperSlide>
              <SwiperSlide key={4}>
                <div>
                  <Zoom>
                    <Image
                      className="rounded-md border-[1px] border-[#EAEAF1] select-none"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={500}
                      height={500}
                      alt="Picture of the watch"
                    />
                  </Zoom>
                </div>
              </SwiperSlide>
              <SwiperSlide key={5}>
                <div>
                  <Zoom>
                    <Image
                      className="rounded-md border-[1px] border-[#EAEAF1] select-none"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={500}
                      height={500}
                      alt="Picture of the watch"
                    />
                  </Zoom>
                </div>
              </SwiperSlide>
              <SwiperSlide key={6}>
                <div>
                  <Zoom>
                    <Image
                      className="rounded-md border-[1px] border-[#EAEAF1] select-none"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={500}
                      height={500}
                      alt="Picture of the watch"
                    />
                  </Zoom>
                </div>
              </SwiperSlide>
              <SwiperSlide key={7}>
                <div>
                  <Zoom>
                    <Image
                      className="rounded-md border-[1px] border-[#EAEAF1] select-none"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={500}
                      height={500}
                      alt="Picture of the watch"
                    />
                  </Zoom>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div>
            <div>
              <Swiper
                onSwiper={setThumbsSwiper}
                // loop={true}
                modules={[FreeMode, Thumbs, Navigation]}
                spaceBetween={8}
                slidesPerView={4}
                freeMode={true}
                watchSlidesVisibility={true}
                watchSlidesProgress={true}
              >
                <SwiperSlide key={1}>
                  <div>
                    <Image
                      // blue color
                      className="rounded-md border-[1px] border-[#EAEAF1"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={100}
                      height={100}
                      alt="Picture of the watch"
                    />
                  </div>
                </SwiperSlide>

                <SwiperSlide key={2}>
                  <div>
                    <Image
                      // blue color
                      className="rounded-md border-[1px] border-[#EAEAF1"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={100}
                      height={100}
                      alt="Picture of the watch"
                    />
                  </div>
                </SwiperSlide>

                <SwiperSlide key={3}>
                  <div>
                    <Image
                      // blue color
                      className="rounded-md border-[1px] border-[#EAEAF1"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={100}
                      height={100}
                      alt="Picture of the watch"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide key={4}>
                  <div>
                    <Image
                      // blue color
                      className="rounded-md border-[1px] border-[#EAEAF1"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={100}
                      height={100}
                      alt="Picture of the watch"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide key={5}>
                  <div>
                    <Image
                      // blue color
                      className="rounded-md border-[1px] border-[#EAEAF1"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={100}
                      height={100}
                      alt="Picture of the watch"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide key={6}>
                  <div>
                    <Image
                      // blue color
                      className="rounded-md border-[1px] border-[#EAEAF1"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={100}
                      height={100}
                      alt="Picture of the watch"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide key={7}>
                  <div>
                    <Image
                      // blue color
                      className="rounded-md border-[1px] border-[#EAEAF1"
                      src={
                        "https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp"
                      }
                      width={100}
                      height={100}
                      alt="Picture of the watch"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        {/* section 2 */}
        <div className="w-[100%] md:w-[50%] flex flex-col gap-4 ">
          {/* name and price rating  */}
          <div className="border-[1.5px] border-[#EAEAF1] p-4 rounded-lg text-[#8B8BA3] flex flex-col gap-3 relative">
            <h1 className="text-xl font-semibold">
              Product 1 Lorem ipsum dolor sit amet consectetur, adipisicing
            </h1>
            {/* rating  */}
            <div>
              <span className="inline gap-2 bg-theme text-white p-1 font-semibold rounded">
                4.1 <i className="bi bi-star-fill text-[white]"></i>
              </span>
            </div>

            <h1 className="text-4xl font-medium text-[#353543]">$21</h1>

            {/* free delivery  */}
            <div className="absolute p-3 text-[#0000009a] right-0 select-none bottom-0">
              <span className="inline bg-[#F2F2F2] p-2 text-xs font-semibold rounded-full">
                Free Delivery
              </span>
            </div>
          </div>

          {/* size, color,  */}
          <div className="border-[1.5px] border-[#EAEAF1] p-4 rounded-lg ">
            <h1 className="text-lg font-semibold text-[#50505C] ">Size</h1>
            <div className="flex gap-2">
              <div className="bg-[#F9F9F9] p-2 rounded-md">S</div>
              <div className="bg-[#F9F9F9] p-2 rounded-md">M</div>
              <div className="bg-[#F9F9F9] p-2 rounded-md">L</div>
              <div className="bg-[#F9F9F9] p-2 rounded-md">XL</div>
            </div>
          </div>

          {/* selecting quantity  */}
          <div className="border-[1.5px] border-[#EAEAF1] p-4 rounded-lg ">
            <h1 className="text-lg font-semibold text-[#50505C] ">Quantity</h1>
            <div className="flex gap-2">
              <div className="bg-[#F9F9F9] p-2 rounded-md">1</div>
              <div className="bg-[#F9F9F9] p-2 rounded-md">2</div>
              <div className="bg-[#F9F9F9] p-2 rounded-md">3</div>
              <div className="bg-[#F9F9F9] p-2 rounded-md">4</div>
            </div>
          </div>
          {/* buy and cart and other options */}
          <div>
            <div className="flex  gap-4 font-medium flex-wrap justify-center md:justify-start">
              <div className="bg-theme w-[150px] shadow-md p-3 px-6 rounded-md text-white text-center cursor-pointer">
                Buy Now
              </div>
              <div className="bg-[#f2f2f2] w-[150px] shadow-sm border-[1px] p-3 px-6 rounded-md text-[black] text-center cursor-pointer">
                Add to cart
              </div>
            </div>
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
