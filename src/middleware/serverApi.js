import axios from 'axios';

const API_DOMAIN = 'http://xly-wkop.xiaoniangao.cn';
const queue = [];
const callServerApi = (endpoint, params) => new Promise((resolve, reject) => {
  axios({
    method: 'POST',
    url: API_DOMAIN + endpoint,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params
  }).then(res => {
    if (res.data.ret === 1) {
      return resolve(res);
    }
    return reject((new Error({ errMsg: res.data.errMsg })));
  }).catch(err => reject((new Error({ errMsg: JSON.stringify(err) }))));
});

export default store => next => action => {
  if (!action.SERVER_API) {
    return next(action);
  }

  const {
    type,
    endpoint,
    params,
    normailzerFun,
    needtoken
  } = action.SERVER_API;
  if (typeof type !== 'string') {
    throw new Error('type shoudle be a string');
  }
  if (typeof endpoint !== 'string') {
    throw new Error('endpoint shoudle be a string');
  }
  if (typeof params !== 'object') {
    throw new Error('params shoudle be a object');
  }

  next({
    type: `${type}_REQ`
  });

  const token = store.getState().userInfo.token;
  if (needtoken) {
    if (!token) {
      queue.push(action);
      return false;
    }

    params.token = token;
  }
  return callServerApi(endpoint, params)
    .then(res => {
      const response = typeof (normailzerFun) !== 'undefined' ? normailzerFun(res.data) : res.data.data;
      next({
        type: `${type}_SUC`,
        data: response
      });
      if (type == 'LOGIN') {
        if (queue.length != 0) {
          queue.forEach(item => {
            item.SERVER_API.params.token = res.data.data.token;
            store.dispatch(item);
          });
          queue.length = 0;
        }
      }
    }).catch(err => {
      next({
        type: `${type}_FAI`,
        errMsg: err.errMsg
      });
    });
};
