import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
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
      const response = await axios.post("http://127.0.0.1:8000/api/submit/", formData, {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          📄 Receipt Upload
        </h1>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded bg-gray-100"
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Amount (e.g. 129.99)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded bg-gray-100"
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded bg-gray-100"
          required
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
          required
        />

        
        {file && (
          <p className="text-sm text-blue-600 font-medium truncate">
            📎 {file.name}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>

        
        {message && (
          <p
            className={`text-center text-base font-semibold ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default App;
