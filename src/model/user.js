import Parse from 'parse';



//class user
export default class User {
    constructor(parseModel) {

        this.id = parseModel.id;
        this.email = parseModel.get("email");
        this.name = parseModel.get("name");
        this.phone = parseModel.get("phone");
        this.isManager = parseModel.get("isManager");

    }
    // login in parse
    static async login(email, pwd) {

    const parseUser = await Parse.User.logIn(email, pwd);
    const user = new User(parseUser);
    return user;

    }

    static async findUserbyEmail(newUserMail){

        const user   = Parse.Object.extend('User');
        const query = new Parse.Query(user);
        query.equalTo("email", newUserMail);
        const result=await query.find();
        return result;

    }

}

