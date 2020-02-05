import Parse from 'parse';

export default class Category
{
    constructor(parseModel)
    {
        this.name=parseModel.get("categoryName");;
        this.imgFile=parseModel.get("categoryImageSrc");
    }


    static async createNewCategory(newCategoryName,imgFile)
    {
        // create the category in the db
        const ParseCategory = Parse.Object.extend('Category');
        const NewCategoryObject = new ParseCategory(); 
        NewCategoryObject.set('categoryName', newCategoryName);
        if (imgFile){
            var parseFile = new Parse.File(imgFile.name, imgFile);
            NewCategoryObject.set('categoryImageSrc', parseFile); 
        }
        
         const newCategory= await NewCategoryObject.save();
         return newCategory;
                
    }

    static async getCategory(categoryName)
    {

        const ParseCategory   = Parse.Object.extend('Category');
        const query = new Parse.Query(ParseCategory);
        query.equalTo("categoryName", categoryName);
        const result=await query.find();  // we are getting an array
        if (result && result.length>0)
            return result[0];
        return result;

    }


}