"use client";
import { Provider } from "react-redux";
import store from "./store";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <>
      <NextTopLoader
        color="#0186D0"
        initialPosition={0.08}
        crawlSpeed={200}
        height={4}
        showSpinner={false}
        crawl={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
      <Toaster />
      <Provider store={store}>{children}</Provider>
    </>
  );
}
