import { get } from './utils/fetch.js';
import { INDEX_MESSAGE } from './components/enum.js';
import { Routing } from './router.js';

if (checkCookieExist()) {
  Routing.router('/main');
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
  if (checkCookieExist()) {
    Routing.router('/main');
  } else {
    Routing.router(e.state.path ? e.state.path : '/');
  }
}

function pushHistory(e) {
  const path = e.target.getAttribute('href');
  history.pushState({ path }, null, path);
  Routing.router(path);
}

function checkCookieExist() {
  return document.cookie ? true : false;
}
