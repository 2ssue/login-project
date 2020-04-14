import RestrictInput from './components/restrict.js';
import ModalEvent from './components/modal.js';
import Validation from './components/validation.js';
import MakeTag from './components/tag.js';

const observer = new MutationObserver(function (mutations) {
  const [mainContent] = [...mutations];
  const [headerNode] = [...mainContent.addedNodes];

  if ('회원가입' === headerNode.innerText) {
    onSignUp();
  }
});

const config = {
  childList: true,
};

observer.observe(document.querySelector('main'), config);

onSignUp();

function onSignUp() {
  Validation.enrollEventListener();
  RestrictInput.enrollEventListener();
  ModalEvent.enrollEventListener();
  MakeTag.enrollEventListener();

  const tagSection = document.querySelector('.tag-section');
  tagSection.addEventListener('click', () => {
    document.getElementById('hobby').focus();
    tagSection.style.outline = 'auto cornflowerblue';
  });

  const hobbyInput = document.getElementById('hobby');
  hobbyInput.addEventListener('focus', () => {
    tagSection.style.outline = 'auto cornflowerblue';
  });

  hobbyInput.addEventListener('blur', () => {
    tagSection.style.outline = 'none';
  });

  window.addEventListener('click', (e) => {
    if (
      e.target !== tagSection &&
      e.target !== document.getElementById('hobby')
    ) {
      tagSection.style.outline = 'none';
    }
  });
}
