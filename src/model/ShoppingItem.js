import Parse from 'parse';
export default class ShoppingItem
{
    // img is optional
    // shoppingItemId is the id of the object from the db
    constructor(shoppingItemId,name,img,count,isDeleted)
    {
        this.shoppingItemId=shoppingItemId;
        this.name=name;
        this.img=img;  // optional
        this.count=count;
        this.isDeleted=isDeleted;
          
    }


  static async  addShoppingItem(newShoppingItem)
  {
    const ShoppingItem=Parse.Object.extend('ShoppingItem');
    const newShoppingItemObject=new ShoppingItem();

    newShoppingItemObject.set('productName',newShoppingItem.name);

    var parseFile=(newShoppingItem.img)? new Parse.File(newShoppingItem.img.name,newShoppingItem.img):undefined;
    if (parseFile)
    {
        newShoppingItemObject.set('productImageSrc',parseFile);
    }
    newShoppingItemObject.set('count',newShoppingItem.count);

    let newObject=await newShoppingItemObject.save();
    return newObject;

  }

  static async readShoppingItemList()
  {
    const ParseShoppingItem = Parse.Object.extend('ShoppingItem');
    const query = new Parse.Query(ParseShoppingItem);
    const ShoppingItemList=await query.find();
    return ShoppingItemList;
}

static async getShoppingItemsParams(shoppingItem)  // shopping item is parse object
  {   
      let count=shoppingItem.get("count");
      let shoppingItemId=shoppingItem.id;

      let productName=shoppingItem.get("productName");
      let productImageSrc=shoppingItem.get("productImageSrc");
      let isDeleted=shoppingItem.get("isDeleted");
      return new ShoppingItem(shoppingItemId,productName,productImageSrc,count,isDeleted);

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
        const shoppingItemObject=await query.get(this.shoppingItemId);
        var parseFile=(newfile)? new Parse.File(newfile.name,newfile):undefined;
            if (parseFile)
            {
                shoppingItemObject.set('productImageSrc',parseFile);
            }
        
            const response=await  shoppingItemObject.save();
            return response;
      
    }

    async UpdateShoppingItemDeleted(isDeleted)
    {      
        const ShoppingItemParse = Parse.Object.extend('ShoppingItem');
        const query = new Parse.Query(ShoppingItemParse);
        const shoppingItemObject = await query.get(this.shoppingItemId);
        shoppingItemObject.set('isDeleted', isDeleted);
        const response = await shoppingItemObject.save();
        return response;


    }


   
}