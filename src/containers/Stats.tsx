import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Line, Pie } from 'react-chartjs-2';
import { Dispatch } from 'redux';
import { IStateRedux } from '../reducers';
import { getAuthTokenFromSession } from '../methods';
import { IStats, IUser } from '../types/webapp';
import Table from '../components/Table';
import undefined from 'firebase/empty-import';

interface ILabelData {
  labels: string[];
  datasets: any;
}

interface IProps {}
interface IState {
  statsData: IStats[] | null;
  firstLoad: boolean;
  lineData: ILabelData | null;
  data1: ILabelData | null;
  data2: ILabelData | null;
  data3: ILabelData | null;
  data4: ILabelData | null;
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
      data1: null,
      data2: null,
      data3: null,
      data4: null
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
            console.log(data);
            this.setState({ statsData: data, firstLoad: false });
            this.computeStatistics(data);
          });
    }
  };

  computeStatistics = (datas: IStats[]) => {
    let arrOfCorrectAnswers: number[] = [];
    let arrOfBadAnswers: number[] = [];
    let arrOfIds: string[] = [];
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
        arrOfIds.push(data.id.toString());
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
      },
      data1: {
        labels: ['Správne', 'Nesprávne'],
        datasets: [
          {
            data: [
              dataForPie[0].addition_correct_answers,
              dataForPie[0].addition_bad_answers
            ],
            backgroundColor: ['#FF6384', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#FFCE56']
          }
        ]
      },
      data2: {
        labels: ['Správne', 'Nesprávne'],
        datasets: [
          {
            data: [
              dataForPie[0].substraction_correct_answers,
              dataForPie[0].substraction_bad_answers
            ],
            backgroundColor: ['#FF6384', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#FFCE56']
          }
        ]
      },
      data3: {
        labels: ['Správne', 'Nesprávne'],
        datasets: [
          {
            data: [
              dataForPie[0].multyplying_correct_answers,
              dataForPie[0].multyplying_bad_answers
            ],
            backgroundColor: ['#FF6384', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#FFCE56']
          }
        ]
      },
      data4: {
        labels: ['Správne', 'Nesprávne'],
        datasets: [
          {
            data: [
              dataForPie[0].division_correct_answers,
              dataForPie[0].division_bad_answers
            ],
            backgroundColor: ['#FF6384', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#FFCE56']
          }
        ]
      }
    });
  };

  computePieData = (id: string, idOfPie: number) => {
    console.log(id, idOfPie);
    if (this.state.statsData !== null) {
      var datas = this.state.statsData.filter(
        data => data.id.toString() === id
      );
      console.log('datas', datas);

      switch (idOfPie) {
        case 1:
          this.setState({
            data1: {
              labels: ['Správne', 'Nesprávne'],
              datasets: [
                {
                  data: [
                    datas[0].addition_correct_answers,
                    datas[0].addition_bad_answers
                  ],
                  backgroundColor: ['#FF6384', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#FFCE56']
                }
              ]
            }
          });
          return;
        case 2:
          this.setState({
            data2: {
              labels: ['Správne', 'Nesprávne'],
              datasets: [
                {
                  data: [
                    datas[0].substraction_correct_answers,
                    datas[0].substraction_bad_answers
                  ],
                  backgroundColor: ['#FF6384', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#FFCE56']
                }
              ]
            }
          });
          return;
        case 3:
          this.setState({
            data3: {
              labels: ['Správne', 'Nesprávne'],
              datasets: [
                {
                  data: [
                    datas[0].multyplying_correct_answers,
                    datas[0].multyplying_bad_answers
                  ],
                  backgroundColor: ['#FF6384', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#FFCE56']
                }
              ]
            }
          });
          return;
        case 4:
          this.setState({
            data4: {
              labels: ['Správne', 'Nesprávne'],
              datasets: [
                {
                  data: [
                    datas[0].division_correct_answers,
                    datas[0].division_bad_answers
                  ],
                  backgroundColor: ['#FF6384', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#FFCE56']
                }
              ]
            }
          });
          return;
        default:
          return 0;
      }
    }
  };

  renderOptions = (id: number, arr: string[]) => {
    return (
      <select
        name="cars"
        onChange={e => this.computePieData(e.target.value, id)}
      >
        {[...arr].reverse().map(data => {
          return <option value={data}>{data}</option>;
        })}
      </select>
    );
  };

  a = (id: number, event: any) => {
    if (this.state.statsData !== null)
      console.log(
        'id',
        id,
        this.state.statsData.filter(
          data => data.id.toString() === event.target.value
        )
      );
    console.log('select', event.target.value);
  };

  render() {
    return (
      <div className="stats-page">
        <Table
          headValues={[
            'id',
            'addition T',
            'addition F',
            'division T',
            'division F',
            'multyplying T',
            'multyplying F',
            'subst T',
            'subst F'
          ]}
          stats={this.state.statsData}
        />
        {this.state.lineData !== null && (
          <div className="line-chart-stats">
            <div className="stats-box">
              <h2>Vývoj odpovedí</h2>
              <Line width={700} height={400} data={this.state.lineData} />
            </div>
          </div>
        )}
        <div className="pies-chart-stats">
          <div className="stats-box">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2>Sčítanie</h2>
              {this.state.lineData !== null &&
                this.renderOptions(1, this.state.lineData.labels)}
            </div>

            {this.state.data4 !== null && (
              <Pie width={350} height={400} data={this.state.data1} />
            )}
          </div>
          <div className="stats-box">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2>Odčítanie</h2>
              {this.state.lineData !== null &&
                this.renderOptions(2, this.state.lineData.labels)}
            </div>

            {this.state.data4 !== null && (
              <Pie width={350} height={400} data={this.state.data2} />
            )}
          </div>
          <div className="stats-box">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2>Násobenie</h2>
              {this.state.lineData !== null &&
                this.renderOptions(3, this.state.lineData.labels)}
            </div>

            {this.state.data4 !== null && (
              <Pie width={350} height={400} data={this.state.data3} />
            )}
          </div>
          <div className="stats-box">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2>Delenie</h2>
              {this.state.lineData !== null &&
                this.renderOptions(4, this.state.lineData.labels)}
            </div>
            {this.state.data4 !== null && (
              <Pie width={350} height={400} data={this.state.data4} />
            )}
          </div>
        </div>
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
