import { combineReducers } from 'redux';
import { questionStateReducer } from './questionsReducer';
import { stateReducer } from './stateReducer';
import { IUser } from '../types/webapp';

export interface IStateApp {
  email: string;
  password: string;
  loading: boolean;
  error: string;
  user: IUser | null;
  operation: string;
  color: string;
  darkMode: boolean;
  testId: number | null;
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
