import { normalize } from 'normalizr';
import * as ActionTypes from '../const/ActionTypes';
import * as schemes from '../schema';

// 获取用户信息
export function login(mid) {
  return {
    SERVER_API: {
      type: ActionTypes.LOGIN,
      endpoint: '/login',
      params: {
        mid
      }
    }
  };
}

// 获取我的音乐列表
export function fetchMySonglsit() {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_MY_SONGLSIT,
      endpoint: '/music/my_list',
      params: {
      },
      needtoken: true,
      normailzerFun: response => normalize(response.data.list, schemes.SONGLIST)
    }
  };
}

// 获取推荐的音乐列表
export function fetchRecommendSonglsit() {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_RECOMMEND_SONGLSIT,
      endpoint: '/music/recommend_list',
      params: {
      },
      needtoken: true,
      normailzerFun: response => normalize(response.data.list, schemes.SONGLIST)
    }
  };
}

// 更改视图
export function changeSelectView(data) {
  return {
    type: ActionTypes.CHANGE_SELECTVIEW,
    data
  };
}

// 切换到单选mode
export function checkRadioMode(data) {
  return {
    type: ActionTypes.CHECK_RADIO_MODE,
    data
  };
}

// 切换到多选mode
export function checkMulMode(data) {
  return {
    type: ActionTypes.CHECK_MUL_MODE,
    data
  };
}

// 控制单选音乐
export function handleRadioSong(data) {
  return {
    type: ActionTypes.HANDLE_RADIO_SONG,
    data
  };
}

// 控制多选音乐
export function handleMulSong(data) {
  return {
    type: ActionTypes.HANDLE_MUL_SONG,
    data
  };
}

// 显示删除单选音乐弹窗
export function showDeleteSongDialog(data) {
  return {
    type: ActionTypes.SHOW_DELETE_SONG_DIALOG,
    data
  };
}

// 显示更改音乐名字弹窗
export function showRenameSongDialog(data) {
  return {
    type: ActionTypes.SHOW_RENAME_SONG_DIALOG,
    data
  };
}

// 隐藏弹窗
export function hideDialog(data) {
  return {
    type: ActionTypes.HIDE_DIALOG,
    data
  };
}

//  删除音乐
export function deleteSong(data) {
  return {
    type: ActionTypes.DELETE_SONG,
    data
  };
}

// 更改音乐名字
export function renameSong(data) {
  return {
    type: ActionTypes.RENAME_SONG,
    data
  };
}

// 分享音乐
export function shareSong(data) {
  return {
    type: ActionTypes.SHARE_SONG,
    data
  };
}

// 显示播放音乐View
export function showPlaySongPlayer() {
  return {
    type: ActionTypes.SHOW_PLAY_SONG_PLAYER
  };
}

// 显示剪切音乐View
export function showCutSongPlayer(data) {
  return {
    type: ActionTypes.SHOW_CUT_SONG_PLAYER,
    data
  };
}

// 隐藏操作音乐View
export function hideSongPlayer() {
  return {
    type: ActionTypes.HIDE_SONG_PLAYER
  };
}

// 剪切开头
export function cutSongBegin(data) {
  return {
    type: ActionTypes.CUT_SONG_BEGIN,
    data
  };
}

// 清除剪切
export function cutSongClear(data) {
  return {
    type: ActionTypes.CUT_SONG_CLEAR,
    data
  };
}

// 剪切结尾
export function cutSongEnd(data) {
  return {
    type: ActionTypes.CUT_SONG_END,
    data
  };
}

// 更改tips内容
export function changeTipsMessage(data) {
  return {
    type: ActionTypes.CHANGE_TIPS_MESSAGE,
    data
  };
}

