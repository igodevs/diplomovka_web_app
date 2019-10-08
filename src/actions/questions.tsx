import { ActionTypes } from './';

export interface ISetQuestionNumber {
  type: ActionTypes.setQuestionNumber;
  payload: { operation: string; number: number };
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
