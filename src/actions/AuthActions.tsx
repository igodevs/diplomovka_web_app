import firebase from 'firebase';
import history from '../history';
import { ActionTypes } from './';

import { Dispatch } from 'redux';

export interface IEmailChanged {
  type: ActionTypes.emailChanged;
  payload: string;
}

export interface IPasswordChanged {
  type: ActionTypes.passwordChanged;
  payload: string;
}

export interface ILoginUserLoading {
  type: ActionTypes.loginUserLoading;
}

export interface ILoginUserSucess {
  type: ActionTypes.loginUserSuccess;
  payload: firebase.auth.UserCredential;
}

export interface ILoginUserFailed {
  type: ActionTypes.loginUserFailed;
}

export const emailChanged = (text: string): IEmailChanged => {
  return {
    type: ActionTypes.emailChanged,
    payload: text
  };
};

export const passwordChanged = (text: string): IPasswordChanged => {
  return {
    type: ActionTypes.passwordChanged,
    payload: text
  };
};

export const loginUser = ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  console.log('here');
  console.log(email, password);
  return (dispatch: Dispatch) => {
    dispatch<ILoginUserLoading>({ type: ActionTypes.loginUserLoading });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSucess(dispatch, user))
      .catch(err => {
        console.log(err);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSucess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserSucess = (
  dispatch: Dispatch,
  user: firebase.auth.UserCredential
) => {
  dispatch<ILoginUserSucess>({
    type: ActionTypes.loginUserSuccess,
    payload: user
  });

  history.push('/');
};

const loginUserFail = (dispatch: Dispatch) => {
  dispatch<ILoginUserFailed>({ type: ActionTypes.loginUserFailed });
};
