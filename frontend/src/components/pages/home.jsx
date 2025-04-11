import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-4xl font-bold mb-6">Welcome to the Employee Reimbursement App</h2>
      <p className="text-md text-gray-400 max-w-xl text-center mb-10">
        This application helps employees submit their purchase receipts 
        and view all submitted reimbursements quickly and easily.
      </p>
      <div className="space-x-6">
        <Link to="/upload">
          <button className="px-6 py-3 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-500 transition">
            Upload Receipt
          </button>
        </Link>
        <Link to="/list">
          <button className="px-6 py-3 bg-green-600 rounded-md text-white font-semibold hover:bg-green-500 transition">
            View Receipts
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
