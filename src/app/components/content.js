"use client";

import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Image from "next/image";
import { Prompt } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/slices/fetchProduct.thunk";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as NProgress from "nprogress";
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";

export const prompt = Prompt({
  weight: ["400"],
  subsets: ["latin"],
});

export default function AnimatedListComponent() {
  const [page, setPage] = useState(0);
  const loader = useRef(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [hotProducts, setHotProducts] = useState([{}]);
  const [activeSlide, setActiveSlide] = useState({
    activeIndex: 0,
    products: "",
  });

  // get hot products from the server

  useEffect(() => {
    fetch("/api/fetch-hot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHotProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const options = {
      root: document.body,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }
    console.log("Page loaded");
  }, []);
  useEffect(() => {
    dispatch(fetchProducts(page));
    console.log("fetching data");
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];

    if (target.isIntersecting) {
      if (!fetchLoading) {
        setPage((prev) => prev + 1);
        setFetchLoading(true);
      }
    }
  };

  useEffect(() => {
    setFetchLoading(false);
  }, [products]);

  return (
    <>
      {/* //?Content */}

      <div
        className="w-[100%] overflow-y-auto h-100%] overflow-scroll"
        id="content-scroll"
      >
        {/* <br /> */}

        <div>
          <div className=" gap-20 p-6  bg-[#f3f8fd] rounded-md  mb-10 flex flex-col md:flex-row-reverse justify-center md:justify-between items-center ">
            <div className="relative w-[290px] sm:w-[350px] md:w-[450px] overflow-auto">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                onSlideChange={(swiper) => {
                  console.log(swiper.realIndex);
                  setActiveSlide({
                    activeIndex: swiper.realIndex,
                    product_id: hotProducts[swiper.realIndex]?.product_id,
                  });
                }}
              >
                {hotProducts && hotProducts.length > 0
                  ? hotProducts.map((item, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          onLoad={(e) => {
                            e.target.style.display = "block";
                          }}
                          onClick={() => {
                            router.push(
                              `/dashboard/products/${item.product_id}`
                            );
                          }}
                          className="hidden cursor-pointer"
                          src={item.hotImages}
                          width={500}
                          height={500}
                        ></Image>
                      </SwiperSlide>
                    ))
                  : "Loading..."}
              </Swiper>
            </div>
            <div className="p- flex flex-col gap-y-6">
              <div className="text-5xl font-[700] text-[#05386a] ">
                <span className="relative">
                  Shop{" "}
                  <span className="w-full h-[30%] bg-[#017df931] absolute left-0 bottom-1 rotate-2"></span>
                </span>{" "}
                Something
                <br />
                Unique!
              </div>

              {/* trust icons with design  */}
              <div className="flex gap-4 p-4  text-sm justify-around items-center w-full bg-white text-center">
                <div className="flex gap-1 flex-col justify-center items-center ">
                  <i className="bi bi-shield-check text-[#017BF9] text-2xl"></i>
                  <span className=" text-xs md:text-sm font-semibold">
                    Secure Payment
                  </span>
                </div>
                <div className="flex gap-1 items-cente flex-col justify-center items-center text-center">
                  <i className="bi bi-truck text-[#017BF9] text-2xl"></i>
                  <span className=" text-xs md:text-sm font-semibold">
                    Fast Delivery
                  </span>
                </div>
                <div className="flex gap-1 items-cente flex-col justify-center items-center text-center">
                  <i className="bi bi-credit-card-2-front text-[#017BF9] text-2xl"></i>
                  <span className=" text-xs md:text-sm font-semibold">
                    Easy Payment
                  </span>
                </div>
              </div>

              {/* buttons  */}
              <div className="flex gap-2 font-[600] justify-center items-center">
                <button
                  className="bg-[#017BF9] shadow-lg  text-white p-3 px-6 text-lg rounded-md"
                  onClick={() => {
                    router.push(
                      `/dashboard/products/${activeSlide.product_id}`
                    );
                  }}
                >
                  Shop Now <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          {/* //?content title */}
          <div className="flex justify-start gap-1 items-center">
            <span>
              <h1 className="text-[28px] font-semibold text-[#474A5A] p-2">
                Products
              </h1>
            </span>
            <span className="w-full h-[1px] bg-[#dfdfdf]"></span>
          </div>
          <br />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-2 md:gap-3 lg:gap-5 ">
            {products &&
              products.length > 0 &&
              products.map((item, index) => (
                <Content key={index} product={item} />
              ))}
          </div>
        </div>

        <div
          className="loader relative py-5 flex justify-center items-center"
          ref={loader}
        >
          <div id="load"></div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

function Content({ product }) {
  var { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when element comes into view
    threshold: 0.2, // Trigger animation when 50% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      // Do something when element comes into view
    }
  }, [inView]);

  const pathname = usePathname();

  return (
    <Link
      ref={ref}
      scroll={false}
      href={`/dashboard/products/${product._id}`}
      // href='/dashboard'
      id={`product-${product._id}`}
      // key={index}
      className="relative md:hover:shadow-lg md: hover:z-[3]  md:hover:scale-105 md:hover:mt-[-30px] duration-100 ease-in-out rounded-md"
      // data-liked={product.liked}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} // Initial state: scaled down and invisible
        animate={inView ? { scale: 1, opacity: 1 } : {}} // Animate to full size and visible when in view
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 35,
          duration: 0.01,
        }} // Spring animation
        className="rounded-md  flex flex-col justify-center gap-2 items-center cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <Image
            className="rounded-md bg-[#ac4040] hover:scale-110 transition duration-500 ease-in-out"
            src={product.colorInfo[0].color_image[0]}
            width={500}
            height={500}
            alt="Picture of the watch"
          />
        </div>

        <div className="w-[100%] flex flex-col gap-1 justify-center items-center text-[#53514D]">
          <h1 className="text-lg font-semibold text-[#313131] text-center">
            {product.product_name}
          </h1>
          <p className="text-sm text-[#7b7b7b] text-center inline-block whitespace-nowrap overflow-hidden text-ellipsis w-full px-2 md:px-5">
            {product.product_description}
          </p>
          <span className="text-[var(--theme-color)] text-sm font-medium">
            {product.product_price}
          </span>
        </div>
      </motion.div>
      {/* <i className="bi-heart heart"></i> */}
    </Link>
  );
}
