import { get } from '../utils/fetch.js';
import { SIGN_UP_MESSAGE, Enum } from './enum.js';

const validationState = {
  id: false,
  password: false,
  name: false,
  birth: false,
  gender: false,
  email: false,
  phone: false,
  hobby: false,
  agree: false,
};

async function checkUserIdValidation(e) {
  validationState.id = false;

  const id = e.target.value;
  if (!id) return ['', Enum.INVALID_CLASS];

  const idValidationResult = id.match(/^[a-z0-9-_]{5,20}$/);

  if (idValidationResult && id === idValidationResult[0]) {
    return await checkIdIsDuplicate(id);
  }

  return [SIGN_UP_MESSAGE.ID.INVALID, Enum.INVALID_CLASS];
}

async function checkIdIsDuplicate(id) {
  const response = await get(`enroll/user?id=${id}`);
  const { result } = JSON.parse(response);

  if (!result) {
    return [SIGN_UP_MESSAGE.ID.USED, Enum.INVALID_CLASS];
  }

  validationState.id = true;
  return [SIGN_UP_MESSAGE.ID.VALID, Enum.VALID_CLASS];
}

function checkUserPasswordValidation(e, passwordChecker) {
  validationState.password = false;

  const password = e.target.value;
  if (!password) return ['', Enum.INVALID_CLASS];

  const passwordValidationResult = password.match(
    /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$/,
  );

  if (passwordValidationResult && password === passwordValidationResult[0]) {
    if (passwordChecker) {
      return checkPasswordSame(password, passwordChecker);
    }
    return [SIGN_UP_MESSAGE.PASSWORD.VALID, Enum.VALID_CLASS];
  }

  if (!password.match(/^.{8,16}$/)) {
    return [SIGN_UP_MESSAGE.PASSWORD.INVALID_LENGTH, Enum.INVALID_CLASS];
  }

  if (!password.match(/[A-Z]+/)) {
    return [SIGN_UP_MESSAGE.PASSWORD.INVALID_UPPERCASE, Enum.INVALID_CLASS];
  }

  if (!password.match(/\d+/)) {
    return [SIGN_UP_MESSAGE.PASSWORD.INVALID_NUMBER, Enum.INVALID_CLASS];
  }

  if (!password.match(/[!@#$%^&+=]+/)) {
    return [SIGN_UP_MESSAGE.PASSWORD.INVALID_CHARACTER, Enum.INVALID_CLASS];
  }
}

function checkPasswordSame(password, passwordChecker) {
  if (password === '' || passwordChecker === '') {
    validationState.password = false;
    return ['', Enum.INVALID_CLASS];
  }

  if (password === passwordChecker) {
    validationState.password = true;
    return [SIGN_UP_MESSAGE.PASSWORD.SAME, Enum.VALID_CLASS];
  }

  return [SIGN_UP_MESSAGE.PASSWORD.DIFFERENT, Enum.INVALID_CLASS];
}

export { checkUserIdValidation, checkUserPasswordValidation, checkPasswordSame };
