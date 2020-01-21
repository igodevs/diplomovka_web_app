import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  setEmail,
  setQuestionNumber,
  setOperation,
  setTestId,
  ISetQuestionNumber,
  ISetOperation,
  ISetTestId
} from '../actions';
import { Line } from 'rc-progress';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { IStateRedux } from '../reducers';
import { IUser, IResponse } from '../types/webapp';
import EndTest from './EndTest';

interface IProps {}

const mathEnum = {
  ADDITION: 0,
  SUBTRACTION: 1,
  MULTIPlYING: 2,
  DIVISION: 3
};

interface IPropsReceived {
  operation: string;
  color: string;
  questionExamplesCounter: number;
  user: IUser | null;
  testId: number | null;
}

interface IPropsRedux {
  setQuestionNumber: (operation: string, number: number) => ISetQuestionNumber;
  setOperation: (operation: string, color: string) => ISetOperation;
  setTestId: (id: number) => ISetTestId;
}

interface IState {
  answer: number | undefined;
  answerColor: string;
  mark: string;
  example: number[] | null;
  timer: number;
  ready: boolean;
  action: number | null;
  endTest: boolean;
  step: number;
  epoch: number;
}

interface IResponseGetExample {
  a: number;
  action: number;
  b: number;
  epoch: number;
  res: string;
  step: number;
}

let interval: NodeJS.Timeout;

type Props = IPropsRedux & IPropsReceived & IProps;

