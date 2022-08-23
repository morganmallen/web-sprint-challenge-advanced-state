import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const [trueAns, setTrueAns] = useState('');
  const [falseAns, setFalseAns] = useState('');
  const [question, setQuestion] = useState('');

  useEffect(() => {
    window.localStorage.getItem('trueAns') !== null && setTrueAns(window.localStorage.getItem('trueAns'));
    window.localStorage.getItem('falseAns') !== null && setFalseAns(window.localStorage.getItem('falseAns'));
    window.localStorage.getItem('question') !== null && setQuestion(window.localStorage.getItem('question'));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('trueAns', trueAns);
    window.localStorage.setItem('falseAns', falseAns);
    window.localStorage.setItem('question', question);
  }, [trueAns, falseAns, question]);

  const onChange = evt => {
    const {value, id} = evt.target;
    const trimmedValue = value.trim();
    if (id === 'newQuestion') {
      setQuestion(trimmedValue);
    } else if (id === 'newTrueAnswer') {
      setTrueAns(trimmedValue);
    } else if (id === 'newFalseAnswer') {
      setFalseAns(trimmedValue);
    }
  }

  const onSubmit = evt => {
    evt.preventDefault()
    const tempObj = {
      question_text: question,
      true_answer_text: trueAns,
      false_answer_text: falseAns
    }

    props.postQuiz(tempObj);
    props.postLatestAction('submitQuiz');

    resetForm();
  }

  const resetForm = () => {
    setQuestion('');
    setTrueAns('');
    setFalseAns('');
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={question}/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={trueAns}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={falseAns}/>
      <button disabled={!question || !trueAns || !falseAns} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
