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

export { checkUserIdValidation };
