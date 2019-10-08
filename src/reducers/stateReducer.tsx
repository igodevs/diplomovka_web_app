import { ActionTypes, Action } from '../actions';
import { IStateApp } from '.';

const INITIAL_STATE: IStateApp = {
  email: '',
  password: '',
  loading: false,
  error: '',
  user: null,
  operation: '',
  color: 'white',
  darkMode: false
};

export const stateReducer = (
  state: IStateApp = INITIAL_STATE,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.emailChanged:
      return Object.assign({}, state, { ...state, email: action.payload });
    case ActionTypes.passwordChanged:
      return Object.assign({}, state, { ...state, password: action.payload });
    case ActionTypes.loginUserLoading:
      return Object.assign({}, state, { ...state, loading: true, error: '' });
    case ActionTypes.loginUserSuccess:
      return Object.assign({}, state, { user: action.payload });
    case ActionTypes.loginUserFailed:
      return Object.assign({}, state, {
        ...state,
        error: 'Authentification Failed.',
        password: '',
        loading: false
      });
    case ActionTypes.setOperation:
      return Object.assign({}, state, {
        operation: action.payload.operation,
        color: action.payload.color
      });
    case ActionTypes.setDarkMode:
      return Object.assign({}, state, { darkMode: action.payload });
    default:
      return state;
  }
};
