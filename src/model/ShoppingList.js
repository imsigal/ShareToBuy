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
        const theShoppingItem=await query.get (shoppingItem.shoppingItemId);

        var relation = activeShoppingList.relation("shoppingItems");
        relation.add(theShoppingItem);
        const result=await activeShoppingList.save();

        return result;

     }

    
}