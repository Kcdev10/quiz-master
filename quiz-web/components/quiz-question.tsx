"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export default function QuizQuestion({
  results,
}: {
  results: Record<string, any>[];
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [renderTrigger, setRenderTrigger] = useState<boolean>(false); // This state will be used to force re-render
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);

  const timeLeft = useRef<number>(30);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const handleAnswerClick = (answer: string) => {
    if (answer === results[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(answer);
    setAnsweredQuestions([...answeredQuestions, answer]);
  };

  const handleNextQuestion = useCallback(() => {
    setSelectedAnswer(null);

    if (currentQuestionIndex < results.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      timeLeft.current = 20; // Reset the timer for the next question
    } else {
      setQuizFinished(true);
    }
  }, [currentQuestionIndex]);

  const currentQuestion = results[currentQuestionIndex];

  useEffect(() => {
    if (!quizFinished) {
      intervalId.current = setInterval(() => {
        timeLeft.current -= 1;
        setRenderTrigger((prev) => !prev); // Trigger re-render to update the UI
        if (timeLeft.current <= 0) {
          handleNextQuestion(); // Automatically go to the next question if the timer runs out
        }
      }, 1000);
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [quizFinished]);

  return (
    <div className="flex justify-center min-h-screen">
      {/* <h1 className="text-5xl text-center font-semibold">Quiz Start</h1> */}

      <div className="w-full">
        {quizFinished ? (
          <div className="max-w-7xl mx-auto bg-blue-50 p-4 rounded-sm mt-28">
            <h2 className="text-center md:text-4xl font-semibold">
              Quiz Finished!
            </h2>
            <p>
              Your Score: {score} / {results.length}
            </p>
            <ul className="mt-4 flex flex-col gap-5">
              {results.map((question, index) => (
                <li key={index} className="flex flex-col gap-2">
                  <div>
                    <strong>Q:{index + 1}</strong> {question.question} <br />
                  </div>
                  <div>
                    <strong className="px-1">Your Answer :</strong>
                    <span
                      className="text-white px-2 rounded-sm py-1"
                      style={{
                        background:
                          answeredQuestions[index] == question.correct_answer
                            ? "green"
                            : "#e93333",
                      }}
                    >
                      {" "}
                      {answeredQuestions[index]}
                    </span>
                  </div>

                  <div>
                    <strong>Correct Answer:</strong> {question.correct_answer}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="max-w-4xl w-full mx-auto mt-28 relative px-6">
            {/* quiz question  */}
            <h2 className="font-semibold">
              Q.{currentQuestionIndex + 1} {currentQuestion?.question}
            </h2>

            {/* listing quiz questions options */}
            <ul className="space-y-2 mt-4">
              {currentQuestion?.options?.map(
                (option: string, index: number) => (
                  <li
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className="flex items-center gap-1"
                  >
                    <span className="text-xs">{index + 1}. </span>

                    <button
                      className="px-2 py-1 rounded-sm"
                      style={{
                        backgroundColor:
                          selectedAnswer === option ? "lightblue" : "white",
                      }}
                    >
                      {option}
                    </button>
                  </li>
                )
              )}
            </ul>

            {/* next question button  */}
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-sm mt-5"
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              {currentQuestionIndex === results.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>

            {/* timer section here  */}
            <div className="absolute top-0 right-4 text-white flex flex-col items-center gap-1">
              <span className="text-gray-700"> Timer</span>
              <p className=" w-9 h-9 bg-blue-600 rounded-full flex justify-center items-center font-bold text-sm">
                {timeLeft.current}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
