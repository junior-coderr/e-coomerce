"use client";
import { Provider } from "react-redux";
import store from "./store";
import { useEffect } from "react";

export default function Providers({ children }) {
  useEffect(() => {
    console.log("Provider loaded");
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
