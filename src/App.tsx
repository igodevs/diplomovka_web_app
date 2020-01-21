import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { __RouterContext } from 'react-router';
import { useTransition, animated } from 'react-spring';
import Home from './containers/Home';
import Mathematics from './containers/Mathematics';
import NavBar from './components/NavBar';
import Login from './containers/Login';
import Stats from './containers/Stats';
import { IUser } from './types/webapp';
import { loginUserSuccess } from './actions';
import { IStateRedux } from './reducers';

interface IProps {}
interface IPropsRedux {
  loginUser: (user: IUser) => void;
}

interface IPropsReceived {}

const App: React.FC<IPropsRedux> = props => {
  const { location } = useContext(__RouterContext);

  //ComponentDidMount
  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                Authorization: token
              }
            })
              .then(response => response.json())
              .then((user: IUser) => {
                if (user && user.email) {
                  props.loginUser(user);
                }
              })
              .catch(console.log);
          }
        })
        .catch(console.log);
    }
  }, []);

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
              <NavBar />
              <Switch location={item}>
                <Route exact path="/" component={Home} />
                <Route exact path="/math/:id" component={Mathematics} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/stats" component={Stats} />
              </Switch>
            </animated.div>
          );
        })}
      </main>
    </>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IProps
): IPropsRedux => {
  return {
    loginUser: (user: IUser) => dispatch(loginUserSuccess(user))
  };
};

export default connect(null, mapDispatchToProps)(App);
