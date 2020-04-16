import { get } from './utils/fetch.js';
import { Routing } from './router.js';
import { INDEX_MESSAGE } from './modules/enum.js';

function onMain() {
  get('/user').then((res) => {
    const { result, name } = JSON.parse(res);
    if (result === 'none') {
      Routing.router('/');
      document.cookie = 'loginSession' + INDEX_MESSAGE.EXPIRE;
    } else {
      const textBox = document.querySelector('main > div');
      if (textBox) {
        textBox.innerText = `${name}${INDEX_MESSAGE.GREETING_LOGIN}`;
      }
    }
  });
}

export { onMain };
