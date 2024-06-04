import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LinkShortener() {
  const [link, setLink] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const isValidUrl = (string) => {
    try {
      new URL(string);
    } catch (_) {
      return false;
    }
    return true;
  };

  const shortenLink = async () => {
    if (!isValidUrl(link)) {
      alert("Please enter a valid link");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/shorten", {
        link,
      });
      setShortUrl(response.data.shortUrl);
      toast.success("Link shortened successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex items-center justify-center h-auto bg-gradient-to-r from-green-200 to-pink-200 flex-col">
      <div className="bg-slate-500 p-8 rounded-xl shadow-lg mt-28 flex">
        <input
          type="text"
          placeholder="Enter the link to be shortened"
          className="w-80 p-4 rounded-l-xl text-gray-700 border border-r-0 border-gray-300"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-8 py-4 rounded-r-xl font-bold"
          onClick={shortenLink}
        >
          Shorten
        </button>
      </div>
        {shortUrl && (
          <div className="mt-4">
            <span className="mr-2">{shortUrl}</span>
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white px-4 py-2 rounded font-bold"
            >
              Copy
            </button>
          </div>
        )}{" "}
        <ToastContainer />
    </div>
  );
}

export default LinkShortener;
