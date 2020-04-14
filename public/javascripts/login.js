import { login } from './router.js';

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
