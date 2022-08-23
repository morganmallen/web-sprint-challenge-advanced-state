import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Quiz(props) {
  const [submitCount, setSubmitCount] = useState(0);
  const [selectedButton, setSelectedButton] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [currentQuiz, setCurrentQuiz] = useState();
  const [submittedAnswer, setSubmittedAnswer] = useState(false);

  const store = useSelector(state => state);


  useEffect(() => {
    if (submittedAnswer || !store.quiz) {
      props.fetchQuiz();
      setSubmittedAnswer(false);
    }
    props.setMessage();
    setCurrentQuiz(window.localStorage.setItem('currentQuiz', JSON.stringify(store.quiz)));
    setSelectedButton(window.localStorage.setItem('selectedButton', selectedButton));
  }, [submitCount]);

  useEffect(() => {
    const tempQuiz = window.localStorage.getItem('currentQuiz');
    setCurrentQuiz(JSON.parse(tempQuiz));
    // window.localStorage.getItem('selectedButton');
  }, []);

  const submitAnswer = () => {
    setSubmitCount(submitCount + 1);
    setSelectedButton(0);
    setSubmittedAnswer(true);
    const answer = {
      quiz_id: props.quiz.quiz_id,
      answer_id: answerId,
    };
    props.postAnswer(answer);
    props.postLatestAction('submitAnswer');
  };

  const selectAnswer = (evt) => {
    const { id, value } = evt.target;
      setSelectedButton(value);
      setAnswerId(id);
  };

  console.log('selectedButton:' , selectedButton)
  console.log('currentQuiz: ', currentQuiz);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        currentQuiz ? (
          <>
            <h2>{currentQuiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={selectedButton === currentQuiz.answers?.[0].text ? "answer selected" : "answer"}
              >
                {currentQuiz.answers?.[0].text}
                <button
                  id={currentQuiz.answers?.[0].answer_id}
                  value={currentQuiz.answers?.[0].text}
                  onClick={selectAnswer}
                >
                  {selectedButton === currentQuiz.answers?.[0].text ? "SELECTED" : "Select"}
                </button>
              </div>

              <div
                className={selectedButton === currentQuiz.answers?.[1].text ? "answer selected" : "answer"}
              >
                {currentQuiz.answers?.[1].text}
                <button
                  id={currentQuiz.answers?.[1].answer_id}
                  value={currentQuiz.answers?.[1].text}
                  onClick={selectAnswer}
                >
                  {selectedButton === currentQuiz.answers?.[1].text ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button
              disabled={!selectedButton}
              id="submitAnswerBtn"
              onClick={submitAnswer}
            >
              Submit answer
            </button>
          </>
        ) : props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={selectedButton === props.quiz.answers?.[0].text ? "answer selected" : "answer"}
              >
                {props.quiz.answers?.[0].text}
                <button
                  id={props.quiz.answers?.[0].answer_id}
                  value={props.quiz.answers?.[0].text}
                  onClick={selectAnswer}
                >
                  {selectedButton === props.quiz.answers?.[0].text ? "SELECTED" : "Select"}
                </button>
              </div>

              <div
                className={selectedButton === props.quiz.answers?.[1].text ? "answer selected" : "answer"}
              >
                {props.quiz.answers?.[1].text}
                <button
                  id={props.quiz.answers?.[1].answer_id}
                  value={props.quiz.answers?.[1].text}
                  onClick={selectAnswer}
                >
                  {selectedButton === props.quiz.answers?.[1].text ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button
              disabled={!selectedButton}
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
