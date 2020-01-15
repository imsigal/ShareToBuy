import ProductItem from "./ProductItem";

export default class ShoppingItem extends ProductItem
{
    constructor(shoppingItemObj)
    {

        super(shoppingItemObj);
        this.count=shoppingItemObj.count;
    }
    

}