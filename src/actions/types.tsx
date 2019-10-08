import {
  IEmailChanged,
  IPasswordChanged,
  ILoginUserLoading,
  ILoginUserSucess,
  ILoginUserFailed,
  ISetOperation,
  ISetDarkMode,
  ISetQuestionNumber
} from './';

export enum ActionTypes {
  emailChanged,
  passwordChanged,
  loginUserLoading,
  loginUserSuccess,
  loginUserFailed,
  setOperation,
  setDarkMode,
  setQuestionNumber
}

export type Action =
  | IEmailChanged
  | IPasswordChanged
  | ILoginUserSucess
  | ILoginUserFailed
  | ILoginUserLoading
  | ISetOperation
  | ISetDarkMode
  | ISetQuestionNumber;
