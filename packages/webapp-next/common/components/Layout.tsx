import Navbar from "../../components/Navbar";

interface LayoutProps {
  children: JSX.Element;
}

interface ContainerProps {
  children: JSX.Element;
  centered: boolean;
}

export function Container({ children, centered }: ContainerProps) {
  return (
    <div
      className={`flex justify-center h-full w-full 
     ${centered ? "items-center justify-content" : ""} `}
    >
      <div
        className="flex flex-col max-w-5xl w-full"
        style={{
          width: "920px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Container centered={true}>{children}</Container>
    </>
  );
}
