export const DOMAIN = 'https://hahao.ru';//'http://5.23.54.85';
// 'http://localhost:8001';
export const GET_HEADERS = {
  credentials: 'include',
  mode: 'cors',
  redirect: 'follow',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};
export const POST_HEADERS = {
  credentials: 'include',
  mode: 'cors',
  redirect: 'follow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export const DELETE_HEADERS = {
  credentials: 'include',
  mode: 'cors',
  redirect: 'follow',
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export const PUT_HEADERS = {
  credentials: 'include',
  mode: 'cors',
  redirect: 'follow',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export const get = (url, headers = {}) => (
  new Promise((resolve, reject) => {
    fetch(DOMAIN + url, {
      ...GET_HEADERS,
      ...headers,
    }).then(resolve).catch(reject);
  },
  )
);

export const post = (url, body, headers = {}) => (
  new Promise((resolve, reject) => {
    fetch(DOMAIN + url, {
      ...POST_HEADERS,
      ...headers,
      body: JSON.stringify(body),
    }).then(resolve).catch(reject);
  },
  )
);

export const put = (url, body, headers = {}) => (
  new Promise((resolve, reject) => {
    fetch(DOMAIN + url, {
      ...PUT_HEADERS,
      ...headers,
      body: JSON.stringify(body),
    }).then(resolve).catch(reject);
  },
  )
);


export const login = (login, password) => (
  new Promise((resolve, reject) => {
    post('/api/users/login', {
      login, password,
    }).then(resolve)
        .catch(reject);
  },
  )
);
export const DELETE = (url, body, headers = {}) => (
  new Promise((resolve, reject) => {
    fetch(DOMAIN + url, {
      ...DELETE_HEADERS,
      ...headers,
      body: JSON.stringify(body),
    }).then(resolve).catch(reject);
  },
  )
);

export default {
  GET_HEADERS,
  PUT_HEADERS,
  POST_HEADERS,
  get,
  post,
  put,
  DELETE,
  login,
};
