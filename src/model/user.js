export default class User
{
        constructor(parseModel) {
            this.id = parseModel.id;
            this.email = parseModel.get("email");
            this.name = parseModel.get("name");
            this.phone = parseModel.get("phone");
            this.isManager=parseModel.get("isManager"); 
        }
    
}