"use client"

import TroubleshootingSection from "@/components/Troubleshooting/TroubleshootingSection";
import React, { useEffect, useState } from "react";

const page = () => {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("troubleshooting-password");
    if (saved === "true") {
      setAuthorized(true);
    }
  }, []);

  const checkedPassword = () => {
    if (password === process.env.NEXT_PUBLIC_TROUBLESHOOTING_PASSWORD) {
      sessionStorage.setItem("troubleshooting-password", "true");
      setAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  return authorized ? (
    <div>
      <TroubleshootingSection />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Troubleshooting Section</h1>
      <p className="mb-4">
        Please enter the password to access the troubleshooting section.
      </p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4"
        placeholder="Enter password"
      />
      <button
        onClick={checkedPassword}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default page;
