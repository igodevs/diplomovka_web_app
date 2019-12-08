import { ActionTypes } from './';

export interface ISetOperation {
  type: ActionTypes.setOperation;
  payload: { operation: string; color: string };
}

export interface ISetDarkMode {
  type: ActionTypes.setDarkMode;
  payload: boolean;
}
export interface INew {
  type: ActionTypes.new;
  payload: string;
}

export const setOperation = (
  operation: string,
  color: string
): ISetOperation => {
  return {
    type: ActionTypes.setOperation,
    payload: { operation, color }
  };
};

export const setEmail = (operation: string): INew => {
  console.log('setEmail', operation);
  return {
    type: ActionTypes.new,
    payload: operation
  };
};

export const setDarkMode = (set: boolean): ISetDarkMode => {
  return {
    type: ActionTypes.setDarkMode,
    payload: set
  };
};
