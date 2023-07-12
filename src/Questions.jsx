import { useState } from "react";
import "./App.css";
import Question from "./Question";

function Questions({ quizData, addSelectedAnswers }) {
  const [showAnswer, setShowAnswer] = useState(false);

  let questionElements = quizData.map((item) => (
    <Question
      {...item}
      onSelectAnswer={(e) => addSelectedAnswers(item.id, e.index)}
      key={item.id}
    />
  ));
  return (
    <>
      <main>{questionElements}</main>
    </>
  );
}

export default Questions;
