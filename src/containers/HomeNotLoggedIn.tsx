import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStateRedux } from '../reducers';
import mac from '../assets/mac.png';
import iphone from '../assets/x.png';
import samsung from '../assets/s8.png';
import history from '../history';

interface IProps {}
interface IState {}

class HomeNotLoggedIn extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="section-home-not-logged-in">
        <div className="section-home-not-logged-in__welcome">
          <p>Vitajte v teste</p>
          <div>
            <p>pre pokračovanie sa</p>
            <p onClick={() => history.push('/login')}>PRIHLÁSTE</p>
          </div>
        </div>
        <div className="section-home-not-logged-in__app">
          <div className="section-home-not-logged-in__app-devices">
            <img
              className="section-home-not-logged-in__app-devices-iphone"
              src={iphone}
              alt="iphone"
            />
            <img
              className="section-home-not-logged-in__app-devices-mac"
              src={mac}
              alt="mac"
            />
            <img
              className="section-home-not-logged-in__app-devices-android"
              src={samsung}
              alt="android"
            />
          </div>
          <p className="section-home-not-logged-in__app-note">
            Dostupné pre všetky zariadenia
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStateRedux) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeNotLoggedIn);
