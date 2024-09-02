import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center z-10 px-4">
        <h1 className="md:text-6xl text-4xl font-bold text-blue-600">
          Welcome to QuizMaster
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Test your knowledge with our exciting quiz challenges!
        </p>
        <Link
          href={"/quiz-selection"}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
