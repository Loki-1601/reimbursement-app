import React, { useEffect, useState } from "react";
import axios from "axios";

function ListReceipts() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/receipts");
        setReceipts(response.data);
      } catch (err) {
        console.error("Error fetching receipts:", err);
        setError("Error fetching receipts.");
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  if (loading) {
    return <p className="text-center mt-8 text-gray-300">Loading receipts...</p>;
  }
  if (error) {
    return <p className="text-center mt-8 text-red-400">{error}</p>;
  }

  return (
    <div lassName="flex flex-col items-center py-10">
        <div className="bg-gray-800 text-white p-8 rounded-md shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Receipts</h1>
        </div>
      
        <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-md shadow-md">
            <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-100 text-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Receipt File</th>
                </tr>
                </thead>
                <tbody>
                {receipts.map((r) => (
                    <tr key={r.id} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-4 py-2">{r.id}</td>
                    <td className="px-4 py-2">
                        {new Date(r.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{r.amount}</td>
                    <td className="px-4 py-2">{r.description}</td>
                    <td className="px-4 py-2">
                        {r.receipt_file ? (
                        <a
                            href={`http://127.0.0.1:8000${r.receipt_file}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            View File
                        </a>
                        ) : (
                        <span className="text-sm text-gray-400">No file</span>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    </div>
  );
}

export default ListReceipts;
