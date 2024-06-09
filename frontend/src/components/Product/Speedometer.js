import React from 'react'
import "./Speedometer.css"
function Speedometer({data}) {
  return (
    <>
    <div className='bod'>
    <div className='speedometer'>
        <div className='needle' style={{"--score":(data.average_prediction * 100)}}>
          <span className="score">{(data.average_prediction*100).toFixed(2)}</span>
        </div>
    </div>
  
    <p>Overall:{data.overall_sentiment} </p>
    <p>Negetive:{data.negative_percentage.toFixed(2)}% </p>
    <p>Neutral:{data.neutral_percentage.toFixed(2)}% </p>
    <p>Positive:{data.positive_percentage.toFixed(2)}% </p>


    </div>
    </>
  )
}

export default Speedometer