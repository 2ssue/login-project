(() => {
  const loginButton = document.querySelector("button");
  loginButton.addEventListener("click", event => {
    event.preventDefault();

    login();
  });
})();
