"use client";
import Image from "next/image";
import { Prompt } from "next/font/google";
import { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addLiked, removeLiked } from "../../redux/slices/liked";
import { fetchProducts } from "../../redux/slices/fetchProduct.thunk";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const prompt = Prompt({
  weight: ["400"],
  subsets: ["latin"],
});

export default function AnimatedListComponent() {
  const [page, setPage] = useState(0);
  const loader = useRef(null);

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
    console.log("Page", page);
    dispatch(fetchProducts(page));
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];

    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      {/* //?Content */}
      <div
        className="w-[100%] overflow-y-auto h-[100%] overflow-scroll"
        // style={{ display: "none" }}
        id="content-scroll"
      >
        <br />
        {/* <br /> */}
        {/* //?content title */}
        <div className="flex justify-start gap-1 items-center">
          <span className={prompt.className}>
            <h1 className="text-[28px] font-semibold text-[#000000] p-2">
              Products
            </h1>
          </span>
          <span className="w-full h-[1px] bg-[#dfdfdf]"></span>
        </div>
        <br />

        <div>
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

  function operateLike(e) {
    let host = e.currentTarget.parentElement;
    let element = e.currentTarget;
    e.preventDefault();
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
        element.style.color = "#0086D0";

        host.dataset.liked = "false";
      } else {
        element.classList.remove("bi-heart");
        element.classList.add("bi-heart-fill");
        element.style.color = "#0086D0";

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
      // onMouseEnter={mouseHover}
      // onMouseLeave={mouseLeave}
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

        <div className="w-[100%] flex flex-col gap-1 justify-center items-center">
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
