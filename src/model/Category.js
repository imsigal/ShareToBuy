import Parse from 'parse';

export default class Category
{
    constructor(parseModel)
    {
        this.name=parseModel.get("categoryName");;
        this.imgFile=parseModel.get("categoryImageSrc");
    }


    static async readCategoryList(){
        const ParseCategory = Parse.Object.extend('Category');
        const query = new Parse.Query(ParseCategory);
        let lstItems=[];
        await query.find(lstItems).then(results => {         
                results.forEach(
                    item=>lstItems.push(new Category(item))
                )
                return lstItems;
          })
          .catch(error => {
            console.error('error getting the categories', error);
            return null;
    });
    return lstItems;
    }

}