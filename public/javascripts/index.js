const MESSAGE = {
  GREETING_MAIN: "반가워요 부스트캠퍼🐣!<br> 로그인 또는 회원가입을 해주세요",
  GREETING_LOGIN: "님 반갑습니다",
  EXPIRE: "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;",
  LOGOUT: "정상적으로 로그아웃 되었습니다",
  INVALID_LOGIN: "없는 아이디거나 비밀번호가 틀렸습니다"
};

const SOURCE = {
  LOGIN_JS: "/javascripts/login.js",
  SIGNUP_JS: "/javascripts/signup.js",
  LOGIN_HTML: "/views/login.html",
  MAIN_HTML: "/views/main.html",
  SIGNUP_HTML: "/views/signup.html"
};

const Routing = {
  main: document.querySelector("main"),
  render(data, footer) {
    const navList = document.querySelectorAll("nav a");

    this.main.innerHTML = data;
    navList.forEach(element => {
      element.className = footer.shift();
    });
  },
  routes: {
    "/": () => {
      get(SOURCE.MAIN_HTML).then(res => {
        Routing.render(res, ["show", "show", "unshow"]);
        document.querySelector("main > div").innerHTML = MESSAGE.GREETING_MAIN;
      });
    },
    "/main": async () => {
      return await get(SOURCE.MAIN_HTML).then(res => {
        history.replaceState({ path: "/" }, null, "/");
        Routing.render(res, ["unshow", "unshow", "show"]);
        routing();
      });
    },
    "/login": function() {
      get(SOURCE.LOGIN_HTML).then(res => {
        Routing.render(res, ["unshow", "show", "unshow"]);
        const script = document.createElement("script");
        script.src = SOURCE.LOGIN_JS;
        Routing.main.appendChild(script);
      });
    },
    "/signup": function() {
      get(SOURCE.SIGNUP_HTML).then(res => {
        Routing.render(res, ["show", "unshow", "unshow"]);
        const script = document.createElement("script");
        script.type = "module";
        script.src = SOURCE.SIGNUP_JS;
        Routing.main.appendChild(script);
      });
    }
  },
  router(path) {
    return this.routes[path]();
  }
};

function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => {
      if (res.status === 200) {
        res.text().then(res => {
          resolve(res);
        });
      } else reject(res.statusText);
    });
  });
}

function post(url, postData) {
  return new Promise((resolve, reject) => {
    fetch(url, postData).then(res => {
      if (res.status === 200) {
        res.text().then(res => {
          resolve(res);
        });
      } else reject(res.statusText);
    });
  });
}

window.addEventListener("popstate", e => {
  if (isCookieExist()) {
    Routing.router("/main");
  } else {
    Routing.router(e.state === null ? "/" : e.state.path);
  }
});

document.querySelector("header nav").addEventListener("click", e => {
  if (!e.target || e.target.nodeName !== "A") return;
  e.preventDefault();

  const path = e.target.getAttribute("href");
  history.pushState({ path }, null, path);
  Routing.router(path);
});

document.getElementById("link-logout").addEventListener("click", e => {
  if (!e.target || e.target.nodeName !== "A") return;
  e.preventDefault();

  get("/user/expire").then(res => {
    const result = JSON.parse(res);
    if (result.result === "success") {
      document.cookie = "loginSession" + MESSAGE.EXPIRE;
      alert(MESSAGE.LOGOUT);
    }
  });
});

function login() {
  const bodyContents = {
    userid: document.getElementById("userid").value,
    password: document.getElementById("password").value
  };

  post("/user", {
    method: "POST",
    body: JSON.stringify(bodyContents),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    const result = JSON.parse(res);
    if (result.result === "success") {
      Routing.router("/main");
    } else {
      alert(MESSAGE.INVALID_LOGIN);
    }
  });
}

function isCookieExist() {
  if (document.cookie) {
    return true;
  } else {
    return false;
  }
}

function routing() {
  get("/user").then(res => {
    const result = JSON.parse(res);
    if (result.result === "none") {
      Routing.router("/");
      document.cookie = "loginSession" + MESSAGE.EXPIRE;
    } else {
      document.querySelector(
        "main > div"
      ).innerHTML = `${result.name}${MESSAGE.GREETING_LOGIN}`;
    }
  });
}

if (isCookieExist()) {
  Routing.router("/main");
} else {
  Routing.router(window.location.pathname);
}
