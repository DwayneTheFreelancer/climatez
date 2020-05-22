import React from 'react';
import WarmOutfit from './WarmOutfit';
import SummerOutfit from './SummerOutfit';
import WinterOutfit from './WinterOutfit';

const RainOutfit = (props) => {
    return (
        <h2>
          <span role="img" aria-label="umbrella">☂</span>
          {props.temp <= 50 ? <WinterOutfit /> : ''}
          {props.temp > 50 && props.temp <= 75 ? <WarmOutfit /> : ''}
          {props.temp > 80 ? <SummerOutfit /> : ''}
        </h2>
    )
}

export default RainOutfit;
