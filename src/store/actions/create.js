import axios from '../../AxiosBaseAPI/AxiosBaseAPI';
import { CREATE_QUIZ_QUESTION, RESET_QUIZ } from '../actions/actionTypes';

export const createQuizQuestion = (item) => {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
};

export const resetQuiz = () => {
  return {
    type: RESET_QUIZ,
  }
};

export const finishQuiz = () => {
  return async (dispatch, getState) => {
    await axios.post('quizes.json', getState().create.quiz);
    dispatch(resetQuiz())
  }
};