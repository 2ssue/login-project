import { post } from './utils/fetch.js';
import { Routing } from './router.js';

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if ('로그인' === mutation.addedNodes[0].innerText) onlogin();
  });
});

const config = {
  childList: true,
};

observer.observe(document.querySelector('main'), config);
onlogin();

function onlogin() {
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
  });
}

export { login };
