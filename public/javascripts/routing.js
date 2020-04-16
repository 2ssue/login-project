import { get } from './utils/fetch.js';
import { INDEX_MESSAGE } from './modules/enum.js';
import { Routing } from './router.js';
import { onSignUp } from './signup.js';
import { onLogin } from './login.js';
import { onMain } from './main.js';
import { parseCookies } from './utils/utils.js';

if (checkLoginSession() && window.location.pathname === '/') {
  Routing.router('/main');
  onMain();
} else {
  Routing.router(window.location.pathname);
}

window.addEventListener('popstate', changeHistory);

document.querySelector('header nav').addEventListener('click', (e) => {
  if (!checkClickLink(e)) return;
  e.preventDefault();

  if (e.target.id === 'link-logout') {
    logout();
  }

  pushHistory(e);
});

const observer = new MutationObserver((mutations) => {
  const [mainContent] = [...mutations];
  const [headerNode] = [...mainContent.addedNodes];

  switch (headerNode.innerText) {
    case '회원가입':
      onSignUp();
      break;
    case '로그인':
      onLogin();
      break;
    case '':
      onMain();
      break;
  }
});

const config = {
  childList: true,
};

observer.observe(document.querySelector('main'), config);

function logout() {
  get('/user/expire').then((res) => {
    const result = JSON.parse(res);
    if (result.result === 'success') {
      document.cookie = 'loginSession' + INDEX_MESSAGE.EXPIRE;
      alert(INDEX_MESSAGE.LOGOUT);
    }
  });
}

function checkClickLink(e) {
  if (!e.target || e.target.nodeName !== 'A') return false;
  return true;
}

function changeHistory(e) {
  const { state } = e;

  if (!state) {
    if (checkLoginSession()) {
      Routing.router('/main');
      return;
    }
    Routing.router('/');
    return;
  }

  if (state.path === '/' && checkLoginSession()) {
    Routing.router('/main');
    return;
  }

  Routing.router(state.path);
}

function pushHistory(e) {
  const path = e.target.getAttribute('href');
  history.pushState({ path }, '', path);
  Routing.router(path);
}

function checkLoginSession() {
  const cookies = parseCookies(document.cookie);
  return cookies.loginSession ? true : false;
}
