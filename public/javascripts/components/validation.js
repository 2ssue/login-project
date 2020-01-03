import Enum from "./enum.js";

const Validation = {
    id: false,
    password: false,
    name: false,
    birth: false,
    gender: false,
    email: false,
    phone: false,
    hobby: false,
    agree: false,
    enrollEventListener: function(){
        this.checkId();
        this.checkPassword();
        this.checkName();
        this.checkBirth();
        this.checkGender();
        this.checkEmail();
        this.checkPhone();
        this.checkHobby();
    },
    checkId: function(){
        const inputId = document.getElementById("userid");
        const message = inputId.parentNode.lastElementChild;

        inputId.addEventListener('keyup', () => {
            const checkValidation = inputId.value.match(/^[a-z0-9-_]{5,20}$/);
            const ERROR = '5~20자의 영문 소문자, 숫자와 특수기호(_-)만 사용가능합니다';
            const SUCCESS = '사용가능한 아이디입니다';

            if(checkValidation){
                if(inputId.value !== checkValidation[0]){
                    message.innerHTML = ERROR;
                    message.className = Enum.INVALID_CLASS;
                    this.id = false;
                }else{
                    message.innerHTML = SUCCESS;
                    message.className = Enum.VALID_CLASS;
                    this.id = true;
                }
                inputId.value = checkValidation[0];
            }else{
                if(inputId.value === Enum.NULL_CONTENT){
                    message.innerHTML = Enum.NULL_CONTENT;
                    this.id = false;
                }else{
                    message.innerHTML = ERROR;
                    message.className = Enum.INVALID_CLASS;
                    this.id = false;
                }
            }
        });

        inputId.addEventListener('blur', () => {
            if(this.id){
                fetch(`enroll/user?id=${inputId.value}`).then((res) => {
                    res.text().then(content => {
                        if(content === 'true'){
                            message.innerHTML = '사용가능한 아이디입니다';
                            message.className = Enum.VALID_CLASS;
                        }else{
                            message.innerHTML = '이미 사용 중인 아이디입니다';
                            message.className = Enum.INVALID_CLASS;
                            this.id = false;
                        }
                    });
                })
            }
        })
    },
    checkPassword: function(){
        const inputPassword = document.getElementById('password');
        const checkPassword = document.getElementById('re-password');
        const message = inputPassword.parentNode.lastElementChild;
        const checkMessage = checkPassword.parentNode.lastElementChild;

        inputPassword.addEventListener('keyup', () => {
            const value = inputPassword.value;
            const checkValidation = value.match(/^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/);

            const SUCCESS = '안전한 비밀번호입니다';
            
            if(checkValidation){
                message.innerHTML = SUCCESS;
                message.className = Enum.VALID_CLASS;
                if(inputPassword.value !== Enum.NULL_CONTENT && inputPassword.value === checkPassword.value){
                    checkMessage.innerHTML = '비밀번호가 일치합니다';
                    checkMessage.className = Enum.VALID_CLASS;
                    this.password = true;
                }else {
                    checkMessage.innerHTML = '비밀번호가 일치하지 않습니다';
                    checkMessage.className = Enum.INVALID_CLASS;
                    this.password = false;
                }
            }else{
                message.className = Enum.INVALID_CLASS;
                this.password = false;
                if(value === Enum.NULL_CONTENT){
                    message.innerHTML = Enum.NULL_CONTENT;
                }else if(!(value.match(/^.{8,16}$/))){
                    message.innerHTML = '8~16자로 입력해주세요';
                }else if(!(value.match(/[A-Z]+/))){
                    message.innerHTML = '영문 대문자를 최소 1자 이상 포함해주세요'
                }else if(!(value.match(/\d+/))){
                    message.innerHTML = '숫자를 최소 1자 이상 포함해주세요';
                }else if(!(value.match(/[!@#$%^&+=]+/))){
                    message.innerHTML = '특수문자를 최소 1자 이상 포함해주세요';
                } 
                if(inputPassword.value !== Enum.NULL_CONTENT && inputPassword.value === checkPassword.value){
                    checkMessage.innerHTML = '비밀번호가 일치합니다';
                    checkMessage.className = Enum.VALID_CLASS;
                    this.password = true;
                }else {
                    checkMessage.innerHTML = '비밀번호가 일치하지 않습니다';
                    checkMessage.className = Enum.INVALID_CLASS;
                    this.password = false;
                }
            }
        });

        checkPassword.addEventListener('keyup', () => {
            if(checkPassword.value === Enum.NULL_CONTENT){
                checkMessage.innerHTML = Enum.NULL_CONTENT;
            }else if(checkPassword.value !== inputPassword.value){
                checkMessage.innerHTML = '비밀번호 값이 일치하지 않습니다';
                checkMessage.className = Enum.INVALID_CLASS;
                this.password = false;
            }else{
                checkMessage.innerHTML = '비밀번호가 일치합니다';
                checkMessage.className = Enum.VALID_CLASS;
                this.password = true;
            }
        })
    },
    checkName: function(){
        const inputName = document.getElementById('name');
        inputName.addEventListener('keyup', () => {
            if(inputName.value === Enum.NULL_CONTENT){
                this.name = false;
            }else{
                this.name = true;
            }
        })
    },
    checkBirth: function(){
        const inputYear = document.getElementById('year');
        const selectMonth = document.getElementById('month');
        const inputDate = document.getElementById('date');
        const message = document.querySelector('.birth+span');
        const dateRange = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        message.className = Enum.INVALID_CLASS;

        const validateBirth = () => {
            const currentYear = new Date().getFullYear();
            const year = inputYear.value;
            const month = selectMonth.value;
            const date = inputDate.value;
            const gap = currentYear - year;

            if(year === Enum.NULL_CONTENT){
                message.innerHTML = '몇 년도에 태어나셨나요?';
                this.birth = false;
            }else if(gap >= 15 && gap <= 99){
                if(month === Enum.NULL_CONTENT){
                    message.innerHTML = '몇 월에 태어나셨나요?';
                    this.birth = false;
                }else{
                    if(date === Enum.NULL_CONTENT){
                        message.innerHTML = '몇 일에 태어나셨나요?';
                        this.birth = false;
                    }else{
                        if(date > dateRange[month - 1] || date < 1){
                            message.innerHTML = '정말인가요??';
                            this.birth = false;
                        }else{
                            message.innerHTML = Enum.NULL_CONTENT;
                            this.birth = true;
                        }
                    }
                }
            }else{
                message.innerHTML = `${gap}살이 확실하신가요? 만 14세-99세만 가입 가능합니다`;
                this.birth = false;
            }
        }

        inputYear.addEventListener('keyup', () => {
            validateBirth();
        });

        selectMonth.addEventListener('change', () => {
            validateBirth();
        });

        inputDate.addEventListener('keyup', () => {
            validateBirth();
        })
    },
    checkGender: function(){
        const selectGender = document.getElementById('gender');
        selectGender.addEventListener('change', () => {
            if(selectGender.value === Enum.NULL_CONTENT){
                this.gender = false;
            }else{
                this.gender = true;
            }
        })
    },
    checkEmail: function(){
        const inputEmail = document.getElementById('email');
        const message = inputEmail.parentNode.lastElementChild;

        inputEmail.addEventListener('keyup', () => {
            const checkValidation = inputEmail.value.match(/(\w+\.)*\w+@(\w+\.)+[A-Za-z]{2,3}/);
            if(checkValidation){
                message.innerHTML = Enum.NULL_CONTENT;
                this.email = true;
            }else if(inputEmail.value === Enum.NULL_CONTENT){
                message.innerHTML = Enum.NULL_CONTENT;
                this.email = false;
            }else{
                message.className = Enum.INVALID_CLASS;
                message.innerHTML = '이메일 주소를 다시 확인해주세요';
                this.email = false;
            }
        })
    },
    checkPhone: function(){
        const inputPhone = document.getElementById('phone');
        const message = inputPhone.parentNode.lastElementChild;

        inputPhone.addEventListener('keyup', () => {
            const checkValidation = inputPhone.value.match(/^(?=[\d]{10,11})(010[\d]+)$/);
            
            if(checkValidation){
                message.innerHTML = Enum.NULL_CONTENT;
                this.phone = true;
            }else if(inputPhone.value === Enum.NULL_CONTENT){
                message.innerHTML = Enum.NULL_CONTENT;
                this.phone = false;
            }else{
                message.innerHTML = '형식에 맞지 않는 번호입니다';
                message.className = Enum.INVALID_CLASS;
                this.phone = false;
            }
        })
    },
    checkHobby: function(){
        const tagInput = document.getElementById('hobby');
        const tagContainer = document.querySelector('.tag-container');
        const message = document.querySelector('.tag-section+span');
        tagInput.addEventListener('keyup', () => {
            setTimeout(() => {
                if(tagContainer.childElementCount >= 3){
                    this.hobby = true;
                    message.innerHTML = Enum.NULL_CONTENT;
                }else{
                    this.hobby = false;
                    if(tagInput.value === Enum.NULL_CONTENT){
                        message.innerHTML = Enum.NULL_CONTENT;
                    }else{
                        message.innerHTML = '관심사는 3개 이상 입력해야합니다';
                        message.className = Enum.INVALID_CLASS;
                    }
                }
            }, 1);
        })
    },
    checkAgree: function(){
        const agree = document.getElementById('agree');
        this.agree = agree.checked;
    },
    validateResult: function(){
        this.checkAgree();
        if(!this.id) return '아이디';
        else if(!this.password) return '비밀번호';
        else if(!this.name) return '이름';
        else if(!this.birth) return '생년월일';
        else if(!this.gender) return '성별';
        else if(!this.email) return '이메일';
        else if(!this.phone) return '휴대전화';
        else if(!this.hobby) return '관심사';
        else if(!this.agree) return '약관 동의';
        else return '';
    }
}

export default Validation;