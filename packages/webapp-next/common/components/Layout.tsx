import Navbar from "../../components/Navbar";

interface LayoutProps {
  children: JSX.Element;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-full w-full">
        <div
          className="flex flex-col max-w-5xl items-center justify-center w-full"
          style={{
            width: "920px",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
