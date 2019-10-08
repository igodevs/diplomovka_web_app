import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuestionNumber } from '../actions';
import { IStateRedux } from '../reducers';

interface IProps {
  operation: string;
}

class Addition extends Component<IProps> {
  render() {
    return <div>addition</div>;
  }
}

const mapStateToProps = (state: IStateRedux) => {
  return {
    operation: state.stateReducer.operation,
    color: state.stateReducer.color,
    darkMode: state.stateReducer.darkMode,
    questionAdditionCounter: state.questionState.questionAdditionCounter
  };
};

export default connect(
  mapStateToProps,
  { setQuestionNumber }
)(Addition);
