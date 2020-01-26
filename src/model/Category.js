export default class Category
{
    constructor(parseModel)
    {
        this.name=parseModel.get("name");;
        this.imgFile=parseModel.get("categoryImageSrc");
    }
}