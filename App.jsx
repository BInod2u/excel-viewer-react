import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import Home from "./pages/Home";
import About from "./pages/About";
import DataPage from "./pages/DataPage";

const msalInstance = new PublicClientApplication(msalConfig);

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <div style={{ padding: 20, fontFamily: "Segoe UI" }}>
          <nav style={{ marginBottom: 20 }}>
            <Link to="/" style={{ marginRight: 12 }}>Home</Link>
            <Link to="/data" style={{ marginRight: 12 }}>Data Viewer</Link>
            <Link to="/about">About</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </MsalProvider>
  );
}
