export default class Category
{
    constructor(parseModel)
    {
        this.name=parseModel.get("categoryName");;
        this.imgFile=parseModel.get("categoryImageSrc");
    }
}