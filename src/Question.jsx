import "./App.css";

function Question({
  question,
  allAnswers,
  onSelectAnswer,
  selectedAnswerIndex,
  
}) {
  const answerElements = allAnswers.map((answer, index) => (
    <button
      key={index}
      className={`btn btn-answer ${selectedAnswerIndex == index ? "selected" : ""}`}
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
