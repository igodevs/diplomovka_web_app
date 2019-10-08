import { combineReducers } from 'redux';
import { questionStateReducer } from './questionsReducer';
import { stateReducer } from './stateReducer';

export interface IStateApp {
  email: string;
  password: string;
  loading: boolean;
  error: string;
  user: firebase.auth.AuthCredential | null;
  operation: string;
  color: string;
  darkMode: boolean;
}

export interface IQuestionState {
  questionAdditionCounter: number;
  questionSubstractionCounter: number;
  questionMultiplyingCounter: number;
  questionDivisionCounter: number;
  questionExamplesCounter: number;
}

export interface IStateRedux {
  questionState: IQuestionState;
  stateReducer: IStateApp;
}

export const reducers = combineReducers<IStateRedux>({
  questionState: questionStateReducer,
  stateReducer: stateReducer
});
