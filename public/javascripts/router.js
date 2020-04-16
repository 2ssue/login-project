import { get, post } from './utils/fetch.js';
import { INDEX_MESSAGE, SOURCE } from './components/enum.js';

const Routing = {
  main: document.querySelector('main'),
  render(data, footer) {
    const navList = document.querySelectorAll('nav a');

    this.main.innerHTML = data;
    navList.forEach((element) => {
      element.className = footer.shift();
    });
  },
  routes: {
    '/': () => {
      get(SOURCE.MAIN_HTML).then((res) => {
        Routing.render(res, ['show', 'show', 'unshow']);
        document.querySelector('main > div').innerHTML = INDEX_MESSAGE.GREETING_MAIN;
      });
    },
    '/main': async () => {
      return await get(SOURCE.MAIN_HTML).then((res) => {
        history.replaceState({ path: '/' }, null, '/');
        Routing.render(res, ['unshow', 'unshow', 'show']);
        get('/user').then((res) => {
          const result = JSON.parse(res);
          if (result.result === 'none') {
            Routing.router('/');
            document.cookie = 'loginSession' + INDEX_MESSAGE.EXPIRE;
          } else {
            document.querySelector(
              'main > div',
            ).innerHTML = `${result.name}${INDEX_MESSAGE.GREETING_LOGIN}`;
          }
        });
      });
    },
    '/login': function () {
      get(SOURCE.LOGIN_HTML).then((res) => {
        Routing.render(res, ['unshow', 'show', 'unshow']);
      });
    },
    '/signup': function () {
      get(SOURCE.SIGNUP_HTML).then((res) => {
        Routing.render(res, ['show', 'unshow', 'unshow']);
      });
    },
  },
  router(path) {
    return this.routes[path]();
  },
};

export { Routing };
