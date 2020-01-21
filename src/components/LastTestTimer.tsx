import React, { PureComponent } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import { getStringDate } from '../methods';
import { ITimer } from '../types/webapp';

interface Props {
  lastTestDateTime: Date;
  getDurationBetweenTwoDates: (start: Date, end: Date) => ITimer;
}
interface State {
  lastTestTimer: ITimer | null;
}

class LastTestTimer extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      lastTestTimer: null
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        lastTestTimer: this.props.getDurationBetweenTwoDates(
          new Date(this.props.lastTestDateTime),
          new Date()
        )
      });
    }, 1000);
  }

  render() {
    return (
      <div className="last-test">
        <p className="last-test__title">Posledný test</p>
        <p className="last-test__date">
          {getStringDate(this.props.lastTestDateTime)}
        </p>
        <div className="last-test__timer">
          {this.state.lastTestTimer !== null && (
            <div className="last-test__timer_css">
              <Spring
                config={{ precision: 0.1 }}
                from={{ days: 0, hours: 0, minutes: 0, seconds: 0 }}
                to={{
                  days: this.state.lastTestTimer.days,
                  hours: this.state.lastTestTimer.hours,
                  minutes: this.state.lastTestTimer.minutes,
                  seconds: this.state.lastTestTimer.seconds
                }}
              >
                {props => (
                  <>
                    <div className="last-test__timer_css-time mgr3">
                      <p>{Math.round(props.days)}</p> <p>dní</p>
                    </div>
                    <div className="last-test__timer_css-time mgr3">
                      <p>{Math.round(props.hours)}</p>
                      <p>hodín</p>
                    </div>
                    <div className="last-test__timer_css-time mgr3">
                      <p>{Math.round(props.minutes)}</p>
                      <p>minút</p>
                    </div>
                    <div className="last-test__timer_css-time ">
                      <p>{Math.round(props.seconds)}</p>
                      <p>sekúnd</p>
                    </div>
                  </>
                )}
              </Spring>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LastTestTimer;
