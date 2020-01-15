export default class Category
{
    constructor(categoryObj)
    {
        this.name=categortObj.name;
        this.img=categortObj.get("image")._url;
    }
}