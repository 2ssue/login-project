import { login } from './routing.js';

(() => {
  const loginButton = document.querySelector('button');
  loginButton.addEventListener('click', (event) => {
    event.preventDefault();

    login();
  });
})();
