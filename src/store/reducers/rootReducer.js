import {combineReducers} from 'redux';
import quizReducer from '../reducers/quiz';
import createQuizReducer from '../reducers/create';
import authReducer from '../reducers/auth';

export default combineReducers({
  quiz: quizReducer,
  create: createQuizReducer,
  auth: authReducer
})