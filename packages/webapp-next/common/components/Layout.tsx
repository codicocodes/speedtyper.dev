import { Footer } from "./Footer";
import { navbarFactory } from "./NewNavbar";

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
      <div className="flex flex-col max-w-5xl w-full h-full justify-center relative">
        {children}
      </div>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  const Navbar = navbarFactory();
  return (
    <>
      <Container centered={false}>
        <Navbar />
      </Container>
      <Container centered={true}>{children}</Container>
      <Container centered={false}>
        <>
          <div className="flex flex-grow items-center mb-2 text-xs">
            <h1 className="bg-dark-lake py-1 px-2 rounded font-bold text-faded-gray">
              Tab
            </h1>
            <span className="mx-1 text-faded-gray">Next Challenge</span>
            <h1 className="bg-dark-lake py-1 px-2 rounded font-bold ml-2 text-faded-gray">
              Enter
            </h1>

            <span className="mx-1 text-faded-gray">Start Challenge</span>
          </div>
          <Footer />
        </>
      </Container>
    </>
  );
}
