function Start({ onStartQuiz }) {
  return (
    <header>
      <h1>Quizzical</h1>
      <p className="sub-title">Some description if needed</p>
      <button className="header-btn" onClick={onStartQuiz}>
        Start Quiz
      </button>
    </header>
  );
}

export default Start;
