import Parse from 'parse';
export default class ShoppingItem
{

    static async CreateNewShoppingList(NewCategory)
    {
         // create the category in the db
         const ParseShoppingList = Parse.Object.extend('ShoppingList');
         const NewShoppingListObject = new ParseShoppingList(); 

         NewShoppingListObject.set("category", NewCategory);
         var relation = NewShoppingListObject.relation("shoppingItems");

        // This will save both myPost and myComment
        const newShoppingList= await NewShoppingListObject.save();
        return newShoppingList;
                 
     }

     static async addShoppingItemToList(activeShoppingList,shoppingItem)
     {
         // get the shopping item
        const ParseShoppingItem = Parse.Object.extend('ShoppingItem');
        const query = new Parse.Query(ParseShoppingItem);
        query.equalTo("objectId", shoppingItem.shoppingItemId);
        const theShoppingItem=await query.find();
        // console.log (theShoppingItem);

        // const ParseShoppingList = Parse.Object.extend('ShoppingList');
        // const queryShoppingList = new  Parse.Query(ParseShoppingList) ; 
        // const currentShoppingList=await queryShoppingList.get(activeShoppingList.id);

       
        // var relation = currentShoppingList.relation("shoppingItems");
        // relation.add(theShoppingItem);
        // const result=await currentShoppingList.save();

           var relation = activeShoppingList.relation("shoppingItems");
        relation.add(theShoppingItem);
        const result=await activeShoppingList.save();

        return result;

     }

    
}