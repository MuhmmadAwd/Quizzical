import "./App.css";

function Question({
  question,
  allAnswers,
  onSelectAnswer,
  selectedAnswerIndex,
  showAnswer,
  correctAnswer,
}) {
  function getCorrectIndex() {
    return allAnswers.findIndex((answer) => answer === correctAnswer);
  }

  const answerElements = allAnswers.map((answer, index) => (
    <button
    disabled={showAnswer && parseInt(selectedAnswerIndex) != index}
      key={index}
      className={`btn-answer ${
        parseInt(selectedAnswerIndex) == index ? "selected" : ""
      } ${showAnswer && index == getCorrectIndex() ? "correct" : ""} ${
        showAnswer && index == selectedAnswerIndex && index != getCorrectIndex()
          ? "incorrect"
          : ""
      }`}
      data-index={index}
      onClick={(e) => onSelectAnswer(e.target.dataset)}
    >
      {answer}
    </button>
  ));
  return (
    <>
      <article className="question-wrapper">
        <h3 className="question">{question}</h3>
        <div className="btn-container">{answerElements}</div>
        <hr />
      </article>
    </>
  );
}

export default Question;
