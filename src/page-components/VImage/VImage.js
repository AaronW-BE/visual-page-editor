import React from "react";
import './v-image.css'

import defaultPic from './default.png';

function VImage (props) {
  const {
    src = defaultPic,
    height = '200px'
  } = props;

  return (
    <div className="v-image" style={{height: height}}>
      <img src={src} alt=""/>
    </div>
  )
}

export default VImage;
