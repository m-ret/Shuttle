import React from 'react';
import { Svg } from 'expo';

const PassengerAddedSvg = () => (
  <Svg width={214} height={125}>
    <Svg.Defs>
      <Svg.Path
        id="prefix__a"
        d="M102.03 42.458l-9.72-9.64-3.31 3.26L102.03 49 130 21.26 126.713 18z"
      />
    </Svg.Defs>
    <Svg.G transform="translate(-2 2)" fill="none" fillRule="evenodd">
      <Svg.Text
        opacity={0.87}
        fontFamily="Montserrat-Regular, Montserrat"
        fontSize={24}
        fill="#FF5252"
      >
        <Svg.TSpan x={20} y={118}>
          {'Passenger Added'}
        </Svg.TSpan>
      </Svg.Text>
      <Svg.Use fill="#FF5252" xlinkHref="#prefix__a" href="#prefix__a" />
      <Svg.Use stroke="#FFF" xlinkHref="#prefix__a" href="#prefix__a" />
      <Svg.Use stroke="#FFF" strokeWidth={2} xlinkHref="#prefix__a" href="#prefix__a" />
      <Svg.Ellipse
        stroke="#FF5252"
        strokeWidth={3}
        cx={109.5}
        cy={33}
        rx={32.5}
        ry={33}
      />
    </Svg.G>
  </Svg>
);

export default PassengerAddedSvg;