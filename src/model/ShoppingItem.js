import Parse from 'parse';
export default class ShoppingItem
{
    // img is optional
    // shoppingItemId is the id of the object from the db
    constructor(shoppingItemId,name,img,count)
    {
        this.shoppingItemId=shoppingItemId;
        this.name=name;
        this.img=img;  // optional
        this.count=count;
          
    }


    async UpdateShoppingItemCount(newCount)
    {      
        const ShoppingItemParse = Parse.Object.extend('ShoppingItem');
        const query = new Parse.Query(ShoppingItemParse);
        const object = await query.get(this.shoppingItemId);
        object.set('count', newCount);
        const response = await object.save();
        return response;


    }

    async UpdateShoppingItemImage( newfile)
    {       
        const ShoppingItemParse = Parse.Object.extend('ShoppingItem');
        const query = new Parse.Query(ShoppingItemParse);
        const object=await query.get(this.shoppingItemId);
        let product=object.get("productItemPointer");
        var parseFile=(newfile)? new Parse.File(newfile.name,newfile):undefined;
            if (parseFile)
            {
                product.set('productImageSrc',parseFile);
            }
        
            const response=await  product.save();
            return response;
      

    }


   
}