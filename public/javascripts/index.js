const Routing = {
    main: document.querySelector('main'),
    render: function(title, data, footer){
        const stateheader = document.querySelector('header h1');
        const footerList = document.querySelectorAll('nav a');
        
        stateheader.innerHTML = title;
        this.main.innerHTML = data;
        footerList.forEach((element) => {
            element.className = footer.shift();
        })
    },
    routes: {
        '/' : () => {
            Routing.render('메인페이지', '', ['show', 'show', 'unshow']);
        },
        '/login' : function(){
            Routing.get('/views/login.html').then(res => {
                Routing.render('로그인', res, ['unshow', 'show', 'unshow']);
                const script = document.createElement('script');
                script.src = '/javascripts/login.js';
                Routing.main.appendChild(script);
            });
        },
        '/signup' : function(){
            Routing.get('/views/signup.html').then(res => {
                Routing.render('회원가입', res, ['show', 'unshow', 'unshow']);
                const script = document.createElement('script');
                script.type = 'module';
                script.src = '/javascripts/signup.js';
                Routing.main.appendChild(script);
            });
        },
        otherwise(path){
            main.innerHTML = `${path} Not Found`;
        }
    },
    router: function(path){
        (this.routes[path] || this.routes.otherwise)(path);
    },
    get: function(url){
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', url);
            req.send();

            req.onreadystatechange = function(){
                if(req.readyState === XMLHttpRequest.DONE){
                    if(req.status === 200) resolve(req.response);
                    else reject(req.statusText);
                }
            }
        })
    }
}

window.addEventListener('popstate', (e) => {
    Routing.router(e.state === null ? '/' : e.state.path);
});

document.querySelector('footer nav').addEventListener('click', (e) => {
    if(!e.target || e.target.nodeName !== 'A') return;
    e.preventDefault();
    
    const path = e.target.getAttribute('href');
    history.pushState({path}, null, path);
    Routing.router(path);
})

Routing.router(window.location.pathname);