import React from 'react';

/*
* M: Move to
* M0,0 => move to x=0,y=0
*
* L: Line to
* L25,50 => (from M0,0) draw line to x=25,y=50
*
* C: Curve
* C35,90 65,90 95,70 => from current position (M0,0),
*   draw line to x=95,y=70,
*   put anchor point (a) to 35,90,
*   put anchor point (b) to 65,90
*
* */
const Smile = () => {
  return (
    <svg width={'100'} height={'100'}>
      <path d={`M25,25 L25,50`} stroke={'black'} strokeWidth={'2px'}/>
      <path d={`M75,25 L75,50`} stroke={'black'} strokeWidth={'2px'}/>

      <path d={`M10,70 C35,90 65,90 95,70`} fill={'none'} stroke={'black'} strokeWidth={'2px'}/>
    </svg>
  );
};

export default Smile;