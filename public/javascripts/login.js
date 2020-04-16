import { post } from './utils/fetch.js';
import { Routing } from './router.js';
import { INDEX_MESSAGE } from './modules/enum.js';

function onLogin() {
  const loginButton = document.querySelector('button');
  loginButton.addEventListener('click', (event) => {
    event.preventDefault();

    login();
  });
}

function login() {
  const bodyContents = {
    userid: document.getElementById('userid').value,
    password: document.getElementById('password').value,
  };

  post('/user', {
    method: 'POST',
    body: JSON.stringify(bodyContents),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    const result = JSON.parse(res);
    if (result.result === 'success') {
      Routing.router('/main');
    } else {
      alert(INDEX_MESSAGE.INVALID_LOGIN);
    }

    history.pushState({ path: '/' }, '', '/');
  });
}

export { login, onLogin };
