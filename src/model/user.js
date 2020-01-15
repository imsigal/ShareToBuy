export default class User
{
    constructor(userObj)
    {
        this.id=userObj.id;
        this.name=userObj.name;
        this.phone=userObj.phone;
        this.email=userObj.email;
        this.isManager=userObj.isManager;  
       
    }
}