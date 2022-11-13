import Navbar from "../../components/Navbar";

interface LayoutProps {
  children: JSX.Element;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
