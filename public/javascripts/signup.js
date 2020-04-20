import {
  checkUserIdValidation,
  checkUserPasswordValidation,
  checkPasswordSame,
} from './modules/validation.js';
import { $ } from './utils/utils.js';

function onSignUp() {
  const input = getInputElements();
  const noticeMessage = getInputNoticeMessageElements(input);

  input.userId.addEventListener('blur', async (e) => {
    const [message, className] = await checkUserIdValidation(e);

    noticeMessage.userId.innerHTML = message;
    noticeMessage.userId.className = className;
  });

  input.password.addEventListener('keyup', (e) => {
    const [message, className] = checkUserPasswordValidation(e, input.passwordChecker.value);

    noticeMessage.password.innerHTML = message;
    noticeMessage.password.className = className;
  });

  input.passwordChecker.addEventListener('keyup', (e) => {
    const [message, className] = checkPasswordSame(input.password.value, e.target.value);

    noticeMessage.password.innerHTML = message;
    noticeMessage.password.className = className;
  });
}

function getInputElements() {
  return {
    userId: document.getElementById('userid'),
    password: document.getElementById('password'),
    passwordChecker: document.getElementById('re-password'),
    name: document.getElementById('name'),
    birth: {
      year: document.getElementById('year'),
      month: document.getElementById('month'),
      date: document.getElementById('date'),
    },
    gender: document.getElementById('gender'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    hobby: document.getElementById('hobby'),
    agree: document.getElementById('agree'),
  };
}

function getInputNoticeMessageElements(inputs) {
  return {
    userId: inputs.userId.parentNode.lastElementChild,
    password: inputs.password.parentNode.lastElementChild,
    passwordChecker: inputs.passwordChecker.parentNode.lastElementChild,
    birth: $('.birth+span'),
    email: inputs.email.parentNode.lastElementChild,
    phone: inputs.phone.parentNode.lastElementChild,
    hobby: $('.tag-section+span'),
  };
}

export { onSignUp };
