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
}
