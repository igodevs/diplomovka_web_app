import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuestionNumber } from '../actions';
import { IStateRedux } from '../reducers';

interface IProps {
  operation: string;
}

class Substraction extends Component<IProps> {
  render() {
    return <div>Substraction</div>;
  }
}

const mapStateToProps = (state: IStateRedux) => {
  return {
    operation: state.stateReducer.operation,
    color: state.stateReducer.color,
    darkMode: state.stateReducer.darkMode,
    questionSubstractionCounter: state.questionState.questionSubstractionCounter
  };
};

export default connect(
  mapStateToProps,
  { setQuestionNumber }
)(Substraction);
