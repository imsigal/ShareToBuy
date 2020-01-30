import Parse from 'parse';

// login in parse
async function login(email, pwd) {

    const parseUser = await Parse.User.logIn(email, pwd);
    const user = new User(parseUser);
    return user;

}

//class user
class User {
    constructor(parseModel) {

        this.id = parseModel.id;
        this.email = parseModel.get("email");
        this.name = parseModel.get("name");
        this.phone = parseModel.get("phone");
        this.isManager = parseModel.get("isManager");

    }

}

export default {login};