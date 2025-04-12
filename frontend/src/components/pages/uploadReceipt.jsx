import React, { useState } from "react";
import axios from "axios";

function UploadReceipt() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("❌ Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("date", date);
    formData.append("amount", amount);
    formData.append("description", description);
    formData.append("receipt_file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/receipts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        setMessage("✅ Upload successful!");
        setDate("");
        setAmount("");
        setDescription("");
        setFile(null);
        document.querySelector('input[type="file"]').value = null;
      } else {
        setMessage("❌ Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      <div className="bg-gray-800 text-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">📄 Receipt Upload</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-200 font-semibold">Purchase Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-200 font-semibold">Amount</label>
            <input
              type="number"
              step="0.01"
              placeholder="e.g. 129.99"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-200 font-semibold">Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-200 font-semibold">Receipt File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-sm text-gray-300"
              required
            />
            {file && (
              <p className="text-blue-400 mt-2 truncate">
                📎 {file.name}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold transition"
          >
            Submit
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              message.includes("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadReceipt;
