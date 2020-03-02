export const DOMEN = 'http://localhost:8001';

export const GET_HEADERS = {
  credentials: 'include',
  mode: 'cors',
  redirect: 'follow',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': DOMEN,
  },
};
export const POST_HEADERS = {
  credentials: 'include',
  mode: 'cors',
  redirect: 'follow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': DOMEN,
  },
};

export const PUT_HEADERS = {
  credentials: 'include',
  mode: 'cors',
  redirect: 'follow',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': DOMEN,
  },
};

export const get = (url, headers = {}) => (
  new Promise((resolve, reject) => {
    fetch(DOMEN + url, {
      ...GET_HEADERS,
      ...headers,
    }).then(resolve).catch(reject);
  },
  )
);

export const post = (url, body, headers = {}) => (
  new Promise((resolve, reject) => {
    fetch(DOMEN + url, {
      ...POST_HEADERS,
      ...headers,
      body: JSON.stringify(body),
    }).then(resolve).catch(reject);
  },
  )
);

export const put = (url, body, headers = {}) => (
  new Promise((resolve, reject) => {
    fetch(DOMEN + url, {
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

export default {
  GET_HEADERS,
  PUT_HEADERS,
  POST_HEADERS,
  get,
  post,
  put,
  login,
};
