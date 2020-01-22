import React from 'react';
import { Redirect } from 'react-router-dom';
import SelectActiveGroupModal from '../components/SelectActiveGroupModal';
import CreateNewGroupModal from '../components/CreateNewGroupModal';


export default class ShoppingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          showSelectActiveGroup: true,
          showCreateActiveGroup:false
      }

    }
    
    handleClose=() =>{
      this.setState({
        showSelectActiveGroup: false,
        showCreateActiveGroup:false
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
             <h1>My Shopping</h1> 
             <p>hello {activeUser.email}</p>
             <p> your active group is {activeGroupName}</p>
             <SelectActiveGroupModal show={showSelectActiveGroup} handleClose={this.handleClose} handleGroupSelection={this.handleGroupSelection} HandleCreateNewGroup= {this.HandleCreateNewGroup} activeUser={activeUser} activeGroup={activeGroup}/>
             <CreateNewGroupModal show={showCreateActiveGroup} handleClose={this.handleClose} activeUser={activeUser} activeGroup={activeGroup}  handleGroupSelection={this.handleGroupSelection} />
          </div>
      );
  }

}