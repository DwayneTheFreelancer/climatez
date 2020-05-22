import React from 'react';

const ExtraDetails = (props) => {
    return (
      <div className="extra-details">
        <div className="col-md-6 details">
          <div className="inner-details">Feels Like: {props.feels_like}°</div>
          <div className="inner-details">Humidity: {props.humidity}%</div>
        </div>
        <div className="col-md-6 details">
          <div className="inner-details">Low: {props.low}°</div>
          <div className="inner-details">High: {props.high}°</div>
        </div>
      </div>
    );
}

export default ExtraDetails;
