
import Parse from 'parse';
import Category from '../model/Category';

export default class ShoppingGroup{

    constructor(parseModel) {
           
        
        this.lstUsers = parseModel.get("lstUsers");
        this.categories=parseModel.get("categories");
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

    async CreateNewShoppingListinGroup(NewCategory)
    {
         // create the category in the db
         const ParseShoppingList = Parse.Object.extend('ShoppingList');
         const NewShoppingListObject = new ParseShoppingList(); 

         NewShoppingListObject.set("category", NewCategory);
         var relation = NewShoppingListObject.relation("shoppingItems");

        // This will save both myPost and myComment
        const newShoppingList= await NewShoppingListObject.save();
        // return newShoppingList;

        const ParseShoppingGroup = Parse.Object.extend('ShoppingGroup');
        const query = new  Parse.Query(ParseShoppingGroup) ; 
        const currentShoppingGroup=await query.get(this.id);
        var relation = currentShoppingGroup.relation("shoppingLists");
        relation.add(newShoppingList);
        const result=await currentShoppingGroup.save();
        return result;

    }


    async GetShoppingListByCategoryAndGroup(categoryName)
    {    
        const theCatrgoryObject=await Category.getCategory(categoryName);

        const ParseShoppingGroup = Parse.Object.extend('ShoppingGroup');
        const queryGroup = new  Parse.Query(ParseShoppingGroup) ; 
        const currentShoppingGroup=await queryGroup.get (this.id);

        var relation = currentShoppingGroup.relation("shoppingLists");
        var query = relation.query();
        query.equalTo("category", theCatrgoryObject);
        const shoppingLists=await query.find();

       if (shoppingLists && shoppingLists.length>0)
                return shoppingLists[0];

        return null;
        
    }

   
    async addCategoryToGroup(newCategory)
    {
        const ParseShoppingGroup = Parse.Object.extend('ShoppingGroup');
        const query = new  Parse.Query(ParseShoppingGroup) ; 
        const currentShoppingGroup=await query.get(this.id);
       
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