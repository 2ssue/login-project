const RestrictInput = {
    enrollEventListener: function(){
        const inputYear = document.getElementById('year');
        const inputDate = document.getElementById('date');
        const inputPhone = document.getElementById('phone');

        inputYear.addEventListener('keyup', (e) => {
            if(!this.restrictNotNumber(e));
                inputYear.value = inputYear.value.match(/\d+/);
        });
        
        inputDate.addEventListener('keyup', (e) => {
            if(!this.restrictNotNumber(e));
                inputDate.value = inputDate.value.match(/\d+/);
        });

        inputPhone.addEventListener('keyup', (e) => {
            if(!this.restrictNotNumber(e));
            inputPhone.value = inputPhone.value.match(/\d+/);
        })
    },
    restrictNotNumber: function(event){
        if(event.key < 9 && event.key >= 0){
            return;
        }else{
            return false;
        }
    }
}

export default RestrictInput;