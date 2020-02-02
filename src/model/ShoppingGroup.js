
import Parse from 'parse';
export default class ShoppingGroup{

    constructor(parseModel) {
           
        
        this.lstUsers = parseModel.get("lstUsers");
        this.lstShoppingLists = parseModel.get("lstShoppingLists");
        this.lstCategories=parseModel.get("lstCategories"); 
        this.groupName = parseModel.get("GroupName");
        this.id = parseModel.id;
        
        
    }

    // creates new group in the db
    static async CreateNewGroup(newGroupName,users)
    {

           // db connection    ( should be handles saparately)
           const ParseShoppingGroup = Parse.Object.extend('ShoppingGroup');
           const myNewShoppingGroup = new ParseShoppingGroup(); 
           myNewShoppingGroup.set('GroupName', newGroupName);
           myNewShoppingGroup.set('lstUsers', users);
           myNewShoppingGroup.set('lstShoppingLists', []);   //  create empty list
           myNewShoppingGroup.set('lstCategories', []);       // create empty list
           const response = await myNewShoppingGroup.save();
            return response;
           
    }

    
        
       

         
    
}