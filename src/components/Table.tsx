import React, { PureComponent } from 'react';
import { IStats } from '../types/webapp';

interface IState {}
interface IProps {
  headValues: string[];
  stats: IStats[] | null;
}

export default class Table extends PureComponent<IProps, IState> {
  render() {
    return (
      <div className="section-table">
        <div className="table__thead">
          {this.props.headValues.length > 0 &&
            this.props.stats &&
            this.props.headValues.map((stat: string) => {
              return <p className="table__thead-p">{stat}</p>;
            })}
        </div>

        <div>
          {this.props.headValues.length > 0 &&
            this.props.stats &&
            this.props.stats.map((stat, i) => {
              return (
                <div className="table__row">
                  <div className="table__tbody">
                    <p className="table__tbody-p">{i} </p>
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
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
