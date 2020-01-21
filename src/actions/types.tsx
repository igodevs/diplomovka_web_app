import {
  IEmailChanged,
  IPasswordChanged,
  ILoginUserLoading,
  ILoginUserSucess,
  ILoginUserFailed,
  ISetOperation,
  ISetDarkMode,
  ISetQuestionNumber,
  INew,
  ISetTestId
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
  new,
  setTestId
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
  | INew
  | ISetTestId;
