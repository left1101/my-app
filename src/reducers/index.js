import { combineReducers } from 'redux';
import entities from './entities';
import songBook from './songBook';
import userInfo from './userInfo';

export default combineReducers({
  userInfo,
  songBook,
  entities
});

