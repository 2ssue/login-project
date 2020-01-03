(() => {
    const loginButton = document.querySelector('button');
    loginButton.addEventListener('click', (event) => {
        event.preventDefault();
        
        const id = document.getElementById('userid').value;
        const password = document.getElementById('password').value;

        login(id, password);
    })
})();

function login(id, password){
    const bodyContents = {
        userid: id,
        password: password
    };

    fetch('/user', {
        method: 'POST',
        body: JSON.stringify(bodyContents),
        headers: {'Content-Type': 'application/json'}
    }).then((res) => {
        res.text().then((content) => {
            const convert = JSON.parse(content);
            if(convert.result === 'success'){
                //rendering main page
            }else{
                alert('없는 아이디이거나 비밀번호가 틀렸습니다');
                location.href = '/login';
            }
        })
    })
}

