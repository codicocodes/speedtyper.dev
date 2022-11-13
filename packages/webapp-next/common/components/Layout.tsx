import Navbar from "../../components/Navbar";
import { Footer } from "./Footer";

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
      <div className="flex flex-col max-w-5xl w-full">{children}</div>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Container centered={false}>
        <Navbar />
      </Container>
      <Container centered={true}>{children}</Container>
      <Container centered={false}>
        <Footer />
      </Container>
    </>
  );
}
