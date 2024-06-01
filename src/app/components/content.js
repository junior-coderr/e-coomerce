"use client";
import Image from "next/image";
import { Prompt } from "next/font/google";
import { useEffect, useState, useRef, use } from "react";
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

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

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

  useEffect(() => {
    console.log("fetchLoading", fetchLoading);
  }, [fetchLoading]);

  return (
    <>
      {/* //?Content */}

      <div
        className="w-[100%] overflow-y-auto h-100%] overflow-scroll"
        id="content-scroll"
      >
        {/* <br /> */}

        <div>
          <div className=" gap-8 p-6  bg-[#f3f8fd] rounded-md  mb-10 flex flex-col md:flex-row-reverse justify-center md:justify-between items-center ">
            <div className="">
              <Image
                className=""
                src="https://woodmart.b-cdn.net/wp-content/uploads/2024/02/slider-main-demo-3-light-opt.jpg.webp"
                width={500}
                height={500}
              ></Image>
            </div>
            <div className="p- flex flex-col gap-y-6">
              <div className="text-5xl font-[800] text-[#05386a] ">
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
                <button className="bg-[#017BF9] shadow-lg  text-white p-3 px-6 text-lg rounded-md">
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
          <div id="load">
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

function Content({ product }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when element comes into view
    threshold: 0.2, // Trigger animation when 50% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      // Do something when element comes into view
    }
  }, [inView]);

  const pathname = usePathname();

  async function operateLike(e) {
    e.preventDefault();

    try {
      let host = e.currentTarget.parentElement;
      const id = host.id.split("-")[1];
      let element = e.currentTarget;

      toast.dismiss();

      toast.loading("Saving...");

      const jsonData = await fetch(`/api/verified/save-product/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });

      const data = await jsonData.json();
      if (data.success) {
        console.log("data", data);
        if (data.exist) {
          toast.dismiss();
          toast.success("Removed");
        } else {
          toast.dismiss();
          toast.success("Saved!");
        }
        setTimeout(() => {
          NProgress.done();
        }, 100);
      } else {
        setTimeout(() => {
          NProgress.done();
        }, 100);

        toast.dismiss();
        toast.error("Failed to save!");
        return;
      }

      if (element.dataset.liked === "true") {
        element.classList.remove("bi-heart-fill");
        element.classList.add("bi-heart");
        element.style.color = "#0086D0";

        element.dataset.liked = "false";
      } else {
        element.classList.remove("bi-heart");
        element.classList.add("bi-heart-fill");
        element.style.color = "#0086D0";

        element.dataset.liked = "true";
      }
    } catch (error) {
      toast.dismiss();
      setTimeout(() => {
        NProgress.done();
      }, 100);
      toast.error("Failed to save!");
    }
  }

  function mouseHover(e) {
    e.preventDefault();

    const element = document.createElement("i");
    const host = e.currentTarget;

    // Like clicked
    element.addEventListener("click", (e) => {
      e.preventDefault();
      if (host.dataset.liked === "true") {
        element.classList.remove("bi-heart-fill");
        element.classList.add("bi-heart");
        element.style.color = "#017BF9";

        host.dataset.liked = "false";
      } else {
        element.classList.remove("bi-heart");
        element.classList.add("bi-heart-fill");
        element.style.color = "#017BF9";

        host.dataset.liked = "true";
      }
    });

    element.classList.add("bi");

    if (host.dataset.liked === "true") {
      element.classList.add("bi-heart-fill");
    } else {
      element.classList.add("bi-heart");
    }

    element.classList.add("heart");
    element.classList.add("shadow-xl");
    e.currentTarget.appendChild(element);
  }

  function mouseLeave(e) {
    e.preventDefault();
    e.currentTarget.removeChild(e.currentTarget.lastChild);
  }

  return (
    <Link
      ref={ref}
      scroll={false}
      href={`/dashboard/products/${product._id}`}
      // href='/dashboard'
      id={`product-${product._id}`}
      // key={index}
      className="relative md:hover:shadow-lg md: hover:z-[3]  md:hover:scale-105 md:hover:mt-[-30px] duration-100 ease-in-out rounded-md"
      data-liked={product.liked}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }} // Initial state: scaled down and invisible
        animate={inView ? { scale: 1, opacity: 1 } : {}} // Animate to full size and visible when in view
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.5,
        }} // Spring animation
        className="rounded-md  flex flex-col justify-center gap-2 items-center cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <Image
            className="rounded-md bg-[#ac4040] hover:scale-110 transition duration-500 ease-in-out"
            src={product.product_image}
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
      <i className="bi-heart heart" onClick={operateLike}></i>
    </Link>
  );
}
