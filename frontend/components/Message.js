import React from 'react'
import { useSelector } from "react-redux";


export default function Message() {
  const store = useSelector(state => state);
  return <div id="message">{store.infoMessage}</div>
}
