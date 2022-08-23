import React from 'react'
import { useSelector } from "react-redux";


export default function Message() {
  const store = useSelector(state => state);
  console.log('store:', store);
  return <div id="message">{store.latestAction === 'submitQuiz' ? store.infoMessage : store.selectedAnswer}</div>
}
