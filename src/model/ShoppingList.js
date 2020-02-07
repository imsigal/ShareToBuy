import Parse from 'parse';
export default class ShoppingItem
{

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

     static async GetShoppingItemsByList(ShoppingList){

        var itemsRelation = ShoppingList.relation("shoppingItems");
        var queryItems = itemsRelation.query();
        const shoppingItems=await queryItems.find();
        return shoppingItems;
    
}

    
}