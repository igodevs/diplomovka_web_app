import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEmail, setQuestionNumber, setOperation } from '../actions';
import { Line } from 'rc-progress';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { IStateRedux } from '../reducers';

// const math = {
//   ADDITION: 'addition',
//   DIVISION: 'division',
//   MULTIPlYING: 'multiplying',
//   SUBTRACTION: 'substraction'
// };

const mathEnum = {
  ADDITION: 0,
  SUBTRACTION: 1,
  MULTIPlYING: 2,
  DIVISION: 3
};

interface IPropsFromState {
  operation: string;
  color: string;
  questionExamplesCounter: number;
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

class Examples extends Component<IPropsFromState, IState> {
  constructor(props: IPropsFromState) {
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
    setEmail('dsaf');
    console.log(this.props.color);
    // this.randomExample(null);
    setOperation('examples', '#00A572');
    this.startApplication();
    interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer - 1 })),
      1000
    );
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      this.sendExample(30000);
      //clearInterval(interval);
    }
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

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
        console.log(data);
        if (data.res === 'ok') {
          console.log(data, data.a, data.b, data.action);
          var arr = [data.a, data.b];
          console.log(arr[0], arr[1]);
          console.log(this.randomExample(data.action));

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
          this.setState({ endTest: true });
        }
      })
      .catch(console.log);
  };

  sendExample = (userResponse: number | null = null) => {
    if (this.state.example !== null)
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
          if (data.res === 'success') {
            setQuestionNumber(
              this.props.operation,
              this.props.questionExamplesCounter + 1
            );
            this.setState({ answerColor: this.props.color });
          } else {
            this.setState({ answerColor: 'red' });
          }
          this.setState({ timer: 16 });
          this.getExample();
        })
        .catch(console.log);
  };

  randomExample = (operation: number) => {
    let marks = ['+', '/', '*', '-'];
    let mark = '';
    console.log(operation, typeof operation);
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

  onChanged = (text: string) => {
    console.log(text);
    console.log(parseInt(text));
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
        return (
          <div>
            <p>Koniec Testu</p>
          </div>
        );
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
                  onClick={() => this.sendExample()}
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

const mapStateToProps = (state: IStateRedux) => {
  return {
    operation: state.stateReducer.operation,
    color: state.stateReducer.color,
    questionExamplesCounter: state.questionState.questionExamplesCounter
  };
};

export default connect(
  mapStateToProps,
  { setEmail, setQuestionNumber, setOperation }
)(Examples);
