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


  static async  addShoppingItem(newShoppingItem)
  {
    const ShoppingItem=Parse.Object.extend('ShoppingItem');
    const newShoppingItemObject=new ShoppingItem();

    const ProductItem=Parse.Object.extend('productItem');
    const newProductItemObject=new ProductItem();
    newProductItemObject.set('productName',newShoppingItem.name);

    var parseFile=(newShoppingItem.img)? new Parse.File(newShoppingItem.img.name,newShoppingItem.img):undefined;
    if (parseFile)
    {
        newProductItemObject.set('productImageSrc',parseFile);
    }
    newShoppingItemObject.set("productItemPointer",newProductItemObject);
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
      let product=shoppingItem.get("productItemPointer");
      await product.fetch();
      let productName=product.get("productName");
      let productImageSrc=product.get("productImageSrc");
      return new ShoppingItem(shoppingItemId,productName,productImageSrc,count);

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