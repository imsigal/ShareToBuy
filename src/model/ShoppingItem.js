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
        const query = await new Parse.Query(ShoppingItemParse);
         query.get(this.shoppingItemId).then((object) => {  
            object.set('count', newCount);
            object.save().then((response) => {           
            }, 
            (error) => {       
                console.error('Error while updating ShoppingItem count', error);
            });
        });

    }

    async UpdateShoppingItemImage( newfile)
    {       
        const ShoppingItemParse = Parse.Object.extend('ShoppingItem');
        const query = await new Parse.Query(ShoppingItemParse);
         query.get(this.shoppingItemId).then((object) => {  
            let product=object.get("productItemPointer");
            var parseFile=(newfile)? new Parse.File(newfile.name,newfile):undefined;
            if (parseFile)
            {
                product.set('productImageSrc',parseFile);
            }

            product.save().then((response) => {           
                }, 
                (error) => {       
                console.error('Error while updating productItem file', error);
              });

            object.save().then((response) => {           
            }, 
                (error) => {       
                console.error('Error while updating ShoppingItem file', error);
            });
        });

    }


   
}