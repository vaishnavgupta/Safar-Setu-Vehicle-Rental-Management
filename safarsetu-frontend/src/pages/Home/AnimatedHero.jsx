import React from 'react';
import Lottie from "lottie-react";

const AnimatedHero = ({animation}) => {
  return (
    <div >
      <Lottie
          animationData={animation}
          loop={true}
      />
    </div>
  );
};

export default AnimatedHero;
