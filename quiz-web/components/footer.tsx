import React from "react";

export default function Footer() {
  return (
    <footer className="w-full text-center text-gray-400 py-4 bg-gray-200">
      <p className="text-gray-600">QuizMaster © {new Date().getFullYear()}</p>
    </footer>
  );
}
