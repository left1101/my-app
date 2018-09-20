import { combineReducers } from 'redux';
import * as ActionTypes from '../const/ActionTypes';

function songListEntity(state = {
  1: {
    name: '随机音乐',
    id: 1
  }
}, action) {
  switch (action.type) {
    case `${ActionTypes.FETCH_MY_SONGLSIT}_SUC`:
    case `${ActionTypes.FETCH_RECOMMEND_SONGLSIT}_SUC`: {
      let newState = { ...state };
      newState = { ...newState, ...action.data.entities.songList };
      return newState;
    }
    case `${ActionTypes.RENAME_SONG}`: {
      const { val, id } = action.data;
      const newState = { ...state };
      if (val == '') {
        alert('输入有误');
        return newState;
      }
      newState[id].name = `${val}.mp3`;
      return newState;
    }
    case `${ActionTypes.CUT_SONG_BEGIN}`: {
      const { val, id } = action.data;
      const newState = { ...state };
      newState[id].bmt = val;
      return newState;
    }
    case `${ActionTypes.CUT_SONG_END}`: {
      const { val, id } = action.data;
      const newState = { ...state };
      newState[id].emt = val;
      return newState;
    }
    case `${ActionTypes.CUT_SONG_CLEAR}`: {
      const { id } = action.data;
      const newState = { ...state };
      newState[id].bmt = 0;
      newState[id].emt = 0;
      return newState;
    }
    default:
      return state;
  }
}
export default combineReducers({
  songListEntity
});
