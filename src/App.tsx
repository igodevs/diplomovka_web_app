import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import { useTransition, animated } from 'react-spring';
import Home from './containers/Home';
import Mathematics from './containers/Mathematics';

const App: React.FC = () => {
  const { location } = useContext(__RouterContext);

  const transition = useTransition(location, location => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  return (
    <>
      <main className="containter">
        {transition.map(({ item, props, key }) => {
          console.log(item, props, key);
          return (
            <animated.div key={key} style={props}>
              <Switch location={item}>
                <Route exact path="/" component={Home} />
                <Route exact path="/math" component={Mathematics} />
              </Switch>
            </animated.div>
          );
        })}
      </main>
    </>
  );
};

export default App;
