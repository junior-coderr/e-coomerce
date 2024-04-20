import Header from "../components/header";
import HamPage from "../components/hamPage";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex h-[100svh] flex-col">
        <Header />
        <HamPage />
        {children}
      </div>
    </>
  );
}
