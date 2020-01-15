export default class ProductItem{
    constructor(productItemObj)
    {
        this.id=productItemObj.id;
        this.name=productItemObj.name;
        this.img=productItemObj.get("image")._url;
    }
}