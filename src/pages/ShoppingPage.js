import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import SelectActiveGroupModal from '../components/SelectActiveGroupModal';
import CreateNewGroupModal from '../components/CreateNewGroupModal';
import {Navbar ,Nav,Figure} from 'react-bootstrap';
import BaseListComponents from '../components/BaseListComponents';
import CategoryNewModal from '../components/CategoryNewModal';
//import ShoppingItem from '../model/ShoppingItem';
import ShoppingGroup from '../model/ShoppingGroup';
import imageMainIcon from '../images/ShareToBuy-white.png'
import imageCategory from '../images/category-white.png'
import imageLogout from '../images/logout-white.png'
import imageGroup from '../images/group-white.png'
import imageList from '../images/list-white.png'
import './ShoppingPage.css';


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
      }
      this.readCategoryListbyGroup=this.readCategoryListbyGroup.bind(this);
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
   
// Category list functions
  async readCategoryListbyGroup(){
    ShoppingGroup.readCategoryListbyGroup(this.props.activeGroup)
    .then(lstItems=>{
          this.setState({
              categoryArray:lstItems,
          });

    })
    .catch(error => {
      console.error('error getting the categories', error);
      this.setState({
        categoryArray:[],
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
      this.readCategoryListbyGroup();

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
    this.readCategoryListbyGroup();
  }

//******************************************************************** */
    // render
  render() {
      const {activeUser,activeGroup}=this.props;
      const {redirectToLogin,showSelectActiveGroup, showCreateActiveGroup,showCategoryNew,
        categoryArray}=this.state;
      
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
                                רשימה
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
                <BaseListComponents activeGroup={activeGroup} categoryArray={categoryArray}  >
                 </BaseListComponents>
                <SelectActiveGroupModal show={showSelectActiveGroup} handleClose={this.handleClose} handleGroupSelection={this.handleGroupSelection} HandleCreateNewGroup= {this.HandleCreateNewGroup} activeUser={activeUser} activeGroup={activeGroup}/>
                <CreateNewGroupModal show={showCreateActiveGroup} handleClose={this.handleClose} activeUser={activeUser} activeGroup={activeGroup}  handleGroupSelection={this.handleGroupSelection} />
                <CategoryNewModal show={showCategoryNew} handleCategoryClose={this.handleCategoryClose} activeGroup={activeGroup}  handleGroupSelection={this.handleGroupSelection} />
            </div>
          </div>


      );
  }

}