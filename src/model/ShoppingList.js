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

   static async DeleteAllDeletedShoppingItemsInTheList(ShoppingList){
      var result=true;
      var itemsRelation = ShoppingList.relation("shoppingItems");
      var queryItems = itemsRelation.query();
      queryItems.equalTo("isDeleted", true);
      const shoppingItems=await queryItems.find();
      shoppingItems.forEach(shoppingItemObject => {
         shoppingItemObject.destroy().then((response) => {
            console.log('Deleted ShoppingGroup', response);
          }, (error) => {
            console.error('Error while deleting ShoppingGroup', error);
            result=false;
          });
      });   

      return result;
  
 }

    
}