import React from 'react';
import { Redirect } from 'react-router-dom';
import SelectActiveGroup from '../components/SelectActiveGroup';
export default class ShoppingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          showSelectActiveGroup: true
      }

    }
    
    handleClose=() =>{
      this.setState({
        showSelectActiveGroup: false
      })
  }

  handleGroupSelection=()=>
  {
    // hadle the opening of the select group section
  }


  render() {
      const {activeUser,activeGroup}=this.props;
      const {showSelectActiveGroup}=this.state;
      if (!activeUser) {
        return <Redirect to="/"/>
    }
      return (
          <div>
             <h1>My Shopping</h1> 
             <p>hello {activeUser.email}</p>
             <p> your active group is {activeGroup}</p>
             <SelectActiveGroup show={showSelectActiveGroup} handleClose={this.handleClose} handleGroupSelection={this.handleGroupSelection} activeUser={activeUser} activeGroup={activeGroup}/>
          </div>
      );
  }

}