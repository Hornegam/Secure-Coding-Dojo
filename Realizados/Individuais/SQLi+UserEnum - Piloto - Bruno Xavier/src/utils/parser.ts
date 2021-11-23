export class Parser {
    public IsvalidCredit(value){
        if(value){
            value = value.replace(/\D/g,"");
            value = value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/g,"$4");
            return value;
        }
    }
}