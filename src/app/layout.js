import { Montserrat } from 'next/font/google'

import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header  from "./components/header.js";
import HamPage from "./components/hamPage.js";
import Content from "./components/content.js";
import Link from 'next/link'

const mont = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Zestora",
  description: "E-commerce website for trendy products!"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mont.className}>
          <div className="max-w-[1200px] p-5 w-[100%] relative m-auto h-[100svh]  overflow-auto">
        <div className='flex flex-col justify-start h-[100%]'>
          {children}
          </div>
          </div>
        </body>
    </html>
  );
}
