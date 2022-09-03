import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";
import "./tailwind.min.css";
import "./spinner.css";
import Navbar from "components/Navbar";
import { AppProvider } from "./AppContext";
import Profile from "./pages/profile";
function App() {
  return (
    <Root>
      <div className="content h-screen">
        <React.Suspense fallback={<em>Loading...</em>}>
          <AppProvider>
            <Navbar />
            <Router>
              <Profile path="/profile/:userName" />
              <Routes default />
            </Router>
          </AppProvider>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default App;
