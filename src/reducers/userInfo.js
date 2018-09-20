import * as ActionTypes from '../const/ActionTypes';

const initialState = {
  mid: 0,
  token: '',
  nick: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.LOGIN}_REQ`: {
      const newState = { ...state };
      newState.nick = '正在加载中...';
      return newState;
    }
    case `${ActionTypes.LOGIN}_SUC`: {
      return action.data;
    }
    case `${ActionTypes.LOGIN}_FAI`: {
      const newState = { ...state };
      newState.nick = '获取数据失败';
      return newState;
    }
    default:
      return state;
  }
};
export default reducer;
