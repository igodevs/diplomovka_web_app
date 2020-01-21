export interface IUser {
  count_of_tests: number;
  email: string;
  id: number;
  name: string;
}

export interface IStats {
  id: number;
  id_user: 1;
  addition_bad_answers: number;
  addition_correct_answers: number;
  division_bad_answers: number;
  division_correct_answers: number;
  multyplying_bad_answers: number;
  multyplying_correct_answers: number;
  substraction_bad_answers: number;
  substraction_correct_answers: number;
  start_date_time: string;
  end_date_time: string;
}

export interface IQuestionStats {
  id: number;
  id_test: number;
  id_user: number;
  first_number: number;
  second_number: number;
  mark: string;
  answer: number;
  is_correct_answer: boolean;
  date_time: string;
}

export interface IResponse {
  type: string;
  data: any;
}

export interface ITimer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
