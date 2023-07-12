import { useState } from "react";
import "./App.css";
import Question from "./Question";

function Questions({ quizData, addSelectedAnswers, handleStartQuiz }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCheckAnswers = () => {
    setShowAnswer(true);
  };

  function calculateScore() {
    let score = 0;
    quizData.forEach((question) => {
      if (
        question.allAnswers[parseInt(question.selectedAnswerIndex)] ==
        question.correctAnswer
      ) {
        score++;
      }
    });
    return score;
  }

  function restQuiz() {
    setShowAnswer(false);
    handleStartQuiz();
  }

  let questionElements = quizData.map((item) => (
    <Question
      {...item}
      onSelectAnswer={(e) => addSelectedAnswers(item.id, e.index)}
      key={item.id}
      showAnswer={showAnswer}
    />
  ));
  return (
    <>
      <main>
        {questionElements}
        {showAnswer && (
          <center>
            <h3>you got {calculateScore()} / 5 Answers </h3>
          </center>
        )}
      </main>
      <div className="btn-wrapper">
        {showAnswer ? (
          <button className="header-btn" onClick={restQuiz}>
            Reset
          </button>
        ) : (
          <button className="header-btn" onClick={handleCheckAnswers}>
            Check answers
          </button>
        )}
      </div>
    </>
  );
}

export default Questions;
