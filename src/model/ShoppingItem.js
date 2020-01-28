import ProductItem from "./ProductItem";

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
}