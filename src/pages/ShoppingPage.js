import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import SelectActiveGroupModal from '../components/SelectActiveGroupModal';
import CreateNewGroupModal from '../components/CreateNewGroupModal';
import {Navbar ,Nav} from 'react-bootstrap';
import BaseListComponents from '../components/BaseListComponents';
import CategoryNewModal from '../components/CategoryNewModal';
import Parse from 'parse';
import Category from '../model/Category';
import ShoppingItem from '../model/ShoppingItem';


export default class ShoppingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          redirectToLogin:false,
          showSelectActiveGroup: true,
          showCreateActiveGroup:false,
          showCategoryNew:false,
          categoryArray:[],
          selectedCategoryItem:null,
          isNewCategory:false,
          shoppingItemsArray:[]
      }
      this.readCategoryList=this.readCategoryList.bind(this);
      this.getShoppingItemsParams=this.getShoppingItemsParams.bind(this);
      this.addShoppingItem=this.addShoppingItem.bind(this);
    }

    //************************************************************* */
    logout=()=> {
      // This eventually calls the handleLogout method of the App component
      this.props.handleLogout();

      this.setState({
          redirectToLogin: true
      })
  }

    //******************************************************************** */
    // Shopping list functions
    async readShoppingItemList(){
      const ParseShoppingItem = Parse.Object.extend('ShoppingItem');
      const query = new Parse.Query(ParseShoppingItem);
      query.find().then(results => {        
              results.forEach(
                  //item=>lstItems.push(new ShoppingItem(item))
                  
                  (item,index)=>
                  {
                    this.getShoppingItemsParams(item);
                  }
              )

        });
  }

  async getShoppingItemsParams(shoppingItem)
  {   
      let count=shoppingItem.get("count");
      let shoppingItemId=shoppingItem.id;
      let product=shoppingItem.get("productItemPointer");
      await product.fetch();
      let productName=product.get("productName");
      let productImageSrc=product.get("productImageSrc");
      let newItem=new ShoppingItem(shoppingItemId,productName,productImageSrc,count);
      this.setState({
        shoppingItemsArray:this.state.shoppingItemsArray.concat(newItem)
      });

  }

  addShoppingItem(newShoppingItem)
  {
    const ShoppingItem=Parse.Object.extend('ShoppingItem');
    const newShoppingItemObject=new ShoppingItem();

    const ProductItem=Parse.Object.extend('productItem');
    const newProductItemObject=new ProductItem();
    newProductItemObject.set('productName',newShoppingItem.name);

    var parseFile=(newShoppingItem.img)? new Parse.File(newShoppingItem.img.name,newShoppingItem.img):undefined;
    if (parseFile)
    {
        newProductItemObject.set('productImageSrc',parseFile);
    }
    newShoppingItemObject.set("productItemPointer",newProductItemObject);
    newShoppingItemObject.set('count',newShoppingItem.count);

    newShoppingItemObject.save().then(
        (result)=>{
           newShoppingItem.id=result.id; // update the id
           this.setState({
            shoppingItemsArray:this.state.shoppingItemsArray.concat(newShoppingItem)
          });
        },
        (error)=>{
            console.error("error while creating New Shopping item",error);
        }
    );

  }
//******************************************************************** */
   
// Category list functions
    async readCategoryList(){
      Category.readCategoryList().then(lstItems=>{
        let selected=lstItems && lstItems.length>0?lstItems[0]:null;
        this.setState({
            categoryArray:lstItems,
            selectedCategoryItem:selected,
        });
      })
      .catch(error => {
        console.error('error getting the categories', error);
        this.setState({
          categoryArray:[],
          selectedCategoryItem:null,
                });
    });
      
    
  }
    
    handleClose=(isToSelection) =>{
      if (isToSelection){
         this.setState({
          showSelectActiveGroup: true,
          showCreateActiveGroup:false
        })
      }
      else{
         this.setState({
          showSelectActiveGroup: false,
          showCreateActiveGroup:false
        })
      } 
  }

  handleCategoryClose=(isNewCategory)=>{
    this.setState({
        showCategoryNew:false,
    })
    if (isNewCategory)
    {
      this.readCategoryList();
    }
  }

  HandleCategoryOpen=()=>{
    this.setState({
      showCategoryNew:true
     })
  }
  //******************************************************************** */
  // Group functions
    HandleCreateNewGroup=()=>
    {
      this.setState({
        showSelectActiveGroup: false,
        showCreateActiveGroup:true
      })
    }

  handleGroupSelection=(group)=>
  {
    // hadle the opening of the select group section
    this.props.setGroup(group);
    // read the lists according to the selected group
    this.readCategoryList();
    this.readShoppingItemList();
  }

//******************************************************************** */
    // render
  render() {
      const {activeUser,activeGroup}=this.props;
      const {redirectToLogin,showSelectActiveGroup, showCreateActiveGroup,showCategoryNew,
        categoryArray,selectedCategoryItem,shoppingItemsArray}=this.state;

      const logoutLink = activeUser ? <Nav.Link onClick={this.logout}>יציאה</Nav.Link> : null;  //should not be situation whenre there is no active user

      if (redirectToLogin) {
        return <Redirect to="/"/>
    }

      if (!activeUser) {
        return <Redirect to="/"/>
      }
      let activeGroupName="";
      if (activeGroup!=null)
      {
        activeGroupName=activeGroup.groupName;
      }

      return (
          <div>
            <Navbar expand="lg">
              <Navbar.Brand href="#home">
                      <img
                        alt=""
                        src="../images/ShareToBuy.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                      />{' '}
                      ShareToBuy
                    </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                      <Nav.Link  onClick={this.HandleCategoryOpen}>הוסף קטגוריה</Nav.Link>
                      <Nav.Link href="#link">בחירת מוצר מרשימה</Nav.Link>   
                      {logoutLink}          
                    </Nav>
              </Navbar.Collapse>
            </Navbar>
            

             <p>שלום {activeUser.email} </p>
             <p> קבוצתך היא {activeGroupName}</p>
             <div class="main-shopping-page">           
                <BaseListComponents categoryArray={categoryArray} 
                        selectedCategoryItem={selectedCategoryItem} shoppingItemsArray={shoppingItemsArray} addShoppingItem={this.addShoppingItem} >
                 </BaseListComponents>
                <SelectActiveGroupModal show={showSelectActiveGroup} handleClose={this.handleClose} handleGroupSelection={this.handleGroupSelection} HandleCreateNewGroup= {this.HandleCreateNewGroup} activeUser={activeUser} activeGroup={activeGroup}/>
                <CreateNewGroupModal show={showCreateActiveGroup} handleClose={this.handleClose} activeUser={activeUser} activeGroup={activeGroup}  handleGroupSelection={this.handleGroupSelection} />
                <CategoryNewModal show={showCategoryNew} handleCategoryClose={this.handleCategoryClose} activeGroup={activeGroup}  handleGroupSelection={this.handleGroupSelection} />
            </div>
          </div>


      );
  }

}