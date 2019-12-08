import * as firebase from 'firebase/app';
import 'firebase/auth';
import history from '../history';
import { ActionTypes } from './';
import { IUser } from '../types/webapp';

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
  payload: IUser | null;
}

export interface ILoginUserFailed {
  type: ActionTypes.loginUserFailed;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export const emailchanged = (text: string): IEmailChanged => {
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

export const loginUserSuccess = (user: IUser | null): ILoginUserSucess => {
  return {
    type: ActionTypes.loginUserSuccess,
    payload: user
  };
};

// export const loginUser = ({ email, password }: ILoginUser) => {
//   console.log('here');
//   console.log(email, password);
//   return (dispatch: Dispatch) => {
//     console.log('theres', dispatch);
//     dispatch<ILoginUserLoading>({ type: ActionTypes.loginUserLoading });

//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(user => loginUserSucess(dispatch, user))
//       .catch(err => {
//         console.log(err);
//         firebase
//           .auth()
//           .createUserWithEmailAndPassword(email, password)
//           .then(user => loginUserSucess(dispatch, user))
//           .catch(() => loginUserFail(dispatch));
//       });
//   };
// };

// const loginUserSucess = (
//   dispatch: Dispatch,
//   user: firebase.auth.UserCredential
// ) => {
//   console.log(user);
//   dispatch<ILoginUserSucess>({
//     type: ActionTypes.loginUserSuccess,
//     payload: user
//   });

//   history.push('/');
// };

// const loginUserFail = (dispatch: Dispatch) => {
//   console.log('d', dispatch);
//   dispatch<ILoginUserFailed>({ type: ActionTypes.loginUserFailed });
// };
