import { useState } from "react";
import Questions from "./Questions";
import Start from "./Start";
import { decode } from "html-entities";
import { MagnifyingGlass } from "react-loader-spinner";
import { nanoid } from "nanoid";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleStartQuiz() {
    setIsLoading(true);
    fetchQuizData();
  }

  async function fetchQuizData() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
    );
    const data = await res.json();
    const decodedData = decodeQuizData(data.results);
    setQuizData(decodedData);
    setIsLoading(false);
  }

  function decodeQuizData(data) {
    return data.map((item) => {
      const incorrectAnswers = item.incorrect_answers.map((answer) =>
        decode(answer)
      );
      const allAnswers = insertRandomly(item.correct_answer, incorrectAnswers);
      return {
        id: nanoid(),
        question: decode(item.question),
        correctAnswer: decode(item.correct_answer),
        allAnswers: allAnswers,
      };
    });
  }

  function insertRandomly(item, array) {
    const newArray = [...array];
    const randomIndex = Math.floor(Math.random() * (newArray.length + 1));
    newArray.splice(randomIndex, 0, decode(item));
    return newArray;
  }

  function addSelectedAnswers(id, index) {
    setQuizData((prevQuizData) =>
      prevQuizData.map((quizData) => {
        if (id === quizData.id) {
          return {
            ...quizData,
            selectedAnswerIndex: index,
          };
        } else {
          return quizData;
        }
      })
    );
  }

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

  function onCheckAnswers() {
    setShowAnswer(true);
    const score = calculateScore();
    console.log(`Score: ${score}/${quizData.length}`);
  }
  return (
    <>
      {quizData.length == 0 && <Start onStartQuiz={handleStartQuiz} />}
      {isLoading && (
        <center>
          <MagnifyingGlass
            visible={true}
            height="200"
            width="150"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        </center>
      )}
      {quizData.length > 0 && (
        <Questions
          quizData={quizData}
          addSelectedAnswers={addSelectedAnswers}
        />
      )}
      <button className="header-btn" onClick={onCheckAnswers}>
        Check Answers
      </button>
    </>
  );
}

export default App;

/*
I want to click btn then this clicked btn will be selected
I should slected one btn from every question obj
-
compare if the slected btn is the correct answer then give it bg
if not give red bg and count how many correct answer we have
*/
