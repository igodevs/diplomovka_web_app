import { ActionTypes } from './';

export interface ISetQuestionNumber {
  type: ActionTypes.setQuestionNumber;
  payload: { operation: string; number: number };
}

export interface ISetTestId {
  type: ActionTypes.setTestId;
  payload: number;
}

export const setQuestionNumber = (
  operation: string,
  number: number
): ISetQuestionNumber => {
  return {
    type: ActionTypes.setQuestionNumber,
    payload: { operation, number }
  };
};

export const setTestId = (id: number): ISetTestId => {
  console.log('setTestId', id);
  return {
    type: ActionTypes.setTestId,
    payload: id
  };
};
