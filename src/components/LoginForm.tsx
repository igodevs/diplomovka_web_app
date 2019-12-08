import React, { Component, InputHTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import history from '../history';
import { saveAuthTokenInSession } from '../methods';
import $ from 'jquery';
import {
  emailchanged,
  passwordChanged,
  setQuestionNumber,
  setOperation,
  INew,
  ISetOperation,
  IEmailChanged,
  IPasswordChanged,
  ILoginUser,
  loginUserSuccess
} from '../actions';
import { IStateRedux } from '../reducers';
import { IUser } from '../types/webapp';

interface IProps {}

interface IState {
  shapeStyle: object;

  loginEmail: string;
  loginPassword: string;
  registerEmail: string;
  registerPassword: string;
  registerName: string;
}
interface IPropsReceived {
  email: string;
  password: string;
}

interface IPropsRedux {
  emailChanged: (text: string) => IEmailChanged;
  passwordChanged: (text: string) => IPasswordChanged;
  loginUser: (user: IUser) => void;
}

type Props = IPropsRedux & IPropsReceived & IProps;

class LoginForm extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      shapeStyle: {},
      loginEmail: '',
      loginPassword: '',
      registerEmail: '',
      registerPassword: '',
      registerName: ''
    };
  }

  componentDidMount() {
    $(function() {
      $('.input input')
        .focus(function() {
          $(this)
            .parent('.input')
            .each(function() {
              $('label', this).css({
                'line-height': '18px',
                'font-size': '18px',
                'font-weight': '100',
                top: '0px'
              });
              $('.spin', this).css({
                width: '100%'
              });
            });
        })
        .blur(function() {
          $('.spin').css({
            width: '0px'
          });
          if ($(this).val() === '') {
            $(this)
              .parent('.input')
              .each(function() {
                $('label', this).css({
                  'line-height': '60px',
                  'font-size': '24px',
                  'font-weight': '300',
                  top: '10px'
                });
              });
          }
        });

      $('.button').click(function(e) {
        var offset = $(this).offset();
        if (offset !== undefined) {
          var pX = e.pageX,
            pY = e.pageY,
            oX = offset.left,
            oY = offset.top;

          $(this).append(
            '<span class="click-efect x-' +
              oX +
              ' y-' +
              oY +
              '" style="margin-left:' +
              (pX - oX) +
              'px;margin-top:' +
              (pY - oY) +
              'px;"></span>'
          );
          $('.x-' + oX + '.y-' + oY + '').animate(
            {
              width: '500px',
              height: '500px',
              top: '-250px',
              left: '-250px'
            },
            600
          );
          $('button', this).addClass('active');
        }
      });

      $('.alt-2').click(function() {
        if (!$(this).hasClass('material-button')) {
          $('.shape').css({
            width: '100%',
            height: '100%',
            transform: 'rotate(0deg)'
          });

          setTimeout(function() {
            $('.overbox').css({
              overflow: 'initial'
            });
          }, 600);

          $(this).animate(
            {
              width: '140px',
              height: '140px'
            },
            500,
            function() {
              $('.box').removeClass('back');

              $(this).removeClass('active');
            }
          );

          $('.overbox .title').fadeOut(300);
          $('.overbox .input').fadeOut(300);
          $('.overbox .button').fadeOut(300);

          $('.alt-2').addClass('material-buton');
        }
      });

      $('.material-button').click(function() {
        if ($(this).hasClass('material-button')) {
          setTimeout(function() {
            $('.overbox').css({
              overflow: 'hidden'
            });
            $('.box').addClass('back');
          }, 200);
          $(this)
            .addClass('active')
            .animate({
              width: '700px',
              height: '700px'
            });

          setTimeout(function() {
            $('.shape').css({
              width: '50%',
              height: '50%',
              transform: 'rotate(45deg)'
            });

            $('.overbox .title').fadeIn(300);
            $('.overbox .input').fadeIn(300);
            $('.overbox .button').fadeIn(300);
          }, 700);

          $(this).removeClass('material-button');
        }

        if ($('.alt-2').hasClass('material-buton')) {
          $('.alt-2').removeClass('material-buton');
          $('.alt-2').addClass('material-button');
        }
      });
    });
  }

  shape = () => {
    this.setState({
      shapeStyle: { width: '100%', height: '100%', transform: 'rotate(0deg)' }
    });
  };

  loginPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ loginPassword: event.target.value });
  };

  loginEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('ev', event.target.value);
    this.setState({ loginEmail: event.target.value });
  };

  regPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ registerPassword: event.target.value });
  };
  regNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ registerName: event.target.value });
  };
  regEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ registerEmail: event.target.value });
  };

  loginUser = (): void => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.loginEmail,
        password: this.state.loginPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.success) {
          saveAuthTokenInSession(data.token);
          fetch(`http://localhost:3000/profile/${data.userId}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              Authorization: data.token
            }
          })
            .then(response => response.json())
            .then((user: IUser) => {
              if (user && user.email) {
                this.props.loginUser(user);
                history.push('/');
              }
            })
            .catch(console.log);
        }
      })
      .catch(console.log);
  };

  registerUser = (): void => {
    console.log(
      this.state.registerEmail,
      this.state.registerName,
      this.state.registerPassword
    );
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.registerEmail,
        name: this.state.registerName,
        password: this.state.registerPassword
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          saveAuthTokenInSession(data.token);
          fetch(`http://localhost:3000/profile/${data.userId}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              Authorization: data.token
            }
          })
            .then(response => response.json())
            .then((user: IUser) => {
              if (user && user.email) {
                this.props.loginUser(user);
                history.push('/');
              }
            })
            .catch(console.log);
        }
      });
  };

  render() {
    return (
      <div className="materialContainer">
        <div className="box">
          <div className="title">PRIHLÁSENIE</div>

          <div className="input">
            <label htmlFor="name">E-mail</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={event => this.loginEmailChange(event)}
            />
            <span className="spin"></span>
          </div>

          <div className="input">
            <label htmlFor="pass">Heslo</label>
            <input
              type="password"
              name="pass"
              id="pass"
              onChange={event => this.loginPasswordChange(event)}
            />
            <span className="spin"></span>
          </div>

          <div className="button login">
            <button onClick={this.loginUser}>
              <span>PRIHLÁSIŤ</span> <i className="fa fa-check"></i>
            </button>
          </div>

          <p className="pass-forgot">Zabudli ste heslo?</p>
        </div>

        <div className="overbox">
          <div className="material-button alt-2" onClick={this.shape}>
            <span className="shape" style={this.state.shapeStyle}></span>
          </div>
          <div className="title">REGISTRÁCIA</div>
          <div className="input">
            <label htmlFor="regname">E-mail</label>
            <input
              type="text"
              name="regname"
              id="regname"
              onChange={event => this.regEmailChange(event)}
            ></input>
            <span className="spin"></span>
          </div>
          <div className="input">
            <label htmlFor="username">Meno</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={event => this.regNameChange(event)}
            ></input>
            <span className="spin"></span>
          </div>
          <div className="input">
            <label htmlFor="regpass">Heslo</label>
            <input
              type="password"
              name="regpass"
              id="regpass"
              onChange={event => this.regPasswordChange(event)}
            />
            <span className="spin"></span>
          </div>
          <div className="checkboxPassword">
            <input type="checkbox" />
            <p>Zobraziť heslo</p>
          </div>

          {/* <div className="input">
            <label htmlFor="reregpass">Znova heslo</label>
            <input type="password" name="reregpass" id="reregpass" />
            <span className="spin"></span>
          </div> */}
          <div className="button">
            <button onClick={this.registerUser}>
              <span>REGISTROVAŤ</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  state: IStateRedux,
  ownProps: IProps
): IPropsReceived => {
  return {
    password: state.stateReducer.password,
    email: state.stateReducer.email
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IProps
): IPropsRedux => {
  return {
    emailChanged: (text: string) => dispatch(emailchanged(text)),
    passwordChanged: (text: string) => dispatch(passwordChanged(text)),
    loginUser: (user: IUser) => dispatch(loginUserSuccess(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
