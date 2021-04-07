export default {
    validatePhoneNumber(phone){
        const reg=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/g;

        return reg.test(phone)
    }
}