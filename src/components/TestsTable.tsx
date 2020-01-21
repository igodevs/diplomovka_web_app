import React, { PureComponent } from 'react';
import { IStats, IQuestionStats, IResponse, ITimer } from '../types/webapp';
import { getAuthTokenFromSession, getStringDate } from '../methods';

interface IState {
  isQuestionHistoryOpen: boolean;
  questionHistory: IQuestionStats[] | null;
  openTestModalData: IStats | null;
  modalContent: number;
  openModalTestTimer: ITimer | null;
}
interface IProps {
  headValues: string[];
  stats: IStats[] | null;
  getDurationBetweenTwoDates: (
    start: Date,
    end: Date
  ) => { days: number; hours: number; minutes: number; seconds: number };
}

enum modalContentEnum {
  informations,
  answers
}

export default class Table extends PureComponent<IProps, IState> {
  state: IState = {
    isQuestionHistoryOpen: false,
    questionHistory: null,
    openTestModalData: null,
    modalContent: modalContentEnum.informations,
    openModalTestTimer: null
  };

  componentDidMount() {}

  getQuestionHistory = (
    id_test: number,
    id_user: number,
    correct: boolean | null = null
  ) => {
    const token = getAuthTokenFromSession();
    if (token) {
      if (correct === null) {
        fetch(`http://localhost:3000/questions/questionHistory`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify({
            id_test,
            id_user
          })
        })
          .then(res => res.json())
          .then((response: IResponse) => {
            console.log('data', response);
            if (response.type !== 'error')
              this.setState({
                isQuestionHistoryOpen: true,
                questionHistory: response.data.questions
              });
          })
          .catch(console.error);
      } else {
        fetch(`http://localhost:3000/questions/questionHistory`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify({
            id_test,
            id_user,
            correct
          })
        })
          .then(res => res.json())
          .then((response: IResponse) => {
            console.log(response);
            if (response.type !== 'error')
              this.setState({
                isQuestionHistoryOpen: true,
                questionHistory: response.data.questions
              });
          })
          .catch(console.error);
      }
    }
  };

  render() {
    return (
      <div className="section-table">
        <div className="table">
          <div className="table__thead">
            {this.props.headValues.length > 0 &&
              this.props.stats &&
              this.props.headValues.map((stat: string, index: number) => {
                return (
                  <p key={index} className="table__thead-p">
                    {stat}
                  </p>
                );
              })}
          </div>

          <div className="table__body-all">
            {this.props.headValues.length > 0 &&
              this.props.stats &&
              this.props.stats.map((stat, i) => {
                return (
                  <div key={i} className="table__row">
                    <div className="table__tbody">
                      <p className="table__tbody-p">{i + 1} </p>
                      <p className="table__tbody-p">
                        {stat.addition_correct_answers}{' '}
                      </p>
                      <p className="table__tbody-p">
                        {stat.addition_bad_answers}{' '}
                      </p>
                      <p className="table__tbody-p">
                        {stat.division_correct_answers}{' '}
                      </p>
                      <p className="table__tbody-p">
                        {stat.division_bad_answers}
                      </p>
                      <p className="table__tbody-p">
                        {stat.multyplying_correct_answers}
                      </p>
                      <p className="table__tbody-p">
                        {stat.multyplying_bad_answers}
                      </p>
                      <p className="table__tbody-p">
                        {stat.substraction_correct_answers}
                      </p>
                      <p className="table__tbody-p">
                        {stat.substraction_bad_answers}
                      </p>
                      {stat.end_date_time !== null ? (
                        <button
                          className="table__tbody-button"
                          onClick={() => {
                            console.log(stat.start_date_time);
                            //getDateFromDBTimestamp(stat.date_time);

                            this.setState({
                              openTestModalData: stat,
                              openModalTestTimer: this.props.getDurationBetweenTwoDates(
                                new Date(stat.start_date_time),
                                new Date(stat.end_date_time)
                              )
                            });
                            this.getQuestionHistory(stat.id, stat.id_user);
                          }}
                        >
                          Zobraziť
                        </button>
                      ) : (
                        <p>nedokončený</p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {this.state.isQuestionHistoryOpen && (
          <div className="table__modal">
            <div className="table__modal--content-box">
              <p
                className="table__modal--content-box__close"
                onClick={() =>
                  this.setState({
                    questionHistory: null,
                    isQuestionHistoryOpen: false
                  })
                }
              >
                x
              </p>
              <div className="table__modal--content-box__buttons">
                <div
                  className={
                    this.state.modalContent === modalContentEnum.informations
                      ? 'table__modal--content-box__buttons-button table__modal--content-box__buttons-button-bg'
                      : 'table__modal--content-box__buttons-button'
                  }
                  onClick={() =>
                    this.setState({
                      modalContent: modalContentEnum.informations
                    })
                  }
                >
                  Informácie
                </div>
                <div
                  className={
                    this.state.modalContent === modalContentEnum.answers
                      ? 'table__modal--content-box__buttons-button table__modal--content-box__buttons-button-bg'
                      : 'table__modal--content-box__buttons-button'
                  }
                  onClick={() =>
                    this.setState({ modalContent: modalContentEnum.answers })
                  }
                >
                  Odpovede
                </div>
              </div>
              <div className="table__modal--content-box__content">
                {this.state.modalContent === modalContentEnum.informations &&
                this.state.openTestModalData !== null ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '2.6rem'
                    }}
                  >
                    <div style={{ display: 'flex', marginBottom: '5rem' }}>
                      <p style={{ marginRight: '1rem' }}>Začiatok testu: </p>
                      <p style={{ fontWeight: 600 }}>
                        {getStringDate(
                          new Date(this.state.openTestModalData.start_date_time)
                        )}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        marginBottom: '5rem'
                      }}
                    >
                      <p style={{ marginRight: '1rem' }}>Koniec testu:</p>
                      <p style={{ fontWeight: 600 }}>
                        {getStringDate(
                          new Date(this.state.openTestModalData.end_date_time)
                        )}
                      </p>
                    </div>
                    {this.state.openModalTestTimer && (
                      // <div>
                      //   {/* {this.state.openModalTestTimer.days}{' '}
                      //   {this.state.openModalTestTimer.hours}{' '} */}
                      //   {this.state.openModalTestTimer.minutes}min.{' '}
                      //   {this.state.openModalTestTimer.seconds}sek.
                      // </div>
                      <div className="last-test__timer">
                        <div className="last-test__timer_css">
                          <div
                            className="last-test__timer_css-time mgr3"
                            style={{ marginBottom: '0' }}
                          >
                            <p>{this.state.openModalTestTimer.minutes}</p>{' '}
                            <p>minút</p>
                          </div>
                          <div className="last-test__timer_css-time">
                            <p>{this.state.openModalTestTimer.seconds}</p>
                            <p>sekúnd</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  this.state.questionHistory !== null && (
                    <div className="test-modal--answers">
                      <div className="test-modal--answers__column">
                        <h1>Správne odpovede</h1>
                        {this.state.questionHistory
                          .filter(data => data.is_correct_answer)
                          .map((data: IQuestionStats, index: number) => {
                            return (
                              <p>
                                {data.first_number} {data.mark}{' '}
                                {data.second_number} = {data.answer}
                              </p>
                            );
                          })}
                      </div>
                      <div className="test-modal--answers__column">
                        <h1>Neprávne odpovede</h1>
                        {this.state.questionHistory
                          .filter(data => !data.is_correct_answer)
                          .map((data: IQuestionStats, index: number) => {
                            return (
                              <p>
                                {data.first_number} {data.mark}{' '}
                                {data.second_number} = {data.answer}
                              </p>
                            );
                          })}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
