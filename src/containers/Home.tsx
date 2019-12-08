import React, { useState, useEffect } from 'react';
import { animated, useTransition } from 'react-spring';
import { connect } from 'react-redux';
import history from '../history';
import { IStateRedux } from '../reducers';
import { setOperation } from '../actions';
interface IState {
  loading: boolean;
}

interface IProps {
  setOperation: typeof setOperation;
}

const logos = [
  {
    id: 1,
    item: (
      <>
        <rect
          width="33.29"
          height="6.32"
          y="13.48"
          className="cls-1"
          rx="3.16"
        />
      </>
    ),
    fill: '#ffcf43'
  },
  {
    id: 4,
    item: (
      <>
        <rect
          width="33.29"
          height="6.32"
          x="39.65"
          y="13.48"
          className="cls-4"
          rx="3.16"
        />
        <rect
          width="33.29"
          height="6.32"
          x="39.65"
          y="13.48"
          className="cls-4"
          rx="3.16"
          transform="rotate(-90 56.295 16.645)"
        />
      </>
    ),
    fill: '#5ce0d8'
  },
  {
    id: 3,
    item: (
      <>
        <rect
          width="33.29"
          height="6.32"
          x="39.65"
          y="45.81"
          className="cls-3"
          rx="3.16"
        />
        <rect
          width="5.81"
          height="5.81"
          x="53.39"
          y="36.65"
          className="cls-3"
          rx="2.9"
        />
        <rect
          width="5.81"
          height="5.81"
          x="53.39"
          y="55.48"
          className="cls-3"
          rx="2.9"
        />
      </>
    ),
    fill: '#0d9edf'
  },
  {
    id: 2,
    item: (
      <>
        <rect
          width="33.29"
          height="6.32"
          y="45.81"
          className="cls-2"
          rx="3.16"
          transform="rotate(45 16.648 48.966)"
        />
        <rect
          width="33.29"
          height="6.32"
          y="45.81"
          className="cls-2"
          rx="3.16"
          transform="rotate(-45 16.643 48.966)"
        />
      </>
    ),
    fill: '#fe4a49'
  }
];

const Home: React.FC<IProps> = ({ setOperation }) => {
  // const [clicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, set] = useState(0);

  //componentDidMount
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  // const { backgroundColor, transform } = useSpring({
  //   backgroundColor: clicked ? 'red' : '#5CE0D8',
  //   transform: `scale(${clicked ? 5 : 1})`,
  //   config: { duration: 100 }
  // });

  const transition = useTransition(logos[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  useEffect(
    () => void setInterval(() => set(state => (state + 1) % 4), 500),
    []
  );
  return loading ? (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 72.94 61.66"
        className="logo"
        width="300"
        height="300"
      >
        <g data-name="Layer 2" width="300" height="300">
          <g data-name="Layer 1" width="300" height="300">
            {transition.map(({ item, props, key }) => {
              console.log(item, props, key);
              return (
                <animated.g
                  key={key}
                  style={{ ...props, width: 300, height: 300 }}
                >
                  {item.item}
                </animated.g>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  ) : (
    <div className="math-page">
      <div
        onClick={() => {
          history.push('/math/main-math');
          setOperation('examples', '#00A572');
        }}
        className="math-page__box"
        style={{
          backgroundColor: '#00A572',
          width: '100%',
          marginBottom: '4vh'
        }}
      >
        Matematika
      </div>
      <div
        onClick={() => {
          history.push('/math/addition');
          setOperation('addition', '#FFCF43');
        }}
        className="math-page__box"
        style={{
          backgroundColor: '#FFCF43',
          marginRight: '4vw',
          marginBottom: '4vh'
        }}
      >
        Sčítanie
      </div>
      {/* <animated.div
        // onClick={() => {
        //   setClicked(!clicked);
        // }}
        // style={props}
        className="math-page__box"
        style={{
          backgroundColor,
          // transform: transform.interpolate(t => t),

          marginBottom: '4vh'
        }}
      >
        Odčítanie
        
      </animated.div> */}

      <div
        onClick={() => {
          history.push('/math/substraction');
          setOperation('substraction', '#5CE0D8');
        }}
        className="math-page__box"
        style={{
          backgroundColor: '#5CE0D8',
          textDecoration: 'none',
          marginBottom: '4vh',
          color: 'black'
        }}
      >
        Odčítanie
      </div>
      <div
        onClick={() => {
          history.push('/math/multiplying');
          setOperation('multiplying', '#FE4A49');
        }}
        className="math-page__box"
        style={{ backgroundColor: '#FE4A49', marginRight: '4vw' }}
      >
        Násobenie
      </div>
      <div
        onClick={() => {
          history.push('/math/division');
          setOperation('division', '#0D9EDF');
        }}
        className="math-page__box"
        style={{ backgroundColor: '#0D9EDF' }}
      >
        Delenie
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStateRedux) => {
  return {
    operation: state.stateReducer.operation,
    darkMode: state.stateReducer.darkMode
  };
};

export default connect(
  mapStateToProps,
  { setOperation }
)(Home);
