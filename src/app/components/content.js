"use client";
import Image from "next/image";
import { Prompt } from "next/font/google";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const prompt = Prompt({
  weight: ["400"],
  subsets: ["latin"],
});



 export default function Content() {
  const [products, setProducts] = useState(['https://woodmart.b-cdn.net/wp-content/uploads/2017/03/light8_4-opt-860x983.jpg.webp','https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp','https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-clock-1-3.jpg','https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-clock-1-3.jpg'])
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {

    const options = {
      root:document.body,
      rootMargin: "0px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

  }, []);

  useEffect(() => {
    // Here you would fetch the next page of products from your database
    // For simplicity, let's just duplicate our initial products
    const newProducts = [...products, ...products];
    setProducts(newProducts);
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    console.log('intersected!');
    if (target.isIntersecting) {   
      console.log('is in observation');
      setPage((prev) => prev + 1);
    }
  }


  return (
    <>
      {/* //?Content */}
      <div
        className="w-[100%] overflow-y-auto h-[100%] overflow-scroll"
        id="content-scroll"
      >
        <br />
        <br />
        {/* //?content title */}
        <div className="flex justify-start gap-1 items-center">
          <span className={prompt.className}>
            <h1 className="text-[25px] font-semibold text-[#000000] p-2">
              PRODUCTS
            </h1>
          </span>
          <span className="w-full h-[1px] bg-[#dfdfdf]"></span>
        </div>
        <br />

        {/* //?Products */}
         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-2 md:gap-3 lg:gap-5 "> 


          {products.map((product, index) => (
            <Link  scroll={false} href={`/products/${index}`} key={index}>
             <div className="p-1 rounded-md  flex flex-col justify-center gap-2 items-center cursor-pointer">
             <Image
              className="bg-[#https://woodmart.b-cdn.net/wp-content/uploads/2016/08/product-accessories-8-1.jpg.webp] rounded-md"
              src={product}
              width={500}
              height={500}
              alt="Picture of the watch"
            />
             <div className="w-[100%] flex flex-col gap-1 justify-center items-center">
              <h1 className="text-lg font-semibold text-[#313131] text-center">
                Product name
              </h1>
              <p className="text-sm text-[#7b7b7b] text-center">
                Description of the product
              </p>
              <span className="text-[#0086D0] text-sm font-medium">
                $299.00
              </span>
            </div>
            
              </div>
              
              </Link>
          ))}
         


    
        </div>

        <div className="loader relative py-5 flex justify-center items-center" ref={loader}>
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

