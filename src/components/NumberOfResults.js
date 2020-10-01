import React from 'react'

const numberOfResultsStyle = {
    "margin-top": '1rem'
  };

const NumberOfResults = ({ totalIncidents }) => {
    switch(totalIncidents){
        case 0:
            return <div style={numberOfResultsStyle}><h2>Your search did not match any incident</h2></div>
        case 1000:
            return <div style={numberOfResultsStyle}><h2>More than 1000 results found.</h2></div>
        default:
            return <div style={numberOfResultsStyle}><h2>{totalIncidents} results found.</h2></div>
    }
}

export default NumberOfResults


