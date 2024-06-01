// import { Roboto } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";
import Providers from "../redux/provider.js";

// export const inter = Roboto({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

const Bricolage_Grotesque_font = Bricolage_Grotesque({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const metadata = {
  title: "Uniika",
  description: "E-commerce website for trendy products!",
  image: "/images/logo.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Bricolage_Grotesque_font.className}>
        <div className="max-w-[1500px] p-4 pb-[67px]  w-[100%] min-h-[360px] relative m-auto h-[100svh]  overflow-auto">
          <div className="flex flex-col justify-start h-[100%]">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
