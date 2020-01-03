import { Enum } from "./enum.js";
import { MESSAGE } from "./enum.js";

function setMessage(element, message, className) {
  element.innerHTML = message;
  element.className = className;
}

function resetMessage(element) {
  element.innerHTML = Enum.NULL_CONTENT;
}

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
  enrollEventListener() {
    this.checkIdHandler();
    this.checkPasswordHandler();
    this.checkName();
    this.checkBirth();
    this.checkGender();
    this.checkEmail();
    this.checkPhone();
    this.checkHobby();
  },
  checkIdHandler() {
    const idInput = document.getElementById("userid");
    const message = idInput.parentNode.lastElementChild;

    const validateId = function() {
      if (idInput.value === Enum.NULL_CONTENT) return;

      const checkId = idInput.value.match(/^[a-z0-9-_]{5,20}$/);
      if (checkId !== null && idInput.value === checkId[0]) {
        get(`enroll/user?id=${idInput.value}`).then(res => {
          if (res === "true") {
            setMessage(message, MESSAGE.ID.VALID, Enum.VALID_CLASS);
            this.id = true;
          } else {
            setMessage(message, MESSAGE.ID.USED, Enum.INVALID_CLASS);
            this.id = false;
          }
        });
      } else {
        setMessage(message, MESSAGE.ID.INVALID, Enum.INVALID_CLASS);
        this.id = false;
      }
    };

    idInput.addEventListener("blur", validateId.bind(this));
    idInput.addEventListener("keyup", () => {
      if (Enum.NULL_CONTENT === idInput.value) {
        resetMessage(message);
      }
    });
  },
  checkPasswordHandler() {
    const passwordInput = document.getElementById("password");
    const passwordChecker = document.getElementById("re-password");
    const message = passwordInput.parentNode.lastElementChild;
    const checkMessage = passwordChecker.parentNode.lastElementChild;

    const validatePassword = function() {
      if (passwordInput.value === Enum.NULL_CONTENT) return;

      const checkPassword = passwordInput.value.match(
        /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$/
      );
      if (checkPassword !== null && passwordInput.value === checkPassword[0]) {
        setMessage(message, MESSAGE.PASSWORD.VALID, Enum.VALID_CLASS);
        this.password = true;
      } else {
        let errorMessage = "";
        this.password = false;

        if (!passwordInput.value.match(/^.{8,16}$/)) {
          errorMessage = MESSAGE.PASSWORD.INVALID_LENGTH;
        } else if (!passwordInput.value.match(/[A-Z]+/)) {
          errorMessage = MESSAGE.PASSWORD.INVALID_UPPERCASE;
        } else if (!passwordInput.value.match(/\d+/)) {
          errorMessage = MESSAGE.PASSWORD.INVALID_NUMBER;
        } else if (!passwordInput.value.match(/[!@#$%^&+=]+/)) {
          errorMessage = MESSAGE.PASSWORD.INVALID_CHARACTER;
        }

        setMessage(message, errorMessage, Enum.INVALID_CLASS);
      }
    };

    const checkSamePassword = function() {
      if (passwordInput.value === Enum.NULL_CONTENT) return;
      if (passwordChecker.value === Enum.NULL_CONTENT) return;
      if (passwordInput.value === passwordChecker.value) {
        setMessage(checkMessage, MESSAGE.PASSWORD.SAME, Enum.VALID_CLASS);
        if (message.className === Enum.VALID_CLASS) this.password = true;
      } else {
        setMessage(
          checkMessage,
          MESSAGE.PASSWORD.DIFFERENT,
          Enum.INVALID_CLASS
        );
        this.password = false;
      }
    };

    passwordInput.addEventListener("keyup", validatePassword.bind(this));
    passwordInput.addEventListener("keyup", checkSamePassword.bind(this));
    passwordChecker.addEventListener("keyup", checkSamePassword.bind(this));

    passwordInput.addEventListener("keyup", () => {
      if (Enum.NULL_CONTENT === passwordInput.value) {
        resetMessage(message);
      }
    });

    passwordChecker.addEventListener("keyup", () => {
      if (Enum.NULL_CONTENT === passwordChecker.value) {
        resetMessage(checkMessage);
      }
    });
  },
  checkName() {
    const inputName = document.getElementById("name");
    inputName.addEventListener("keyup", () => {
      if (inputName.value === Enum.NULL_CONTENT) {
        this.name = false;
      } else {
        this.name = true;
      }
    });
  },
  checkBirth() {
    const inputYear = document.getElementById("year");
    const selectMonth = document.getElementById("month");
    const inputDate = document.getElementById("date");
    const message = document.querySelector(".birth+span");
    const dateRange = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    message.className = Enum.INVALID_CLASS;

    const validateBirth = () => {
      const currentYear = new Date().getFullYear();
      const year = inputYear.value;
      const month = selectMonth.value;
      const date = inputDate.value;
      const gap = currentYear - year;

      if (year === Enum.NULL_CONTENT) {
        message.innerHTML = MESSAGE.BIRTH.EMPTY_YEAR;
        this.birth = false;
      } else if (gap >= 15 && gap <= 99) {
        if (month === Enum.NULL_CONTENT) {
          message.innerHTML = MESSAGE.BIRTH.EMPTY_MONTH;
          this.birth = false;
        } else {
          if (date === Enum.NULL_CONTENT) {
            message.innerHTML = MESSAGE.BIRTH.EMPTY_DATE;
            this.birth = false;
          } else {
            if (date > dateRange[month - 1] || date < 1) {
              message.innerHTML = MESSAGE.BIRTH.INVALID_DATE;
              this.birth = false;
            } else {
              message.innerHTML = Enum.NULL_CONTENT;
              this.birth = true;
            }
          }
        }
      } else {
        message.innerHTML = `${gap}${MESSAGE.BIRTH.INVALID_YEAR}`;
        this.birth = false;
      }
    };

    inputYear.addEventListener("keyup", () => {
      validateBirth();
    });

    selectMonth.addEventListener("change", () => {
      validateBirth();
    });

    inputDate.addEventListener("keyup", () => {
      validateBirth();
    });
  },
  checkGender: function() {
    const selectGender = document.getElementById("gender");
    selectGender.addEventListener("change", () => {
      if (selectGender.value === Enum.NULL_CONTENT) {
        this.gender = false;
      } else {
        this.gender = true;
      }
    });
  },
  checkEmail: function() {
    const inputEmail = document.getElementById("email");
    const message = inputEmail.parentNode.lastElementChild;

    inputEmail.addEventListener("keyup", () => {
      const checkValidation = inputEmail.value.match(
        /(\w+\.)*\w+@(\w+\.)+[A-Za-z]{2,3}/
      );
      if (checkValidation) {
        message.innerHTML = Enum.NULL_CONTENT;
        this.email = true;
      } else if (inputEmail.value === Enum.NULL_CONTENT) {
        message.innerHTML = Enum.NULL_CONTENT;
        this.email = false;
      } else {
        message.className = Enum.INVALID_CLASS;
        message.innerHTML = MESSAGE.EMAIL.INVALID;
        this.email = false;
      }
    });
  },
  checkPhone: function() {
    const inputPhone = document.getElementById("phone");
    const message = inputPhone.parentNode.lastElementChild;

    inputPhone.addEventListener("keyup", () => {
      const checkValidation = inputPhone.value.match(
        /^(?=[\d]{10,11})(010[\d]+)$/
      );

      if (checkValidation) {
        message.innerHTML = Enum.NULL_CONTENT;
        this.phone = true;
      } else if (inputPhone.value === Enum.NULL_CONTENT) {
        message.innerHTML = Enum.NULL_CONTENT;
        this.phone = false;
      } else {
        message.innerHTML = MESSAGA.PHONE.INVALID;
        message.className = Enum.INVALID_CLASS;
        this.phone = false;
      }
    });
  },
  checkHobby: function() {
    const tagInput = document.getElementById("hobby");
    const tagContainer = document.querySelector(".tag-container");
    const message = document.querySelector(".tag-section+span");
    tagInput.addEventListener("keyup", () => {
      setTimeout(() => {
        if (tagContainer.childElementCount >= 3) {
          this.hobby = true;
          message.innerHTML = Enum.NULL_CONTENT;
        } else {
          this.hobby = false;
          if (tagInput.value === Enum.NULL_CONTENT) {
            message.innerHTML = Enum.NULL_CONTENT;
          } else {
            message.innerHTML = MESSAGE.HOBBY.INVALID;
            message.className = Enum.INVALID_CLASS;
          }
        }
      }, 1);
    });
  },
  checkAgree: function() {
    const agree = document.getElementById("agree");
    this.agree = agree.checked;
  },
  validateResult: function() {
    this.checkAgree();
    if (!this.id) return MESSAGE.ID.NAME;
    else if (!this.password) return MESSAGE.PASSWORD.NAME;
    else if (!this.name) return MESSAGE.NAME.NAME;
    else if (!this.birth) return MESSAGE.BIRTH.NAME;
    else if (!this.gender) return MESSAGE.GENDER.NAME;
    else if (!this.email) return MESSAGE.EMAIL.NAME;
    else if (!this.phone) return MESSAGE.PHONE.NAME;
    else if (!this.hobby) return MESSAGE.HOBBY.NAME;
    else if (!this.agree) return MESSAGE.AGREE.NAME;
    else return "";
  }
};

export default Validation;
