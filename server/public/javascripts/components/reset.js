import Enum from "./enum.js";

const Reset = {
    resetInput: function(){
        document.getElementById('form-signup').reset();
    },
    resetMessage: function(){
        document.querySelectorAll('#form-signup span').forEach(element => {
            element.innerHTML = Enum.NULL_CONTENT;
        });
    },
    resetAgree: function(){
        const agree = document.querySelector('#agreemodal button');
        agree.disabled = true;
        agree.className = 'gray-button';
    }
}

export default Reset;