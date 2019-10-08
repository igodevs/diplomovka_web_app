import React, { Component } from 'react';
import Addition from './Addition';
import Substraction from './Substraction';
import Multiplying from './Multiplying';
import Division from './Division';
import { IStateRedux, IStateApp, IQuestionState } from '../reducers';
import { connect } from 'react-redux';

interface IPropsFromState {
  operation: string;
  color: string;
}

interface IPropsReceived {
  history: object;
  location: object;
  match: object;
}

class Mathematics extends Component<IPropsFromState & IPropsReceived> {
  constructor(props: IPropsFromState & IPropsReceived) {
    super(props);
  }

  componentDidUpdate(prevProps: IPropsFromState & IPropsReceived): void {
    console.log(this.props);
  }
  render() {
    console.log('operation', this.props);
    console.log(typeof this.props.history);
    switch (this.props.operation) {
      case 'addition':
        return <Addition />;
      case 'substraction':
        return <Substraction />;
      case 'multiplying':
        return <Multiplying />;
      case 'division':
        return <Division />;
      default:
        return <div>Error</div>;
    }
  }
}

const mapStateToProps = (
  state: IStateRedux,
  ownProps = {}
): { operation: string; color: string } => {
  return {
    operation: state.stateReducer.operation,
    color: state.stateReducer.color
  };
};

export default connect(
  mapStateToProps,
  {}
)(Mathematics);
