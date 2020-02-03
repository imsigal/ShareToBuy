
import Parse from 'parse';
import Category from '../model/Category';

export default class ShoppingGroup{

    constructor(parseModel) {
           
        
        this.lstUsers = parseModel.get("lstUsers");
        this.lstShoppingLists = parseModel.get("lstShoppingLists");
        this.categories=parseModel.get("categories");
        this.groupName = parseModel.get("GroupName");
        this.id = parseModel.id;
       // this.shpingGroupParseModel=parseModel
        
        
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
           const response = await myNewShoppingGroup.save();
            return response;
           
    }

    static async GetGroupByName(theGroupName)
    {
        const ParseShoppingGroup = Parse.Object.extend('ShoppingGroup');
        const query = new Parse.Query(ParseShoppingGroup);
        query.equalTo("GroupName", theGroupName);
        const result=await query.first();   
        return result;        
    }


    static async GetGroupList()
    {
        var currentUser=Parse.User.current();
        const ParseShoppingGroup = Parse.Object.extend('ShoppingGroup');
        const query = new Parse.Query(ParseShoppingGroup);
        query.equalTo("lstUsers", currentUser.id);
        const groupListResults=await query.find();         
        let lstItems=[];
        groupListResults.forEach(
                    item=>lstItems.push(item.get("GroupName"))
        )
        return lstItems;
             
    }

    static async addCategoryToGroup(newCategory,activeGroup)
    {
       console.log(newCategory);
        const ParseShoppingGroup = Parse.Object.extend('ShoppingGroup');
        const query = new  Parse.Query(ParseShoppingGroup) ; 
        const currentShoppingGroup=await query.get(activeGroup.id);
       
        var relation = currentShoppingGroup.relation("categories");
        relation.add(newCategory);
        const result=await currentShoppingGroup.save();


        return result;

    }


    static async readCategoryListbyGroup(activeGroup){
        const ParseShoppingGroup = Parse.Object.extend('ShoppingGroup');
        const queryGroup = new  Parse.Query(ParseShoppingGroup) ; 
        const currentShoppingGroup=await queryGroup.get(activeGroup.id);

        var relation = currentShoppingGroup.relation("categories");
        var query = relation.query();
        const categories=await query.find();

        let lstCategiriesItems=categories.map(item=>new Category(item))

        return lstCategiriesItems;
        
    }

   
}