import { FetchData } from "@/_lib/fetchData";
import { shuffleArray } from "@/_lib/shuffleArray";
import QuizQuestion from "@/components/quiz-question";
import React from "react";

export default async function page({ searchParams }: any) {
  const quizData = await FetchData(
    `${process.env.NEXT_PUBLIC_API_DOMAIN_URL}api/v1/quiz/question?amount=${searchParams.amount}&category=${searchParams.category}&difficulty=${searchParams.difficulty}&type=${searchParams.type}`
  );

  const quizDataWithOptions = quizData?.data?.results.map(
    (item: Record<string, any>) => {
      return {
        ...item,
        options: shuffleArray([...item.incorrect_answers, item.correct_answer]),
      };
    }
  );

  return (
    <div>
      <QuizQuestion results={quizDataWithOptions} />
    </div>
  );
}
