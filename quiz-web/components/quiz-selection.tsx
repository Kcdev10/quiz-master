// pages/quiz.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

const QuizSelection: React.FC = () => {
  const [questions, setQuestions] = useState(10);
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");
  const [type, setType] = useState("multiple");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Quiz Settings</h1>
        <p className="text-lg text-gray-700 mb-6">
          Customize your quiz by selecting the options below.
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="questions"
          >
            Number of Questions
          </label>
          <input
            type="number"
            id="questions"
            value={questions}
            onChange={(e) => setQuestions(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full"
          >
            <option value="9">General Knowledge</option>
            <option value="23">History</option>
            <option value="22">Geography</option>
            <option value="21">Sports</option>
            <option value="27">Animals</option>
            <option value="25">Arts</option>
            <option value="30">Science: Gadget</option>
            <option value="18">Science: Computer</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="difficulty"
          >
            Difficulty Level
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="difficulty"
          >
            Type
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full"
          >
            <option value="multiple">Multiple</option>
            <option value="boolean">True/False</option>
          </select>
        </div>

        <Link
          onClick={() => {
            localStorage.setItem(
              "quiz-setting",
              JSON.stringify({
                amount: questions,
                category: category,
                difficulty: difficulty,
              })
            );
          }}
          href={`/start-quiz?amount=${questions}&category=${category}&type=${type}&difficulty=${difficulty}`}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default QuizSelection;
