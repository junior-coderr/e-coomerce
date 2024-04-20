import { Montserrat } from "next/font/google";
import { Roboto } from "next/font/google";
import Providers from "../redux/provider.js";

export const inter = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Zestora",
  description: "E-commerce website for trendy products!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mont.className}>
        <div className="max-w-[1200px] p-4 pb-[67px]  w-[100%] min-h-[360px] relative m-auto h-[100svh]  overflow-auto">
          <div className="flex flex-col justify-start h-[100%]">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
