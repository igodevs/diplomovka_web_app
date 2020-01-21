import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';

interface IProps {
  location: object;
  match: object;
}
interface IState {}
interface IStateProps {}

class Login extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="login-page">
        <LoginForm />
      </div>
    );
  }
}

const mapStateToProps = (state: IStateProps) => ({});

export default connect(mapStateToProps, {})(Login);
