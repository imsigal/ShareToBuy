import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import SelectActiveGroupModal from '../components/SelectActiveGroupModal';
import CreateNewGroupModal from '../components/CreateNewGroupModal';
import {Navbar ,Nav,Figure,NavDropdown} from 'react-bootstrap';
import BaseListComponents from '../components/BaseListComponents';
import CategoryNewModal from '../components/CategoryNewModal';
import ShoppingList from '../model/ShoppingList';
import ShoppingGroup from '../model/ShoppingGroup';
import imageMainIcon from '../images/ShareToBuy-white.png'
import imageCategory from '../images/category-white.png'
import imageLogout from '../images/logout-white.png'
import imageGroup from '../images/group-white.png'
import imageList from '../images/list-white.png'
import './ShoppingPage.css';

// Shopping page
// this is the main page, containing all the components concent the shopping list action
//states
//  -redirectToLogin:true redirect this page back to the login page
//  -showSelectActiveGroup/showCreateActiveGroup: true is showing the modal window accordingly,
//                select group from thr groups defined for the current user,
//                create group is used to create new group
//   -showCategoryNew:true shows a modal window concerning creating new caegory
//   -categoryArray:filled with the category items (object)
//   -categoryActive: the name of the currnt active category
//   -isNewCategory; if new category was selected. used for closing the modal and updating the data
//    -toggleUpdateAfterDeleteFlag - is changes after delete. signals to the list to refresh itself
//properties:
//    -handleLogout - pointer to the return function that does loaout from the db
//    -activeUser - the active use name( the one that is loginlogin) 
//    -activeGroup- the active ( selected) group
//     -setGroup- pointer to the function that sets the activr group 
export default class ShoppingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          redirectToLogin:false,
          showSelectActiveGroup: true,
          showCreateActiveGroup:false,
          showCategoryNew:false,
          categoryArray:[],
          isNewCategory:false,
          categoryActive:"",
          toggleUpdateAfterDeleteFlag:false
      }
      this.readCategoryListbyGroup=this.readCategoryListbyGroup.bind(this);
    }


    //************************************************************* */
    logout=()=> {
      // This eventually calls the handleLogout method of the App component
      this.props.handleLogout();

      // update user 
      localStorage.setItem('user', null)

      this.setState({
          redirectToLogin: true
      })

  }


//******************************************************************** */
   
// Category list functions
  async readCategoryListbyGroup(){
    ShoppingGroup.readCategoryListbyGroup(this.props.activeGroup)
    .then(lstItems=>{
      var selectedCategory=""
      if (lstItems &&lstItems.length>0)
      {
        selectedCategory=lstItems[0].name;
      }
          this.setState({
              categoryArray:lstItems,
              categoryActive:selectedCategory
          });

    })
    .catch(error => {
      console.error('error getting the categories', error);
      this.setState({
        categoryArray:[],
        categoryActive:""
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

  handleCategoryClose=(isNewCategory,newCategoryName)=>{
    this.setState({
        showCategoryNew:false,
    })
    if (isNewCategory)
    {
      this.readCategoryListbyGroup();
      this.setState({
        categoryActive:newCategoryName
      })

    }
  }

  HandleCategoryOpen=()=>{
    this.setState({
      showCategoryNew:true
     })
  }

  setNewActiveCategory=(newCategory)=>{
    this.setState({
      categoryActive:newCategory
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
     // clear the previous group items
     this.setState({
      categoryArray:[],
      categoryActive:""
    })
    // handle the opening of the select group section
    this.props.setGroup(group);
    localStorage.setItem('Group', group);
    
    // read the lists according to the selected group
    this.readCategoryListbyGroup();
  }
 //******************************************************************** */
  handleDeleteList=()=>
  {
    this.deleteAllDeletedItems();
    // must call rephresh
  }

   deleteAllDeletedItems=(activeCategory)=>
  {
   const{categoryActive}=this.state;
   const {activeGroup}=this.props;
    if (categoryActive)
    {
      // get the shopping list according to the active group and the selected category     
      activeGroup.GetShoppingListByCategoryAndGroup(categoryActive)
      .then(theShoppingList=>{
       if (theShoppingList)
       {
          ShoppingList.DeleteAllDeletedShoppingItemsInTheList(theShoppingList).then(result=>
          {
                this.setState({
                  toggleUpdateAfterDeleteFlag:!this.state.toggleUpdateAfterDeleteFlag
                })
          });
        }
      });
    }
  }

//******************************************************************** */
    // render
  render() {
      const {activeUser,activeGroup}=this.props;
      const {redirectToLogin,showSelectActiveGroup, showCreateActiveGroup,showCategoryNew,
        categoryArray,categoryActive,toggleUpdateAfterDeleteFlag}=this.state;
        //toggleUpdateAfterDeleteFlag is a dummy that causes the BaseListComponents redraw after item removal
        // if user exsist, than add logout button
      const logoutLink = activeUser ? 
      <Nav.Link  onClick={this.logout} >
            <Figure>
            <Figure.Image
              alt="יציאה"
              src={imageLogout}
              onClick={this.logout}
            />
            <Figure.Caption>
              יציאה
            </Figure.Caption>
          </Figure>
       </Nav.Link>
      : null;  //should not be situation whenre there is no active user
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
            <div className="main-header-nav">
            <Navbar expand="sm">
              <Navbar.Brand >
                        <Figure>
                          <Figure.Image
                            alt="ShareToBuy"
                            src={imageMainIcon}
                            onClick={this.handleClose}
                          />
                          <Figure.Caption>
                            {activeGroupName}
                          </Figure.Caption>
                        </Figure>
                    </Navbar.Brand>    
                      <Nav.Link >
                          <Figure>
                              <Figure.Image
                                alt="רשימה"
                                src={imageList}
                              />
                              <Figure.Caption>
                                <NavDropdown title="רשימה" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={this.handleDeleteList} >מחק  מהרשימה</NavDropdown.Item>
                                <NavDropdown.Item href="#">בחר מרשימה</NavDropdown.Item>
                            </NavDropdown>
                              </Figure.Caption>
                            </Figure>
                           
                       </Nav.Link>  
                       <Nav.Link  onClick={this.HandleCategoryOpen} >
                          <Figure>
                              <Figure.Image
                                alt="הוסף קטגוריה"
                                src={imageCategory}
                              />
                              <Figure.Caption>
                                קטגוריה
                              </Figure.Caption>
                            </Figure>
                       </Nav.Link>  
                      {logoutLink}          
            </Navbar>
            </div>
             <div className="main-shopping-page">           
                <BaseListComponents activeGroup={activeGroup} categoryArray={categoryArray} categoryActive={categoryActive} setNewActiveCategory={this.setNewActiveCategory } UpdateAfterDelete={toggleUpdateAfterDeleteFlag} >
                 </BaseListComponents>
                <SelectActiveGroupModal show={showSelectActiveGroup} handleClose={this.handleClose} handleGroupSelection={this.handleGroupSelection} HandleCreateNewGroup= {this.HandleCreateNewGroup} activeUser={activeUser} activeGroup={activeGroup}/>
                <CreateNewGroupModal show={showCreateActiveGroup} handleClose={this.handleClose} activeUser={activeUser} activeGroup={activeGroup}  handleGroupSelection={this.handleGroupSelection} />
                <CategoryNewModal show={showCategoryNew} handleCategoryClose={this.handleCategoryClose} activeGroup={activeGroup}  handleGroupSelection={this.handleGroupSelection} />
            </div>
          </div>


      );
  }

}