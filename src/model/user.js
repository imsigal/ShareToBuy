import Parse from 'parse';

export default  class User
{
        constructor(parseModel) {
           
            this.id = parseModel.id;
            this.email = parseModel.get("email");
            this.name = parseModel.get("name");
            this.phone = parseModel.get("phone");
            this.isManager=parseModel.get("isManager"); 
            
        }

        static login=(email, pwd)=> {    
            // Pass the email and password to logIn function
            Parse.User.logIn(email, pwd)
                .then(parseUser => {
                    // successful login
                    return (new User(parseUser));
                 })
                .catch(error => {
                console.error('Error while logging in user', error);
                return null;
            })
            return null;
        }
    
}