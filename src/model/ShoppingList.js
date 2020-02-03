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

    
}