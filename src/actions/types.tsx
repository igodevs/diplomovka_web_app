import {
  IEmailChanged,
  IPasswordChanged,
  ILoginUserLoading,
  ILoginUserSucess,
  ILoginUserFailed,
  ISetOperation,
  ISetDarkMode,
  ISetQuestionNumber,
  INew
} from './';

export enum ActionTypes {
  passwordChanged,
  loginUserLoading,
  loginUserSuccess,
  loginUserFailed,
  setOperation,
  setDarkMode,
  setQuestionNumber,
  emailChanged,
  new
}

export type Action =
  | IEmailChanged
  | IPasswordChanged
  | ILoginUserSucess
  | ILoginUserFailed
  | ILoginUserLoading
  | ISetOperation
  | ISetDarkMode
  | ISetQuestionNumber
  | INew;
