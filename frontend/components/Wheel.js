import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Wheel(props) {

  const [wheelPosition, setWheelPosition] = useState(props.wheel);

  useEffect(() => {
    setWheelPosition(props.wheel);
  }, [props.wheel])

  const moveClockwise = () => {
    props.moveClockwise();
  }

  const moveCounterClockwise = () => {
    props.moveCounterClockwise();
  }
  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={wheelPosition === 0 ? "cog active" : "cog"} style={{ "--i": 0 }}>{wheelPosition === 0 ? 'B' : ''}</div>
        <div className={wheelPosition === 1 ? "cog active" : "cog"} style={{ "--i": 1 }}>{wheelPosition === 1 ? 'B' : ''}</div>
        <div className={wheelPosition === 2 ? "cog active" : "cog"} style={{ "--i": 2 }}>{wheelPosition === 2 ? 'B' : ''}</div>
        <div className={wheelPosition === 3 ? "cog active" : "cog"} style={{ "--i": 3 }}>{wheelPosition === 3 ? 'B' : ''}</div>
        <div className={wheelPosition === 4 ? "cog active" : "cog"} style={{ "--i": 4 }}>{wheelPosition === 4 ? 'B' : ''}</div>
        <div className={wheelPosition === 5 ? "cog active" : "cog"} style={{ "--i": 5 }}>{wheelPosition === 5 ? 'B' : ''}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st => st, actionCreators)(Wheel)
