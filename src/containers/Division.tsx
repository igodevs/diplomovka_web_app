import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuestionNumber } from '../actions';
import { IStateRedux } from '../reducers';

interface IProps {
  operation: string;
}

class Division extends Component<IProps> {
  render() {
    return <div>Division</div>;
  }
}

const mapStateToProps = (state: IStateRedux) => {
  return {
    operation: state.stateReducer.operation,
    color: state.stateReducer.color,
    darkMode: state.stateReducer.darkMode,
    questionDivisionCounter: state.questionState.questionDivisionCounter
  };
};

export default connect(
  mapStateToProps,
  { setQuestionNumber }
)(Division);
