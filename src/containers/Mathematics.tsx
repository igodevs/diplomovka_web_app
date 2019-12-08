import React, { Component } from 'react';
import Addition from './Addition';
import Substraction from './Substraction';
import Multiplying from './Multiplying';
import Division from './Division';
import Examples from './Examples';
import { RouteComponentProps } from 'react-router-dom';
import { IStateRedux } from '../reducers';
import { connect } from 'react-redux';

interface IPropsFromState {
  operation: string;
  color: string;
}

interface IPropsReceived extends RouteComponentProps<any> {
  // location: object;
  // match: object;
  operation: string;
}

class Mathematics extends Component<IPropsFromState & IPropsReceived> {
  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate(prevProps: IPropsFromState & IPropsReceived): void {
    console.log(this.props);
  }
  render() {
    switch (this.props.match.params.id) {
      case 'main-math':
        return <Examples />;
      case 'addition':
        return <Addition match={this.props.match} />;
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
  state: IStateRedux
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
