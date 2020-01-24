import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import SelectActiveGroupModal from '../components/SelectActiveGroupModal';
import CreateNewGroupModal from '../components/CreateNewGroupModal';
import {Navbar ,Nav} from 'react-bootstrap';
import BaseListComponents from '../components/BaseListComponents';

export default class ShoppingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showSelectActiveGroup: true,
          showCreateActiveGroup:false
      }

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
      const {showSelectActiveGroup, showCreateActiveGroup}=this.state;
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
                      <Nav.Link  href="#link">Add Category</Nav.Link>
                      <Nav.Link href="#link">Choose From List</Nav.Link>
                      <Nav.Link href="#link">Add item</Nav.Link>               
                    </Nav>
              </Navbar.Collapse>
            </Navbar>
            
            
             <h1>My Shopping</h1> 
             <p>hello {activeUser.email}</p>
             <p> your active group is {activeGroupName}</p>
             <div class="main-shopping-page"> 
            
             <BaseListComponents></BaseListComponents>
             

             <SelectActiveGroupModal show={showSelectActiveGroup} handleClose={this.handleClose} handleGroupSelection={this.handleGroupSelection} HandleCreateNewGroup= {this.HandleCreateNewGroup} activeUser={activeUser} activeGroup={activeGroup}/>
             <CreateNewGroupModal show={showCreateActiveGroup} handleClose={this.handleClose} activeUser={activeUser} activeGroup={activeGroup}  handleGroupSelection={this.handleGroupSelection} />
            </div>
          </div>


      );
  }

}