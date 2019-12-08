import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuestionNumber } from '../actions';
import { IStateRedux } from '../reducers';

interface IPropsFromState {
  operation: string;
  color: string;
}

interface IProps {
  match: any;
}

class Addition extends Component<IProps & IPropsFromState> {
  constructor(props: IProps & IPropsFromState) {
    super(props);

    this.state = {
      answer: undefined,
      answerColor: this.props.color
    };
  }

  validateAnswer = (answer: number, counter: number) => {
    this.setState({ answer });
    this.setState({ answerColor: answer !== 6 ? 'red' : this.props.color });
    if (answer === 6) {
      if (counter + 1 <= 20)
        setQuestionNumber(this.props.match.id, counter + 1);
    } else {
      if (counter - 1 >= 1) setQuestionNumber(this.props.match.id, counter - 1);
    }
  };

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
