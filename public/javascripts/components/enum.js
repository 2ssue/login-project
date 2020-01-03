const Enum = {
  NULL_CONTENT: "",
  VALID_CLASS: "success",
  INVALID_CLASS: "warning"
};

const MESSAGE = {
  ID: {
    NAME: "아이디",
    VALID: "사용가능한 아이디입니다",
    INVALID: "5-20자의 영문 소문자, 숫자와 특수기호(_-)만 사용가능합니다",
    USED: "이미 사용 중인 아이디입니다"
  },
  PASSWORD: {
    NAME: "비밀번호",
    VALID: "안전한 비밀번호입니다",
    SAME: "비밀번호가 일치합니다",
    DIFFERENT: "비밀번호가 일치하지 않습니다",
    INVALID_LENGTH: "8-16자로 입력해주세요",
    INVALID_UPPERCASE: "영문 대문자를 최소 1자 이상 포함해주세요",
    INVALID_NUMBER: "숫자를 최소 1자 이상 포함해주세요",
    INVALID_CHARACTER: "특수문자를 최소 1자 이상 포함해주세요"
  },
  NAME: {
    NAME: "이름"
  },
  BIRTH: {
    NAME: "생년월일",
    EMPTY_YEAR: "몇 년도에 태어나셨나요?",
    EMPTY_MONTH: "몇 월에 태어나셨어요?",
    EMPTY_DATE: "몇 일에 태어나셨어요?",
    INVALID_DATE: "정말인가요?",
    INVALID_YEAR: "살이 확실하신가요? 만 14세-99세만 가입 가능합니다"
  },
  GENDER: {
    NAME: "성별"
  },
  EMAIL: {
    NAME: "이메일",
    INVALID: "이메일 주소를 다시 확인해주세요"
  },
  PHONE: {
    NAME: "휴대전화",
    INVALID: "형식에 맞지 않는 번호입니다"
  },
  HOBBY: {
    NAME: "관심사",
    INVALID: "관심사는 3개 이상 입력해야합니다"
  },
  AGREE: {
    NAME: "약관 동의"
  }
};

export { Enum, MESSAGE };
