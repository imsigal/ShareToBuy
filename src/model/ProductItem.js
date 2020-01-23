export default class ProductItem{
    constructor(productItemObj,name,img)
    {
        if (arguments.length === 1)
        {
            this.id=productItemObj.id;
            this.name=productItemObj.name;
            this.img=productItemObj.get("image")._url;
        }
        else{
         this.id=productItemObj;
        this.name=name;
        this.img=img;

        }

       
    }
}