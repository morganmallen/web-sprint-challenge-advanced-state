import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Quiz(props) {
  const { quiz, selectedAnswer } = props;

  useEffect(() => {
    if (!quiz) {
      props.fetchQuiz();
    }
  }, []);

  const submitAnswer = () => {
    const answer = {
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer,
    };
    props.postAnswer(answer);
  };

  const selectAnswer = (id) => {
      props.selectAnswer(id);
  };

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={selectedAnswer === quiz.answers?.[0].answer_id  ? "answer selected" : "answer"}
              >
                {quiz.answers?.[0].text}
                <button
                  id={quiz.answers?.[0].answer_id}
                  value={quiz.answers?.[0].text}
                  onClick={() => selectAnswer(quiz.answers[0].answer_id)}
                >
                  {selectedAnswer === quiz.answers?.[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div
                className={selectedAnswer === quiz.answers?.[1].answer_id  ? "answer selected" : "answer"}
              >
                {quiz.answers?.[1].text}
                <button
                  id={quiz.answers?.[1].answer_id}
                  value={quiz.answers?.[1].text}
                  onClick={() => selectAnswer(quiz.answers[1].answer_id)}
                >
                  {selectedAnswer === quiz.answers?.[1].answer_id  ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button
              disabled={!selectedAnswer}
              id="submitAnswerBtn"
              onClick={submitAnswer}
            >
              Submit answer
            </button>
          </>
        ) : quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={selectedAnswer === quiz.answers?.[0].text ? "answer selected" : "answer"}
              >
                {quiz.answers?.[0].text}
                <button
                  id={quiz.answers?.[0].answer_id}
                  value={quiz.answers?.[0].text}
                  onClick={() => selectAnswer(quiz.answers[0].answer_id)}
                >
                  {selectedAnswer === quiz.answers?.[0].text ? "SELECTED" : "Select"}
                </button>
              </div>

              <div
                className={selectedAnswer === quiz.answers?.[1].text ? "answer selected" : "answer"}
              >
                {quiz.answers?.[1].text}
                <button
                  id={quiz.answers?.[1].answer_id}
                  value={quiz.answers?.[1].text}
                  onClick={() => selectAnswer(quiz.answers[0].answer_id)}
                >
                  {selectedAnswer === quiz.answers?.[1].text ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button
              disabled={!selectedAnswer}
              id="submitAnswerBtn"
              onClick={submitAnswer}
            >
              Submit answer
            </button>
          </>
        )
        : 
        (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

export default connect((st) => st, actionCreators)(Quiz);
