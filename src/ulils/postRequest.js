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


export const postRequest = (url, body, headers = {}) => (
  new Promise((resolve, reject) => {
    fetch('http://91.210.170.6:8000' + url, {
      ...POST_HEADERS,
      ...headers,
      body: JSON.stringify(body),
    }).then(resolve).catch(reject);
  },
  )
);

export const putRequest = (url, body, headers = {}) => (
  new Promise((resolve, reject) => {
    fetch('http://91.210.170.6:8000' + url, {
      ...PUT_HEADERS,
      ...headers,
      body: JSON.stringify(body),
    }).then(resolve).catch(reject);
  },
  )
);


export const requestSignIn = (login, password) => (
  new Promise((resolve, reject) => {
    postRequest('/api/users/login', {
      login, password,
    }).then((r) => r.json())
        .then((r) => {
          resolve(r);
        })
        .catch(reject);
  },
  )
);
