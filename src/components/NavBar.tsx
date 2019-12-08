import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import logo from '../assets/logo.svg';
import history from '../history';
import NavBarButton from './NavBarButton';
import { IStateRedux } from '../reducers';
import { IUser } from '../types/webapp';
import { loginUserSuccess } from '../actions';

interface IProps {}
interface IState {}
interface IPropsReceived {
  user: IUser | null;
}

interface IPropsRedux {
  loginUser: (user: IUser | null) => void;
}

type Props = IPropsReceived & IProps & IPropsRedux;

class NavBar extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  click = () => {
    console.log('clicked');
  };

  logOut = () => {
    window.sessionStorage.removeItem('token');
    this.props.loginUser(null);
  };

  render() {
    return (
      <div className="navigation">
        <div className="navigation-logo">
          <img src={logo} onClick={() => history.push('/')} alt="logo" />
        </div>
        {this.props.user !== null ? (
          <div className="navigation-buttons">
            <NavBarButton
              text="Nastavenia"
              onClick={() => history.push('/settings')}
            />
            <NavBarButton
              text="Štatistiky"
              onClick={() => history.push('/stats')}
            />
            <NavBarButton text="Odhlásiť sa" onClick={() => this.logOut()} />
          </div>
        ) : (
          <div className="navigation-buttons">
            <NavBarButton
              text="Prihlásenie/Registrácia"
              onClick={() => history.push('/login')}
            />
            {/* <NavBarButton
            text="Registrácia"
            onClick={() => history.push('/login/registration')}
          /> */}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (
  state: IStateRedux,
  ownProps: IProps
): IPropsReceived => {
  return {
    user: state.stateReducer.user
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IProps
): IPropsRedux => {
  return {
    loginUser: (user: IUser | null) => dispatch(loginUserSuccess(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
