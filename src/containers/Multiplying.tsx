import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuestionNumber } from '../actions';
import { IStateRedux } from '../reducers';

interface IProps {
  operation: string;
}

class Multiplying extends Component<IProps> {
  render() {
    return <div>Multiplying</div>;
  }
}

const mapStateToProps = (state: IStateRedux) => {
  return {
    operation: state.stateReducer.operation,
    color: state.stateReducer.color,
    darkMode: state.stateReducer.darkMode,
    questionMultiplyingCounter: state.questionState.questionMultiplyingCounter
  };
};

export default connect(
  mapStateToProps,
  { setQuestionNumber }
)(Multiplying);
