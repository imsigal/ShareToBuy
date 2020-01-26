import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import SelectActiveGroupModal from '../components/SelectActiveGroupModal';
import CreateNewGroupModal from '../components/CreateNewGroupModal';
import {Navbar ,Nav} from 'react-bootstrap';
import BaseListComponents from '../components/BaseListComponents';
import CategoryNewModal from '../components/CategoryNewModal';
import Parse from 'parse';
import Category from '../model/Category';


export default class ShoppingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showSelectActiveGroup: true,
          showCreateActiveGroup:false,
          showCategoryNew:false,
          categoryArray:[],
          selectedCategoryItem:null,
          isNewCategory:false
      }
      this.readCategoryList=this.readCategoryList.bind(this);
    }
    componentDidMount()
    {
        this.readCategoryList();
    }

    async readCategoryList(){
      const ParseCategory = Parse.Object.extend('Category');
      const query = new Parse.Query(ParseCategory);
      query.find().then(results => {         
          let lstItems=[];
              results.forEach(
                  item=>lstItems.push(new Category(item))
              )
              let selected=lstItems.length>0?lstItems[0]:null
              this.setState({
                  categoryArray:lstItems,
                  selectedCategoryItem:selected,
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
  }


  render() {
      const {activeUser,activeGroup}=this.props;
      const {showSelectActiveGroup, showCreateActiveGroup,showCategoryNew,
        categoryArray,selectedCategoryItem}=this.state;
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
                    </Nav>
              </Navbar.Collapse>
            </Navbar>
            

             <p>שלום {activeUser.email} </p>
             <p> קבוצתך היא {activeGroupName}</p>
             <div class="main-shopping-page">           
                <BaseListComponents categoryArray={categoryArray} 
                        selectedCategoryItem={selectedCategoryItem}>
                 </BaseListComponents>
                <SelectActiveGroupModal show={showSelectActiveGroup} handleClose={this.handleClose} handleGroupSelection={this.handleGroupSelection} HandleCreateNewGroup= {this.HandleCreateNewGroup} activeUser={activeUser} activeGroup={activeGroup}/>
                <CreateNewGroupModal show={showCreateActiveGroup} handleClose={this.handleClose} activeUser={activeUser} activeGroup={activeGroup}  handleGroupSelection={this.handleGroupSelection} />
                <CategoryNewModal show={showCategoryNew} handleCategoryClose={this.handleCategoryClose} activeGroup={activeGroup}  handleGroupSelection={this.handleGroupSelection} />
            </div>
          </div>


      );
  }

}