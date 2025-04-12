import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import UploadReceipt from "./components/pages/UploadReceipt";
import ListReceipts from "./components/pages/ListReceipts";
import "./App.css";


function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {!isHomePage && (
        <nav className="bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center">
            <Link 
              className="hover:text-blue-400 font-semibold text-lg mx-8" 
              to="/"
            >
              Home
            </Link>
            <Link 
              className="hover:text-blue-400 font-semibold text-lg mx-8" 
              to="/upload"
            >
              Upload Receipt
            </Link>
            <Link 
              className="hover:text-blue-400 font-semibold text-lg mx-8" 
              to="/list"
            >
              View Receipts
            </Link>
          </div>
        </nav>
      )}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadReceipt />} />
          <Route path="/list" element={<ListReceipts />} />
        </Routes>
      </main>
      
      <footer className="bg-gray-800 text-gray-400 py-3 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Employee Reimbursement App
        </p>
      </footer>
    </div>
  );
}

export default App;