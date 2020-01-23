import ProductItem from "./ProductItem";

export default class ShoppingItem extends ProductItem
{
    // img is optional
    // when building new item, the count is always 1
    constructor(shoppingItemObj,name,img)
    {
        if (arguments.length === 1)
        {
            super(shoppingItemObj);
            this.count=shoppingItemObj.count;
        }
        else{
            super(shoppingItemObj,name,img);
            this.id=shoppingItemObj; //first item is id
            this.name=name;
            this.img=img;  // optional
            this.count=1;
        }

        
    }
    

}