class Examples extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      answer: undefined,
      answerColor: this.props.color !== 'white' ? this.props.color : '#00A572',
      mark: '',
      example: null,
      timer: 15,
      ready: false,
      action: null,
      endTest: false,
      step: 0,
      epoch: 0
    };
  }

  componentDidMount() {
    // this.randomExample(null);
    this.props.setOperation('examples', this.props.color);
    this.createNewTest()
      .then(data => {
        if (data.success) {
          this.startApplication();
          interval = setInterval(
            () => this.setState(prevState => ({ timer: prevState.timer - 1 })),
            1000
          );
        } else {
          // TODO CREATE ERROR PAGE
        }
      })
      .catch(err => {
        console.error(err);
        // TODO CREATE ERROR PAGE
        this.setState({ ready: true });
      });
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      console.log('UPDATE there');
      this.sendExample(9999);
      this.setState({ timer: 15 });
      //clearInterval(interval);
    }
  }

  componentWillUnmount() {
    console.log('UNMOUNT');
    clearInterval(interval);
    if (!this.state.endTest) {
      console.log('REMOVE NOT ENDED TEST');
      fetch('http://localhost:3000/question/removeTest', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_test: this.props.testId
        })
      })
        .then(res => res.json())
        .then((response: IResponse) => {
          console.log('removeTest', response);
        })
        .catch(err =>
          //ERROR SCREEN
          console.log('removeTest', err)
        );
    }
  }

  createNewTest = (): Promise<{ success: boolean; information: string }> => {
    return new Promise((resolve, reject) => {
      if (this.props.user) {
        fetch('http://localhost:3000/questions/createTest', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_user: this.props.user.id
          })
        })
          .then(res => res.json())
          .then((response: IResponse) => {
            console.log('createTestReaponse', response);
            if (response.type === 'success' && response.data.id) {
              this.props.setTestId(response.data.id[0]);
              resolve({ success: true, information: 'Test crated' });
            } else {
              reject({ success: false, information: 'Test not created.' });
            }
          })
          .catch(err => reject({ success: false, information: err }));
      } else {
        reject({ success: false, information: 'User must be logged in.' });
      }
    });
  };

  // validateAnswer = (counter) => {
  //     let answer = this.state.answer
  //     let example = this.state.example[0] + this.state.mark + this.state.example[1]

  //     this.setState({answerColor: answer != eval(example) ? 'red' : this.props.color})
  //     console.log()
  //     if(answer === eval(example)){
  //         if(counter+1 <= 10)
  //             this.props.onSetQuestionNumber(this.props.operation, counter+1)
  //             console.log(this.props.operation)
  //     }
  //     else {
  //         if(counter-1 >= 1)
  //             this.props.onSetQuestionNumber(this.props.operation, counter-1)
  //     }
  //     this.setState({timer: 16})

  // }

  startApplication = () => {
    fetch('http://127.0.0.1:5000/getZeros', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.res === 'success') this.getExample();
      })
      .catch(console.log);
  };

  getExample = () => {
    fetch('http://127.0.0.1:5000/train', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then((data: IResponseGetExample) => {
        console.log('getExample', data);
        if (data.res === 'ok') {
          var arr = [data.a, data.b];
          this.setState({
            example: arr,
            action: data.action,
            mark: this.randomExample(data.action),
            step: data.step,
            epoch: data.epoch
          });
          setTimeout(() => {
            this.setState({ ready: true });
          }, 300);
        } else {
          console.log('END TEST');
          this.setState({ endTest: true });
          this.computeResultsOfTest();
        }
      })
      .catch(console.log);
  };

  computeResultsOfTest() {
    console.log('COMPUTE RESULT');
    //FETCH
    fetch('http://localhost:3000/question/computeResultsOfTest', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_test: this.props.testId
      })
    })
      .then(res => res.json())
      .then((response: IResponse) => {
        console.log('computeResults', response);
      })
      .catch(err =>
        //ERROR SCREEN
        console.log('computeResultsERR', err)
      );
  }

  saveExampleToDB = (
    userId: number,
    testId: number,
    first_number: number,
    second_number: number,
    mark: string,
    answer: number,
    is_correct_answer: boolean
  ) => {
    fetch('http://localhost:3000/questions/addQuestion', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_user: userId,
        id_test: testId,
        first_number,
        second_number,
        mark: this.state.mark,
        answer,
        is_correct_answer
      })
    })
      .then(res => res.json())
      .then((response: IResponse) => {
        // //console.log('createTestReaponse', response);
        // if (response.type === 'success' && response.data.id) {
        //   //this.props.setTestId(response.data.id[0]);
        //   //resolve({ success: true, information: 'Test crated' });
        // } else {
        //   //reject({ success: false, information: 'Test not created.' });
        // }
      })
      .catch(err =>
        //reject({ success: false, information: err })
        console.log(err)
      );
  };

  sendExample = (userResponse: number | null = null) => {
    if (
      this.state.example &&
      this.props.user &&
      this.state.answer !== undefined
    )
      fetch('http://localhost:5000/evaluate', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          a: this.state.example[0],
          b: this.state.example[1],
          action: this.state.action,
          userResponse: userResponse === null ? this.state.answer : userResponse
        })
      })
        .then(res => res.json())
        .then(data => {
          // this.setState({answer:undefined})
          console.log(data);
          if (
            this.state.example &&
            this.props.user &&
            this.props.testId &&
            this.state.answer !== undefined
          )
            this.saveExampleToDB(
              this.props.user.id,
              this.props.testId,
              this.state.example[0],
              this.state.example[1],
              this.state.mark,
              userResponse === null ? this.state.answer : userResponse,
              data.res === 'success'
            );
          if (data.res === 'success') {
            this.props.setQuestionNumber(
              this.props.operation,
              this.props.questionExamplesCounter + 1
            );
            this.setState({ answerColor: this.props.color });
          } else {
            this.setState({ answerColor: 'red' });
          }

          this.getExample();
        })
        .catch(console.log);
  };

  randomExample = (operation: number) => {
    let marks = ['+', '/', '*', '-'];
    let mark = '';
    switch (operation) {
      case mathEnum.ADDITION:
        mark = '+';
        break;
      case mathEnum.DIVISION:
        mark = '/';
        break;
      case mathEnum.MULTIPlYING:
        mark = '*';
        break;
      case mathEnum.SUBTRACTION:
        mark = '-';
        break;
      default:
        let randomNumber = Math.floor(Math.random() * marks.length);
        mark = marks[randomNumber];
        break;
    }
    console.log(mark);
    return mark;
  };

  getMarkFromOperation = (operation: number) => {
    let mark = '';
    switch (operation) {
      case mathEnum.ADDITION:
        mark = '+';
        break;
      case mathEnum.DIVISION:
        mark = '/';
        break;
      case mathEnum.MULTIPlYING:
        mark = '*';
        break;
      case mathEnum.SUBTRACTION:
        mark = '-';
        break;
      default:
        break;
    }
    return mark;
  };

  onChanged = (text: string) => {
    isNaN(parseInt(text))
      ? this.setState({ answer: undefined })
      : this.setState({ answer: parseInt(text) });
  };

  render() {
    // if(this.state.endTest){
    //     <View onPress={Keyboard.dismiss}  style={[containterStyle(this.props.darkMode), {padding: 10, paddingTop: 30}]}>
    //         <Text>Koniec Testu</Text>
    //     </View>
    // }
    if (this.state.ready) {
      if (this.state.endTest) {
        return <EndTest />;
      } else {
        return (
          <div className="section-examples">
            <div className="examples-informations">
              <p style={{ marginBottom: '2rem' }}>
                Text č. {this.state.epoch} príklad:
              </p>
              <p style={{ marginBottom: '3rem' }}>{this.state.step} z 5</p>
              <Line
                percent={this.state.step * 20}
                strokeWidth={1}
                trailWidth={1}
                strokeColor={this.props.color}
              />
            </div>

            {/* <Circle percent={10} strokeWidth={4} strokeColor="#D3D3D3">
              <p>dsafs</p>
            </Circle> */}
            <div className="examples-math_action">
              <div className="examples-math_action--progressbar">
                <CircularProgressbarWithChildren
                  styles={{
                    path: { stroke: this.props.color },
                    trail: { stroke: '#eee' }
                  }}
                  value={this.state.timer >= 1 ? this.state.timer * 6.6666 : 0}
                >
                  {this.state.example !== null && (
                    <div
                      className="examples-math_action--progressbar-content"
                      style={{ color: this.state.answerColor }}
                    >
                      {' '}
                      {`${this.state.example[0]} ${
                        this.state.mark === '/' ? '÷' : this.state.mark
                      } ${this.state.example[1]}`}{' '}
                      = {this.state.answer}
                    </div>
                  )}
                </CircularProgressbarWithChildren>
              </div>
              <div className="examples-math_action--answer">
                <input onChange={event => this.onChanged(event.target.value)} />
                <button
                  onClick={() => {
                    this.sendExample();
                    this.setState({ timer: 15 });
                  }}
                  style={{ backgroundColor: this.props.color }}
                >
                  POTVRDIT
                </button>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (
  state: IStateRedux,
  ownProps: IProps
): IPropsReceived => {
  return {
    operation: state.stateReducer.operation,
    color: state.stateReducer.color,
    questionExamplesCounter: state.questionState.questionExamplesCounter,
    user: state.stateReducer.user,
    testId: state.stateReducer.testId
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IProps
): IPropsRedux => {
  return {
    setQuestionNumber: (operation: string, number: number) =>
      dispatch(setQuestionNumber(operation, number)),
    setOperation: (operation: string, color: string) =>
      dispatch(setOperation(operation, color)),
    setTestId: (id: number) => dispatch(setTestId(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Examples);
