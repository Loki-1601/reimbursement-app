import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/home.jsx';
import UploadReceipt from './components/pages/uploadReceipt.jsx';
import ListReceipts from './components/pages/listReceipts.jsx';
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Employee Reimbursement App</h1>
          <div className="space-x-6">
            <Link className="hover:text-blue-400" to="/">Home</Link><br/>
            <Link className="hover:text-blue-400" to="/upload">Upload Receipt</Link><br/>
            <Link className="hover:text-blue-400" to="/list">View Receipts</Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadReceipt />} />
          <Route path="/list" element={<ListReceipts />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white-800 text-gray-400 py-3 text-center">
      {/* <footer style={backgroundColor="white"} > */}
        <p className="text-sm">© {new Date().getFullYear()} Employee Reimbursement App</p>
      </footer>
    </div>
  );
}

export default App;