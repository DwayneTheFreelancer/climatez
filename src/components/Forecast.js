import React from 'react';

const Forecast = (props) => {
    return (
        <div className="scrollmenu">
            <div className="forcast-data">
                {props.list.map((data, index) => {
                    return (
                      <div className="time-icon-weather" key={index}>
                        <h6>{new Date(data.dt * 1000).toLocaleTimeString()}</h6>
                        <h5>{data.weather[0].main === "Clouds" ? <i className="fas 2x fa-cloud"></i> : '' }</h5>
                        <h5>{data.weather[0].main === "Clear" ? <i className="fas 2x fa-cloud-sun"></i> : '' }</h5>
                        <h5>{data.weather[0].main === "Rain" ? <i className="fas 2x fa-cloud-rain"></i> : '' }</h5>
                        <h5>{data.weather[0].main === "Snow" ? <i className="far 2x fa-snowflake"></i> : '' }</h5>
                        <span>{Math.round(data.main.temp)}°</span>
                      </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Forecast;
