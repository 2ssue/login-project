import Reset from './reset.js';
import Validation from './validation.js';
import { post } from '../utils/fetch.js';
import { login } from '../router.js';

const ModalEvent = {
  body: document.querySelector('body'),
  enrollEventListener: function () {
    this.enrollagreeModal();
    this.enrollResetModal();
    this.enrollCheckModal();
  },
  enrollagreeModal: function () {
    const agreeCheckbox = document.getElementById('agree');
    const agreeModal = document.getElementById('agreemodal');
    const close = document.querySelector('#agreemodal .close');
    const agreeButton = document.querySelector('#agreemodal button');
    const textarea = document.querySelector('.modal textarea');

    close.addEventListener('click', () => {
      agreeModal.style.display = 'none';
      this.body.className = 'scrollable';
    });

    agreeCheckbox.addEventListener('click', () => {
      agreeModal.style.display = 'block';
      this.body.className = 'fixedscroll';
      textarea.scrollTop = 0;
      agree.checked = false;
    });

    agreeButton.addEventListener('click', () => {
      agreeCheckbox.checked = true;
      agreeModal.style.display = 'none';
      this.body.className = 'scrollable';
    });

    window.addEventListener('click', (e) => {
      if (e.target === agreeModal) {
        agreeModal.style.display = 'none';
        this.body.className = 'scrollable';
      }
    });

    textarea.addEventListener('scroll', () => {
      if (
        textarea.scrollTop + textarea.clientHeight ===
        textarea.scrollHeight
      ) {
        agreeButton.className = '';
        agreeButton.disabled = false;
      }
    });
  },
  enrollResetModal: function () {
    const resetButton = document.getElementById('reset-button');
    const resetModal = document.getElementById('resetmodal');
    const cancelButton = document.getElementById('cancel-reset');
    const executeReset = document.getElementById('do-reset');

    resetButton.addEventListener('click', () => {
      resetModal.style.display = 'block';
      this.body.className = 'fixedscroll';
    });

    cancelButton.addEventListener('click', () => {
      resetModal.style.display = 'none';
      this.body.className = 'scrollable';
    });

    window.addEventListener('click', (e) => {
      if (e.target === resetModal) {
        resetModal.style.display = 'none';
        this.body.className = 'scrollable';
      }
    });

    executeReset.addEventListener('click', () => {
      Reset.resetInput();
      Reset.resetMessage();
      Reset.resetAgree();
      resetModal.style.display = 'none';
      this.body.className = 'scrollable';
    });
  },
  enrollCheckModal: function () {
    const signupButton = document.getElementById('signup-button');
    const checkModal = document.getElementById('checkmodal');
    const modalContent = document.querySelector('#checkmodal p');
    const confirmButton = document.querySelector('#checkmodal button');

    signupButton.addEventListener('click', () => {
      if (Validation.validateResult()) {
        this.body.className = 'fixedscroll';
        checkModal.style.display = 'block';
        modalContent.innerText = `${Validation.validateResult()}을(를) 확인해주세요`;
      } else {
        this.body.className = 'scrollable';
        const form = document.getElementById('form-signup');
        const tags = document.querySelectorAll('.tag-element');
        let tagContents = [];

        tags.forEach((element) => {
          tagContents.push(element.innerText);
        });

        const formData = new FormData(form);
        formData.append('hobby', tagContents.join(','));

        const jsonObject = {};

        for (const [key, value] of formData.entries()) {
          jsonObject[key] = value;
        }

        post('/enroll', {
          method: 'POST',
          body: JSON.stringify(jsonObject),
          headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
          const result = JSON.parse(res).result;
          if (result === 'success') {
            login();
          } else {
            alert('올바르지 않은 접근입니다. 다시 시도해주세요');
          }
        });
      }
    });

    confirmButton.addEventListener('click', () => {
      checkModal.style.display = 'none';
      this.body.className = 'scrollable';
    });

    window.addEventListener('click', (e) => {
      if (e.target === checkModal) {
        checkModal.style.display = 'none';
        this.body.className = 'scrollable';
      }
    });
  },
};

export default ModalEvent;
