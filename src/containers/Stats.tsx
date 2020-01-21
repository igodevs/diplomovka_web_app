import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Line, Pie } from 'react-chartjs-2';
import { Dispatch } from 'redux';
import { IStateRedux } from '../reducers';
import { getAuthTokenFromSession } from '../methods';
import LastTestTimer from '../components/LastTestTimer';
import { IStats, IUser, ITimer } from '../types/webapp';
import Table from '../components/TestsTable';

interface ILabelData {
  labels: string[];
  datasets: any;
}

interface IProps {}
interface IState {
  statsData: IStats[] | null;
  firstLoad: boolean;
  lineData: ILabelData | null;
  lastTestDateTime: Date | null;
  lastTestTimer: ITimer | null;
}

interface IPropsState {
  user: IUser | null;
}
interface IPropsActions {}

type Props = IProps & IPropsState;
const data = {
  labels: ['Red', 'Blue'],
  datasets: [
    {
      data: [300, 50],
      backgroundColor: ['#FF6384', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#FFCE56']
    }
  ]
};
class Stats extends PureComponent<Props, IState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      statsData: null,
      firstLoad: true,
      lineData: null,
      lastTestDateTime: null,
      lastTestTimer: null
    };
  }

  componentDidMount() {
    this.getStatistics();
  }

  componentDidUpdate() {
    if (this.state.firstLoad) {
      this.getStatistics();
    }
  }

  getStatistics = () => {
    const token = getAuthTokenFromSession();
    if (token) {
      if (this.props.user)
        fetch(`http://localhost:3000/stats/${this.props.user.id}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        })
          .then(res => res.json())
          .then((data: IStats[]) => {
            data = data.filter(da => da.end_date_time);
            this.setState({ statsData: data, firstLoad: false });
            this.computeStatistics(data);
            this.setState({
              lastTestDateTime: new Date(data.reverse()[0].start_date_time)
            });
          });
    }
  };

  computeStatistics = (datas: IStats[]) => {
    let arrOfCorrectAnswers: number[] = [];
    let arrOfBadAnswers: number[] = [];
    let arrOfIds: string[] = [];
    let i = 0;
    if (this.state.statsData) {
      datas.map(data => {
        arrOfCorrectAnswers.push(
          data.addition_correct_answers +
            data.division_correct_answers +
            data.multyplying_correct_answers +
            data.substraction_correct_answers
        );
        arrOfBadAnswers.push(
          data.addition_bad_answers +
            data.division_bad_answers +
            data.multyplying_bad_answers +
            data.substraction_bad_answers
        );
        i++;
        //arrOfIds.push(data.id.toString());
        arrOfIds.push(i.toString());
      });
    }
    console.log('arr', arrOfIds);
    let dataForPie = datas.filter(
      data => data.id.toString() === arrOfIds.slice(-1)[0]
    );
    this.setState({
      lineData: {
        labels: arrOfIds,
        datasets: [
          {
            label: 'Správne odpovede',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(58,246,223,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#FE4A349',
            pointBackgroundColor: 'rgba(58,246,223,1)',
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'rgba(58,246,223,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: arrOfCorrectAnswers
          },
          {
            label: 'Nesprávne odpovede',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(254,74,73,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#FE4A349',
            pointBackgroundColor: 'rgba(254,74,73,1)',
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'rgba(254,74,73,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: arrOfBadAnswers
          }
        ]
      }
    });
  };

  testing = () => {
    if (this.state.lastTestDateTime) {
      var date = new Date(this.state.lastTestDateTime);

      console.log(date, date.getMonth() + 1);
    }
  };

  getDurationBetweenTwoDates = (start: Date, end: Date): ITimer => {
    var delta = Math.abs(+end - +start) / 1000;
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    var seconds = Math.round(delta % 60);
    return { days, hours, minutes, seconds };
  };

  render() {
    return (
      <div className="stats-page">
        <div className="stats-page__header-stats">
          {this.state.lastTestDateTime !== null && (
            <LastTestTimer
              getDurationBetweenTwoDates={this.getDurationBetweenTwoDates}
              lastTestDateTime={this.state.lastTestDateTime}
            />
          )}
          {this.state.lineData !== null && (
            <div className="line-chart">
              <div className="line-chart-stats">
                <div className="stats-box">
                  <h2>Vývoj odpovedí</h2>
                  <Line width={700} height={400} data={this.state.lineData} />
                </div>
              </div>
            </div>
          )}
        </div>

        <Table
          getDurationBetweenTwoDates={this.getDurationBetweenTwoDates}
          headValues={[
            'id',
            'addition T',
            'addition F',
            'division T',
            'division F',
            'multyplying T',
            'multyplying F',
            'subst T',
            'subst F',
            'Príklady'
          ]}
          stats={this.state.statsData}
        />
      </div>
    );
  }
}

const mapStateToProps = (
  state: IStateRedux,
  ownnProps: IProps
): IPropsState => ({
  user: state.stateReducer.user
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownnProps: IProps
): IPropsActions => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
