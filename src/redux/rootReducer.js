// src/app/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './reducers/AuthReducer';
// import tasksReducer from '../features/tasks/tasksSlice';

const rootReducer = combineReducers({
  auth: authReducer,
//   tasks: tasksReducer,
});

export default rootReducer;
