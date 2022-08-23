// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  SET_QUIZ_INTO_STATE,
  INPUT_CHANGE,
  RESET_FORM,
  SET_LATEST_ACTION
} from "./action-types";

 export const moveClockwise = () => {
  return { type: MOVE_CLOCKWISE };
 };

 export const moveCounterClockwise = () => { 
  return { type: MOVE_COUNTERCLOCKWISE };
};

export const selectAnswer = (payload) => {
  return { type: SET_SELECTED_ANSWER, payload: payload };
 }

export const setMessage = (payload) => {
  return { type: SET_INFO_MESSAGE, payload: payload };
 }

export const setQuiz = () => {
  return { type: SET_QUIZ_INTO_STATE };
 }

export const inputChange = () => {
  return { type: INPUT_CHANGE };
 }

export const resetForm = () => {
  return { type: RESET_FORM };
 }

 export const setLatestAction = (payload) => {
   return { type: SET_LATEST_ACTION, payload: payload}
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    // resetForm();
    dispatch({ type: SET_QUIZ_INTO_STATE, payload: false });
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
}
export const postAnswer = (answer) => (dispatch) => {
  // On successful POST:
  // - Dispatch an action to reset the selected answer state
  // - Dispatch an action to set the server message to state
  // - Dispatch the fetching of the next quiz
  console.log('answer: ', answer);

  axios
    .post("http://localhost:9000/api/quiz/answer", answer)
    .then((res) => {
      console.log('res: ', res);
      dispatch(selectAnswer(res.data));
    })
    .catch((err) => console.log(err));
    dispatch(resetForm());
};

export const postQuiz = (quiz) => (dispatch) => {
  // On successful POST:
  // - Dispatch the correct message to the the appropriate state
  // - Dispatch the resetting of the form
  console.log('quiz: ', quiz);
  axios
    .post("http://localhost:9000/api/quiz/new", quiz)
    .then((res) => {
      console.log('res: ', res);
      dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data })
      dispatch(setMessage(res.data));
      dispatch(resetForm());

})
    .catch((err) => console.log(err));
};

export const postLatestAction = (action) => (dispatch) => {
  dispatch(setLatestAction(action));
} 