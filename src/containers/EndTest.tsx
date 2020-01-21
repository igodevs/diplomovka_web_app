import React, { useState } from 'react';
//import Confetti, { ConfettiConfig } from 'react-dom-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

function EndTest() {
  const [actives, setActive] = useState(false);

  const { width, height } = useWindowSize();

  return (
    <div className="section-end-test">
      <p className="section-end-test-h1">Koniec Testu</p>
      <Confetti width={width} height={height} />
    </div>
  );
}

export default EndTest;
