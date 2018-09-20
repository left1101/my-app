import { combineReducers } from 'redux';
import * as ActionTypes from '../const/ActionTypes';
// 曲库整体状态
const songBookState = (state = {
  selectView: 'mySongView'
}, action) => {
  switch (action.type) {
    case `${ActionTypes.CHANGE_SELECTVIEW}`: {
      const newState = { ...state };
      newState.selectView = action.data;
      return newState;
    }
    default:
      return state;
  }
};
// 我的音乐状态
// 0:都不生效 1：只有删除生效 2:只有播放生效 3：重命名不生效 4：都生效
const mySongState = (state = {
  mySonglist: [],
  recommendSonglist: [1],
  mode: 'radio',
  selectList: [],
  radioSelect: 1,
  toolsStatus: 0,
  tips: '',
  handleSongView: '',
  dialogType: 'HIDE_DIALOG'
}, action) => {
  switch (action.type) {
    // 初始化数据
    case `${ActionTypes.FETCH_MY_SONGLSIT}_REQ`: {
      const newState = { ...state };
      newState.mySonglist = [];
      return newState;
    }
    case `${ActionTypes.FETCH_RECOMMEND_SONGLSIT}_REQ`: {
      const newState = { ...state };
      newState.recommendSonglist = [1];
      return newState;
    }
    // 拉取数据
    case `${ActionTypes.FETCH_MY_SONGLSIT}_SUC`: {
      const newState = { ...state };
      newState.mySonglist = [...newState.mySonglist, ...action.data.result];
      return newState;
    }
    case `${ActionTypes.FETCH_RECOMMEND_SONGLSIT}_SUC`: {
      const newState = { ...state };
      newState.recommendSonglist = [...newState.recommendSonglist, ...action.data.result];
      return newState;
    }
    // 切换到多选
    case `${ActionTypes.CHECK_MUL_MODE}`: {
      const newState = { ...state };
      const { recommendSonglist, radioSelect } = newState;
      newState.mode = 'multiple';
      const index = newState.recommendSonglist.indexOf(1);
      newState.recommendSonglist.splice(index, 1);
      if (radioSelect == 1) {
        newState.toolsStatus = 0;
        newState.selectList = [];
        return newState;
      }
      newState.selectList = [radioSelect];
      const flag = recommendSonglist.some(item => item == radioSelect);
      if (flag) {
        newState.toolsStatus = 0;
        return newState;
      }
      newState.toolsStatus = 1;
      return newState;
    }
    // 切换到单选
    case `${ActionTypes.CHECK_RADIO_MODE}`: {
      const newState = { ...state };
      const { recommendSonglist, radioSelect } = newState;
      const { songListEntity } = action.data;
      newState.mode = 'radio';
      if (newState.selectList[0]) { newState.radioSelect = newState.selectList[0]; } else { newState.radioSelect = 1; }
      newState.recommendSonglist.unshift(1);
      const flag = recommendSonglist.some(item => item == newState.radioSelect);
      if (flag) {
        if (newState.radioSelect == 1) {
          newState.toolsStatus = 0;
          return newState;
        }
        newState.toolsStatus = 2;
        return newState;
      }
      if (songListEntity[radioSelect].plp) {
        newState.toolsStatus = 3;
        return newState;
      }
      if (newState.radioSelect == 1) {
        newState.toolsStatus = 0;
        return newState;
      }
      newState.toolsStatus = 4;
      return newState;
    }
    // 控制单选音乐
    case `${ActionTypes.HANDLE_RADIO_SONG}`: {
      const newState = { ...state };
      const { recommendSonglist } = newState;
      const { id, songListEntity } = action.data;
      newState.radioSelect = id;
      if (id == 1) {
        newState.toolsStatus = 0;
        return newState;
      }
      if (recommendSonglist.includes(id)) {
        newState.toolsStatus = 2;
        return newState;
      }
      if (songListEntity[id].plp) {
        newState.toolsStatus = 3;
        return newState;
      }
      newState.toolsStatus = 4;
      return newState;
    }
    // 控制多选音乐
    case `${ActionTypes.HANDLE_MUL_SONG}`: {
      const newState = { ...state };
      const { recommendSonglist } = newState;
      const { id, method } = action.data;
      const selectList = newState.selectList;
      if (method == 'select') {
        if (selectList.length < 5) {
          selectList.push(id);
          newState.tips = '';
        } else {
          newState.tips = '多选最多选择五首';
          return newState;
        }
      }
      if (method == 'unselect') {
        const index = selectList.indexOf(id);
        selectList.splice(index, 1);
      }
      for (let i = 0; i < selectList.length; i++) {
        if (recommendSonglist.includes(selectList[i])) {
          newState.toolsStatus = 0;
          return newState;
        }
      }
      if (!selectList.length) {
        newState.toolsStatus = 0;
        return newState;
      }
      newState.toolsStatus = 1;
      return newState;
    }
    case `${ActionTypes.DELETE_SONG}`: {
      const newState = { ...state };
      const { mode, radioSelect } = newState;
      const { selectList, mySonglist } = newState;
      if (mode == 'radio') {
        const index = mySonglist.indexOf(radioSelect);
        mySonglist.splice(index, 1);
        newState.radioSelect = 1;
        newState.toolsStatus = 0;
        return newState;
      }
      selectList.map(item => {
        mySonglist.splice(mySonglist.indexOf(item), 1);
      });
      newState.selectList = [];
      newState.toolsStatus = 0;
      return newState;
    }
    // 音乐分享
    case `${ActionTypes.SHARE_SONG}`: {
      const newState = { ...state };
      const { radioSelect } = newState;
      const { songListEntity } = action.data;
      alert(`送出${songListEntity[radioSelect].name}音乐`);
      return newState;
    }
    case `${ActionTypes.SHOW_PLAY_SONG_PLAYER}`: {
      const newState = { ...state };
      newState.handleSongView = 'PlaysongView';
      return newState;
    }
    case `${ActionTypes.SHOW_CUT_SONG_PLAYER}`: {
      const newState = { ...state };
      newState.handleSongView = 'CutsongView';
      return newState;
    }
    case `${ActionTypes.HIDE_SONG_PLAYER}`: {
      const newState = { ...state };
      newState.handleSongView = '';
      return newState;
    }
    case `${ActionTypes.CHANGE_TIPS_MESSAGE}`: {
      const newState = { ...state };
      const message = action.data;
      newState.tips = message;
      return newState;
    }
    case `${ActionTypes.SHOW_DELETE_SONG_DIALOG}`: {
      const newState = { ...state };
      newState.dialogType = 'SHOW_DELETE_SONG_DIALOG';
      return newState;
    }
    case `${ActionTypes.SHOW_RENAME_SONG_DIALOG}`: {
      const newState = { ...state };
      newState.dialogType = 'SHOW_RENAME_SONG_DIALOG';
      return newState;
    }
    case `${ActionTypes.HIDE_DIALOG}`: {
      const newState = { ...state };
      newState.dialogType = 'HIDE_DIALOG';
      return newState;
    }
    default:
      return state;
  }
};

export default combineReducers({
  songBookState,
  mySongState
});
