import Header  from "../components/hamPage.js";
import HamPage from "../components/header.js";
import Content from "../components/content.js";
import Link from 'next/link'


export default function RootLayout({ children }) {
    return (
        <>
        <HamPage />
                <Header  />
                <Content />
                 {children}
            </>

    )
}