export default class ShoppingGroup{

    constructor(parseModel) {
           
        
        this.lstUsers = parseModel.get("lstUsers");
        this.lstShoppingLists = parseModel.get("lstShoppingLists");
        this.lstCategories=parseModel.get("lstCategories"); 
        this.groupName = parseModel.get("GroupName");
        
    }
}